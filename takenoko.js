function takenokoFunc(x, y, z) {
  z -= 3
  return 2*z+Math.exp(-z-4)+Math.exp(-8*z-48)-8+Math.sqrt(
    1/8+x*x+y*y+2*Math.pow(x*x+y*y,2)
  )-Math.max(
      1/(1+Math.exp(8*(z+x)))+1/(1+Math.exp(8*(z+x+3))),
      1/(1+Math.exp(8*(z-x)))+1/(1+Math.exp(8*(z-x+3)))-1/2
  )/(1+Math.exp(-16*z-72))
}
