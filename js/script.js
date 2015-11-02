
//Global vars
var container, scene, camera, renderer, stats;
var keyboard = new KeyboardState();
var mesh;

//Startups
init();
animate();

//Functions
function init() {
  //SCENE
  scene = new THREE.Scene();

  //camera
  var SCREEN_WIDTH = window.innerWidth;
  var SCREEN_HEIGTH = window.innerHeight;
  var VIEW_ANGLE = 45;
  var ASPECT = SCREEN_WIDTH / SCREEN_HEIGTH;
  var NEAR = 0.1;
  var FAR = 20000;
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 150, 400);
  camera.lookAt(scene.position);

  //RENDERER
  if (Detector.webgl) {
    renderer = new THREE.WebGLRenderer({antialias: true });
  }else{
    renderer = new THREE.CanvasRenderer();
  }

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGTH);
  container = document.getElementById("ThreeJS");
  container.appendChild(renderer.domElement);

  //STATS
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild(stats.domElement);

  // LIGHT
  var light = new THREE.PointLight(0xffffff);
  light.position.set(100,250,100);
  scene.add(light);

  // FLOOR
  var floorTextureLoader = new THREE.TextureLoader();
  floorTextureLoader.load('images/checkerboard.jpg',
  function (texture){
    texture.wrapS = texture.wrapT =THREE.RepeatWrapping;
    texture.repeat.set(10,10);
    var floorMaterial = new THREE.MeshBasicMaterial({map:texture, side:THREE.DoubleSide});
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
  });

	// SKYBOX
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);

  ////////////
  // CUSTOM //
  ////////////

  var geometry = new THREE.SphereGeometry( 30, 32, 16 );
  var material = new THREE.MeshLambertMaterial( { color: 0x000088 } );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0,40,0);
  scene.add(mesh);
}

function animate()
{
  requestAnimationFrame(animate);
  render();
  update();
}

function update()
{
  if (keyboard.pressed("z")) {
    //Do stuff
  }
  stats.update();
}

function render()
{
  renderer.render(scene, camera);
}
