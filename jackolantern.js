function jackolanternPumpkinFunc(x,y,z){
  const theta = Math.atan2(y,x)
  const X=x/Math.sqrt(0.1+y*y)
  const Y=2*z/Math.sqrt(0.1+y*y)
  const f=(
    X**2+12*(Y-X*X/2+Math.acos(0.9*Math.cos(4*Math.PI*X))/4)**2-1
    -100/(1+1000*((X-0.5)**4+(Y-1.1)**4))
    -100/(1+1000*((X+0.4)**4+(Y-1)**4))
  )
  const p=(
    x**2+y**2+z**2-z**3+z**4+1/(2+20*(x**2+y**2))
    -(Math.cos(2*theta)+Math.sin(3*theta)+Math.sin(4*theta))/32
    -0.4*Math.pow(x**2+y**2,1/4)*Math.pow(
      0.1+(Math.sin(11*theta)+Math.sin(7*theta+1)+Math.sin(8*theta+2)+Math.sin(6*theta+3))**2,1/16
    )
  )
  return (p-0.85)**2-0.04+0.2/(1+Math.exp(40*(f+Math.exp(10*y))))
}


function jackolanternStemFunc(x,y,z){
  const theta = Math.atan2(y,x)
  return (
    256*(x**2+y**2)+(4.5*z-5)**16
    -(8+4*Math.sin(5*theta)+2*Math.cos(3*theta))/(1+10*(4.5*z-4)**2)
    -1
    -(Math.sin(8*theta)+Math.cos(11*theta))/4
    -(Math.cos(2*theta)+Math.sin(3*theta)+Math.sin(4*theta))/32
  )
}
