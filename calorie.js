function calorieFunc(x, y, z) {
  const a = 1.15
  const b = 0.92
  const hole = 1/(1+20**4*((x*(x**2-a**2)*(x**2-4*a**2)/(x**4+a**2*x**2+4*a**4))**2+(y**2-b**2/4)**2)**2)
  const bottom = z
  const top = 1.9-(x/4.2)**6-y**2/8-hole-z
  const edge = 3.6-((z-0.5)**2+y**2)/8-Math.abs(x)
  const side = a - (z-0.8)**2*(1/20+(x/5)**6)-Math.abs(y)
  // return Math.min(top, bottom, edge, side)
  function f(x,y) { return x + y - Math.sqrt(0.01 + (x - y) ** 2) }
  return f(f(top, bottom), f(edge, side))
}