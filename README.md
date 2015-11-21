# Christmas Equation
render f(x,y,z)=0 → christmas tree

# demo
http://tompng.github.io/christmas_equation/



```javascript
renderer=new Renderer();
var radius=2;
var resolution=64;
renderer.add(function(x,y,z){
  return x*x+y*y+z*z-1-Math.cos(7*x*y-8*z*z)/9;
},radius,resolution,'pink');
//=> deformed sphere[x^2+y^2+z^2-1-cos(7xy-8z^2)/9=0]
```
