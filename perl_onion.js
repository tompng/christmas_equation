function perlOnionFunc(x,y,z){
  var rz2=x*x+y*y;
  var th=Math.atan2(y,x);
  var oz=z+0.1-0.2/(1+20*rz2);
  var onion=0.9*rz2*Math.pow(1+Math.exp(4*oz-3),2)+Math.pow(oz-0.1,2)-1;
  var siwa = 1/(1+Math.exp(20*(th-0.8)))-1/(1+Math.exp(20*(th-1.4)))+1/(1+Math.exp(20*(th-2.2)))
  onion+=0.2*Math.sin(Math.PI*siwa)*rz2/(1+rz2)
  var hy=4*(y-0.1),hz=4*(z+0.9),hx=4*x*(1+hz/2);
  var hige = Math.pow(hx*(1-hx*hx)/(1+hx*hx),2)+hz*hz/4+hy*hy/4-0.06;
  return (rz2+z*z-2/(1+Math.exp(80*y))+Math.exp(-4*onion))*(onion+0.2)*(Math.exp(-hige/2)-1)
}
