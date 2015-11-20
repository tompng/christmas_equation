function starfunc(x,y,z){
  x*=3;
  y*=3;
  y=y-3.4;
  z*=2;
  var l=Math.sqrt(0.01+x*x+y*y)-0.1;
  var th=Math.atan2(y,x);
  return 4*Math.sqrt(0.01+z*z)+l*(1-0.2*Math.asin(0.98*Math.sin(5*th)))-1
}
function decofunc(x,y,z){
  var y0=y;
  y+=Math.sin(3*x+4*y+5*z)/12;
  var r=(1-y0)/2+0.1;
  return Math.pow(Math.sin(6*y)/6,2)+Math.pow(Math.sqrt(x*x+z*z)-r,2)-(1-y*y)/1000;
}
function treefunc(x,y,z){
  var l2=x*x+z*z,l=Math.sqrt(l2);
  var s=Math.atan2(z,x);
  var t=1-y-Math.sqrt(l2)/2;
  var deko=Math.pow(Math.sin(2*s+3*3*t)*Math.sin(3*s-3*2*t),2)/(1+Math.exp(10*(t-1.45)))
  l-=deko*(1-y)/8;
  y-=deko*(1-y)/8;
  var a=4*l/(1-y+Math.sqrt(0.01+(1-y)*(1-y)))*Math.sqrt(1-y*y+Math.sqrt(0.01+(1-y*y)*(1-y*y)))
  return y*y+a*a-1-10/(1+Math.pow(40*l2,10)+Math.pow((y+1)*10,10));
}
function christmasfunc(x,y,z){
  var tree=treefunc(x,y,z);
  var star=starfunc(x,y,z);
  var deco=decofunc(x,y,z);
  return (Math.atan(tree)*Math.atan(star)-0.01)*deco
}
