function mikanFunc(x,y,z) {
  return (x**2+y**2)**2/4+((z+1)*(x**2+y**2))/4+z**2-1-((z**2-1)*(x**2+y**2))/32*(Math.cos(8*x+3*y)+Math.sin(5*z+4*y))+(z+1)*(1+Math.sqrt(x**2+y**2)*Math.sin(5*Math.atan2(y,x)))/(6+96*(x**2+y**2))
}
function mikanStem(x, y, z) {
  return (256*(x**2+y**2))**2-(1-(16*(z-x**2-y**2-8/9))**6)*(1+(2-Math.sqrt((1-Math.sin(5*Math.atan2(y,x)))/2))/(1+Math.exp(256*(z-x**2-y**2-8/9))))**4
}


function kagamimochiMochiBottom(x,y,z) {
  return (x**2+y**2)**4+z*(2*z-1)*(8*z**2-8*z+4)
}
function kagamimochiMochiTop(x,y,z) {
  return (x**2+y**2)**3+(z-1)*(2*z-1)*(4*z**2-8*z+5)
}
function kagamimochiFunc(x,y,z) {
  z+=1/2
  return kagamimochiMochiBottom(x,y,z)*kagamimochiMochiTop(x,y,z) * kagamimochiMikanFunc(4*x,4*y,4*z-5)
}

function kagamimochiMikanFunc(x,y,z) {
  return mikanFunc(x, y, z) * Math.atan(mikanStem(x, y, z)/16) - 1/128
}
