function mod1(a){
  a - Math.floor(a) // note: a%1 != mod1(a) for a<0
}
function imogaiPatternFunc(z,d,r) {
  const modz1 = z - Math.floor(z) // note: z % 1 != mod(z, 1) for z < 0
  return r*r*((d-1)**12+16*(modz1-1/2)**2-1)**2-4+(z>4 ? 32 : 0)+2*Math.exp(-d-6*modz1+4)
}
function imogaiFunc(x, y, z) {
  x*=3
  y*=3
  z*=3
  x+=0.001
  y-=4
  const r = Math.hypot(x,y,z)
  const D = 2*Math.acos(-y/r)
  const Z = 2*Math.log(r)+D
  const th = Math.PI/2*(Math.abs(z)/z||1)-Math.atan(x/z) // Math.arctan2(z,x)
  const za = Z-th/4/Math.PI
  const zb = za-1/2
  return Math.min(
    imogaiPatternFunc(za,D,r),
    imogaiPatternFunc(zb,D,r) + 64 * (zb>3 ? Math.max(th-Math.sin(D), 0) : 0),
    (32-24*Math.sin(4*Math.PI*za))*(x*x+z*z)+((y+4)/3)**8 - 1
  )
}
