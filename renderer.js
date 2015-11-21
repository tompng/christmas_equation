function heredoc(f){return f.toString().match(/\/\*([^]*)\*\//)[1]}
vertexShaderCode=heredoc(function (){/*
  varying vec3 norm;
  void main(){
    norm = (modelMatrix * vec4(normal,1)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1);
  }
*/})
fragmentShaderCode=heredoc(function(){/*
  varying vec3 norm;
  uniform vec3 light;
  uniform vec3 color;
  void main(){
    float light=0.6+0.4*dot(normalize(norm),light);
    gl_FragColor=vec4(color*light,1);
  }
*/})

function Renderer(){
  var scene = new THREE.Scene();
  var width=window.innerWidth;
  var height=window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75,width/height, 0.1, 100);
  camera.position.set(1, 0, 2);
  var renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(width,height);
  document.body.appendChild(renderer.domElement);
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  var material = new THREE.ShaderMaterial({
    vertexShader: vertexShaderCode,
    fragmentShader: fragmentShaderCode,
    side: THREE.DoubleSide,
    uniforms: {light: {type: 'v3'}, color: {type: 'c'}}
  });
  this.scene=scene;
  this.material=material;
  this.controls=controls;
  var time0=new Date();
  function render() {
    requestAnimationFrame(render);
    controls.update();
    var t=(new Date()-time0)/1000;
    var lx=Math.sin(t);
    var ly=Math.sin(1.31*t)+Math.cos(2.13*t);
    var lz=Math.cos(t)
    var lr=Math.sqrt(lx*lx+ly*ly+lz*lz);
    scene.children.forEach(function(mesh){
      mesh.material.uniforms.light.value=new THREE.Vector3(lx/lr,ly/lr,lz/lr);
    })
    controls.rotateLeft(0.001);
    renderer.render(scene, camera);
  }
  window.onresize=function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  render();
}
Renderer.prototype.add=function(func, radius, resolution, color){
  if(!radius)radius=1;
  if(!resolution)resolution=64;
  if(!color)color='white';
  var geometry=new THREE.BufferGeometry();
  var triangles=Polygonizer.generate(func,resolution,radius);
  var positions = new Float32Array( triangles.length * 3 * 3 );
  var normals = new Float32Array( triangles.length * 3 * 3 );
  for(var i=0;i<triangles.length;i++){
    for(var j=0;j<3;j++){
      var p=triangles[i][j]
      var idx=9*i+3*j;
      var d=radius/resolution/1024;
      var fx=func(p.x+d,p.y,p.z)-func(p.x-d,p.y,p.z);
      var fy=func(p.x,p.y+d,p.z)-func(p.x,p.y-d,p.z);
      var fz=func(p.x,p.y,p.z+d)-func(p.x,p.y,p.z-d);
      var fr=Math.sqrt(fx*fx+fy*fy+fz*fz);
      fx/=fr;fy/=fr;fz/=fr;
      positions[idx+0]=p.x;
      positions[idx+1]=p.y;
      positions[idx+2]=p.z;
      normals[idx+0]=fx/fr;
      normals[idx+1]=fy/fr;
      normals[idx+2]=fz/fr;
    }
  }
  geometry.addAttribute('position',new THREE.BufferAttribute(positions,3));
  geometry.addAttribute('normal',new THREE.BufferAttribute(normals,3));
  var material=this.material.clone();
  material.uniforms.color.value=new THREE.Color(color);
  var mesh=new THREE.Mesh(geometry,material);
  this.scene.add(mesh);
}