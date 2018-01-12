function applepenFunc(x,y,z){
  const r2 = x**2+y**2
  const theta = Math.atan2(y,x)
  return (
    1.4*r2+(0.8*z+(z+0.5)/(1.5+32*r2))**2+(z**4+z**3)/2-1-z/4
    -(8*Math.sin(theta)+5*Math.cos(theta)-Math.sin(5*theta))/64*(1-1/(1+64*r2))
  )*Math.atan(
    16*((3*x+Math.sin(7*z)/16)**2+(3*y-Math.sin(9*z)/16)**2)-1+0.75/(1+Math.exp(24*(z-1)))+(3*z-2.2)**16
  )*Math.atan(
    (3*y+Math.cos(9*x)/32)**2+(3*z-2.7-Math.sin(12*x)/16)**2
    +(24*z-21.6-4*Math.sqrt(0.001+9*y*y)+9*y*y/4+Math.exp(3*x-2.5))**4/(1+Math.exp(-24*x+11.2))
    -(1-(3*x-2.5)**2/4)**3+((1-(3*x-2.5)**2/4)**3-0.02)/(1+Math.exp(24*x-9))+Math.exp(-6*x-3.4)
  )-0.01+(
    32*(x**2+y**2+z**2-(x-y+z)**2/3)-(1.3+(x-y+z)/2.5-Math.sqrt(1/1024**2+((x-y+z)/2.5+0.7)**2))**2+((x-y+z)/2.5)**256
    -(x-y+z)/(24+(3.2*(x-y+z)-6.4)**256)
  )*Math.exp(
    -128*(x**2+y**2+z**2-(x-y+z)**2/3-0.04)
  )
}
