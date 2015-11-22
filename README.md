# Christmas Equation
render f(x,y,z)=0 → christmas tree

# demo
http://tompng.github.io/christmas_equation/


```javascript
renderer=new Renderer();
var radius=2;
var resolution=64;
renderer.add(function(x,y,z){return x*x+y*y+z*z-2},radius,resolution,'pink')
//=> sphere
renderer.add('x^2+y^2+z^2-2-cos(6*x*y-5*z^2)/9',radius,resolution,'#aaf')
//=> deformed sphere
```
