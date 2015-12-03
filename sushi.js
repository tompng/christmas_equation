function sushiShariFunc(x,y,z){
  y+=Math.sin(x*3+2*z)/32-Math.sin(2*x-3*z)/32;
  z+=Math.cos(x*7+5*y-6*z)/128-Math.cos(7*x-5*y+6*z)/128;
  y*=2;z*=1.6;
  var r4=Math.sqrt(x*x*x*x+y*y*y*y+z*z*z*z);
  var r=Math.sqrt(x*x+y*y+z*z);
  var rx=x/r,ry=y/r,rz=z/r;rx*=3;ry*=3;rz*=3;
  var s1=Math.sin(1*rx+2*ry+3*rz+1)*Math.sin(2*rx-1*ry+1*rz+2)*Math.sin(3*rx-2*ry+1*rz+3);
  var s2=Math.sin(2*rx+2*ry+1*rz+2)*Math.sin(1*rx-3*ry+1*rz+3)*Math.sin(2*rx-3*ry-1*rz+4);
  var s3=Math.sin(1*rx+3*ry+2*rz+3)*Math.sin(3*rx+2*ry-2*rz+4)*Math.sin(1*rx+1*ry-3*rz+5);
  var s4=Math.sin(3*rx+1*ry+2*rz+4)*Math.sin(1*rx+1*ry-3*rz+5)*Math.sin(2*rx-3*ry+1*rz+6);
  var s=Math.pow(Math.pow(s1,8)+Math.pow(s2,8)+Math.pow(s3,8)+Math.pow(s4,8),1/8)
  return r4-0.8+0.2/(1+40*s*s);
}

function sushiMaguroFunc(x,y,z){
  x+=(Math.sin(4*x-3*y+z)-Math.sin(x+4*y+3*z))/32;
  y+=(Math.sin(x+4*y+3*z)-Math.sin(4*x-3*y+z))/64;
  z+=(Math.sin(3*x+y-4*z)-Math.sin(3*x-y-4*z))/32;
  y-=0.6-x*x/4-z*z/2-x*x*x*x/12;
  y+=y*Math.pow(Math.sin(5*x+7*z),16)/4;
  return Math.pow(x*(1-y/4)/1.2+z/8,8)+Math.pow(y/0.15,16)+Math.pow(z*(1-y/2)/0.7,8)-1;
}
