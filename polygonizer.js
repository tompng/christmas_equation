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
        neg=neg||val<0;pos=pos||val>0;
        var val=calc(c.x+i,c.y+j,c.z+s);
        neg=neg||val<0;pos=pos||val>0;
        var val=calc(c.x,c.y+i,c.z+j);
        neg=neg||val<0;pos=pos||val>0;
        var val=calc(c.x+s,c.y+i,c.z+j);
        neg=neg||val<0;pos=pos||val>0;
        var val=calc(c.x+j,c.y,c.z+i);
        neg=neg||val<0;pos=pos||val>0;
        var val=calc(c.x+j,c.y+s,c.z+i);
        neg=neg||val<0;pos=pos||val>0;
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
    var points=[];
    for(var i=0;i<2;i++)for(var j=0;j<2;j++)for(var k=0;k<2;k++){
      var a,b,p;
      if(i==0&&(a=cv[0][j][k])*(b=cv[1][j][k])<=0){
        p={x:c.x+a/(a-b),y:c.y+j,z:c.z+k};
        points.push([2+j,4+k,p]);
      }if(j==0&&(a=cv[i][0][k])*(b=cv[i][1][k])<=0){
        p={x:c.x+i,y:c.y+a/(a-b),z:c.z+k};
        points.push([i,4+k,p]);
      }if(k==0&&(a=cv[i][j][0])*(b=cv[i][j][1])<=0){
        p={x:c.x+i,y:c.y+j,z:c.z+a/(a-b)};
        points.push([i,2+j,p]);
      }
    }
    if(!points.length)return;
    var lines=[];
    var ps=points.map(function(a){return a});
    while(points.length){
      var p=points.shift();
      var line=[p[2]];
      lines.push(line);
      var key=p[0];
      while(true){
        var p2=null;
        points.forEach(function(q){
          if(q[0]==key||q[1]==key)p2=q;
        });
        if(!p2)break;
        points=points.filter(function(q){return p2!=q})
        p=p2;
        line.push(p[2]);
        key=p[0]+p[1]-key;
      }
    }
    lines.forEach(function(line){
      for(var i=2;i<line.length;i++){
        triangles.push([line[0],line[i-1],line[i]]);
      }
    });
  });
  return triangles;
}
