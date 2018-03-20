function takenokoFunc(x, y, z) {
  z -= 3
  function smoothmax(a,b){return (a+b+Math.sqrt((a-b)*(a-b)+0.01))/2}
  return 2*z+Math.exp(-z-4)+Math.exp(-8*z-48)-8+Math.sqrt(
    1/8+x*x+y*y+2*Math.pow(x*x+y*y,2)
  )-smoothmax(
      1/(1+Math.exp(8*(z+x)))+1/(1+Math.exp(8*(z+x+3))),
      1/(1+Math.exp(8*(z-x)))+1/(1+Math.exp(8*(z-x+3)))-1/2
  )/(1+Math.exp(-16*z-72))
}


function realKinoko(x,y,z){
  return Math.atan(
    x*x+y*y+2*z*z+Math.exp(-10*(z+Math.pow(x*x+y*y,4)+0.5*(x*x+y*y)*Math.pow(1-x*x-y*y,2)*Math.sin(64*Math.atan2(y,x))))-1
  )*((Math.pow(x-z*z/8,2)+Math.pow(y+z*z*(2+z)/6,2))*8+4*Math.pow(z+1/2,4)-2*Math.pow(z+1/2,2)-1)-0.1
}


function realTakenokoRot(z,a,b){return Math.exp((z+a+Math.exp((z+a)/4)-a*Math.sqrt(4*b*b/(1+4*b*b)))/2-1)}
function realTakenokoGiza(a){return Math.atan((1-Math.pow(Math.sin(a),32))*Math.tan(a))-a}
function realTakenoko(x,y,z){
  return (
    4-Math.sqrt(x*x+y*y+2*Math.pow(x*x+y*y,2))+
    (1-1/(1+x*x+y*y))*Math.max(
      realTakenokoGiza(realTakenokoRot(z,x,y)),
      realTakenokoGiza(realTakenokoRot(z,-x/2+y/1.73,x/1.73+y/2)-Math.PI/3)-Math.PI/3,
      realTakenokoGiza(realTakenokoRot(z,-x/2-y/1.73,x/1.73-y/2)-Math.PI*2/3)-Math.PI*2/3,
    )/(2+2*Math.exp(-32*z-48-2*x))-Math.exp(-32*z-64)
    -z-Math.exp(-z/2)
  )
}
