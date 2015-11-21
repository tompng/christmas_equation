function shellFunc(x,y,z){
  z=Math.abs(z);
  z-=0.5;
  x*=1-1.25/(1+8*(y-0.9)*(y-0.9))+1/(1+16*(y-0.8)*(y-0.8));
  var th=Math.atan2(x,y-1);
  var zz=z+x*x/2+y*y/4+(y-1)*Math.cos(32*th)/32+(y-1)/8;
  return x*x+y*y+32*Math.atan(zz)*Math.atan(zz)-1
}