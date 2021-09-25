function imogaiFunc(x, y, z) {
  x*=2.2
  y*=2.2
  z*=2.2
  z+=4
  const L = Math.hypot(x,y,z)
  const X=2*Math.acos(z/L)
  const Z=2*Math.log(L)+X
  const th = Math.atan2(y,x)
  const a = ((X-1)**8+16*((Z-th/Math.PI/4)%1-1/2)**2-1)**2*L*L-16+(Z-th/Math.PI/4>4 ? 32 : 0)
  const b = ((X-1)**8+16*((Z-th/Math.PI/4 - 1 / 2)%1-1/2)**2-1)**2*L*L-16+
    (Z-th/Math.PI/4-1/2>4 ? 32 : 0)+
    (Z-th/Math.PI/4-1/2>3 ? Math.max(32*(th-Math.sin(X)), 0) : 0)
  return Math.min(a,b)
}