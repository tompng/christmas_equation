function donutFunc(x,y,z){
  var l=Math.sqrt(x*x+y*y);
  var donut=(l-2)*(l-2)+z*z-1+(Math.sin(7*x-8*y+9*z)+Math.sin(8*x+9*y-7*z)+Math.sin(-9*x+7*y+8*z))/64;
  var twist=0.3*Math.sin(5*Math.atan2(z,l-2)+8*Math.atan2(y,x));
  var boko=0.5/(1+100*z*z);
  return donut+twist+boko;
}
function donutChocolateFunc(x,y,z){
  var l=Math.sqrt(x*x+y*y);
  var donut=(l-2)*(l-2)+z*z-1+(Math.sin(7*x-8*y+9*z)+Math.sin(8*x+9*y-7*z)+Math.sin(-9*x+7*y+8*z))/64;
  var deko=-0.2/(1+100*z*z);
  var twist=0.3*Math.sin(5*Math.atan2(z,l-2)+8*Math.atan2(y,x));
  return (donut+twist+deko)*(donut+twist+deko)+Math.pow((x-z-5)/4,12)-0.2;
}
function donutCreamFunc(x,y,z){
  var l=Math.sqrt(x*x+y*y);
  return (l-2)*(l-2)+10*z*z-1+(Math.sin(7*x-8*y+9*z)+Math.sin(8*x+9*y-7*z)+Math.sin(-9*x+7*y+8*z))/16;
}