var Polygonizer={};
Polygonizer.generate=function(func, size, r, center){
  if(!center)center={x:0,y:0,z:0};
  var values={};
  var cubes=[];
  var inum=2;
  var s=size/inum;
  for(var i=0;i<inum;i++)for(var j=0;j<inum;j++)for(var k=0;k<inum;k++){
    cubes.push({x:i*s,y:j*s,z:k*s})
  }
  function calc(x,y,z){
    var key=(x*(size+1)+y)*(size+1)+z;
    var val=values[key];
    if(val!==undefined)return val;
    val=func(center.x+r*(2*x/size-1),center.y+r*(2*y/size-1),center.z+r*(2*z/size-1));
    return values[key]=val;
  }
  while(s>1){
    console.log(s,cubes.length)
    var subcubes=[];
    cubes.forEach(function(c){
      var neg=false;
      var pos=false;
      for(var i=0;i<=s;i++)for(var j=0;j<=s;j++){
        var val=calc(c.x+i,c.y+j,c.z);
        neg=neg||val<=0;pos=pos||val>=0;
        var val=calc(c.x+i,c.y+j,c.z+s);
        neg=neg||val<=0;pos=pos||val>=0;
        var val=calc(c.x,c.y+i,c.z+j);
        neg=neg||val<=0;pos=pos||val>=0;
        var val=calc(c.x+s,c.y+i,c.z+j);
        neg=neg||val<=0;pos=pos||val>=0;
        var val=calc(c.x+j,c.y,c.z+i);
        neg=neg||val<=0;pos=pos||val>=0;
        var val=calc(c.x+j,c.y+s,c.z+i);
        neg=neg||val<=0;pos=pos||val>=0;
      }
      if(!neg||!pos)return;
      for(var i=0;i<2;i++)for(var j=0;j<2;j++)for(var k=0;k<2;k++){
        subcubes.push({x:c.x+i*s/2,y:c.y+j*s/2,z:c.z+k*s/2});
      }
    })
    cubes=subcubes;
    s/=2;
  }
  console.log(s,cubes.length)
  var triangles=[];
  cubes.forEach(function(c){
    var cv=[[[],[]],[[],[]]];
    for(var i=0;i<2;i++)for(var j=0;j<2;j++)for(var k=0;k<2;k++){
      cv[i][j][k]=calc(c.x+i,c.y+j,c.z+k);
    }

    var lines=[];
    function sqline(a,b,c,d){
      var poly=[];
      [[a,b],[b,c],[c,d],[d,a]].forEach(function(arg){
        var a=arg[0],b=arg[1];
        var va=cv[a[0]][a[1]][a[2]];
        var vb=cv[b[0]][b[1]][b[2]];
        if(vb==0)poly.push(b);
        if(va==0)return;
        if(va*vb>=0)return;
        poly.push([
          (a[0]*vb-va*b[0])/(vb-va),
          (a[1]*vb-va*b[1])/(vb-va),
          (a[2]*vb-va*b[2])/(vb-va),
        ]);
      })
      if(poly.length<2)return;
      if(poly.length==2){
        lines.push([poly[0],poly[1]]);
      }else{
        for(var i=0;i<poly.length;i++){
          lines.push([poly[i],poly[(i+1)%poly.length]]);
        }
      }
    }
    sqline([0,0,0],[0,0,1],[0,1,1],[0,1,0]);
    sqline([1,0,0],[1,0,1],[1,1,1],[1,1,0]);
    sqline([0,0,0],[0,0,1],[1,0,1],[1,0,0]);
    sqline([0,1,0],[0,1,1],[1,1,1],[1,1,0]);
    sqline([0,0,0],[0,1,0],[1,1,0],[1,0,0]);
    sqline([0,0,1],[0,1,1],[1,1,1],[1,0,1]);
    var ls=lines.map(function(l){
      return l.map(function(p){
        return {
          x:center.x+r*(2*(c.x+p[0])/size-1),
          y:center.y+r*(2*(c.y+p[1])/size-1),
          z:center.z+r*(2*(c.z+p[2])/size-1)
        };
      })
    });
    var lc={x:0,y:0,z:0};
    ls.forEach(function(l){
      l.forEach(function(p){
        lc.x+=p.x/lines.length/2;
        lc.y+=p.y/lines.length/2;
        lc.z+=p.z/lines.length/2;
      })
    });
    ls.forEach(function(l){
      triangles.push([lc,l[0],l[1]]);
    })
  });
  console.log(triangles.length);
  return triangles;
}
