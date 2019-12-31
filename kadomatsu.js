function kadomatsuBamboo(x,y,z,a,h) {
  const r2 = x**2+y**2
  return Math.max(
    (r2-1/2)**2-1/64-Math.exp(-4*r2**2-64*Math.sin(3/2*z-a)**2)/3,
    z-h-3/2*y,
    -2-z
  )
}
function kadomatsuRope(x, y, z) {
  const r = 9/5*(1 - Math.sin(3*Math.atan2(y,x))/12)
  return (Math.sqrt(x**2+y**2)-r)**2+(1+Math.sin(32*z-Math.atan2(y,x)))/160+(z+1)**16-1/64
}
function kadomatsuFunc(x,y,z){
  return kadomatsuBamboo(x,y-1,z,1,3)*
  kadomatsuBamboo(x-7/8,y+1/2,z,2,2)*
  kadomatsuBamboo(x+7/8,y+1/2,z,3,1)*
  kadomatsuRope(x, y, z)
}
