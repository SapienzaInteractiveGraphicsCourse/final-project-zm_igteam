// import of the needed libraries
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/GLTFLoader.js';



// --- Declaration of variables for the main scene ------
var root;
var renderer, camera, scene, controls;
//---------


// sounds variables
var sound;
var soundEagle;
var soundWind;
//-------

// variables to control the vehicles animation
// each move is the initial value of movement of the corresponding value
// that will be then used in the move vehicle function

var move1 = 0;
var move2 = 0;
var move3 = 0;
var move4 = 10;
var move5 = 8; // for car Police
var move6 = 0; // for car Brown
var move7 = 103; // for car red
var move8 = 113; // for car black
var move9 = 92; // for car green
var move10 = 120; // for car white
// the same reasoning is applyed for the turning variables
var turn1 = 0;
var turn2 = Math.PI;
var turn3 = 0;
var turn4 = 0;
var turn5 = -Math.PI;
var turn6 = -Math.PI;
var turn7 = -Math.PI/2;
var turn8 = -Math.PI/2;
var turn9 = Math.PI/2;
var turn10 = Math.PI/2;
// -----------------------


// booleans for camera switch
var active  = false;
var activeCamera = false;
// --------------------------------

// variables for the Ferris wheel
var axle;
var upper_ring;
// ----------------------------------

// here is added the event listener for the keyboard commands
document.addEventListener("keydown", onKeyDown, false);


// ----------------------------
// now we load the main scene - the city
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('models/definitiveCity.glb', (gltf) => {
      root = gltf.scene;
      scene.add(root);

      root.traverse((obj) => {
        if (obj.castShadow !== undefined) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });


//  ---------- loading of the cars ----------------
    camion = root.getObjectByName('camion1');
    //camion.position.y = 20;

    carBlack = root.getObjectByName('carBlack1');

    carPink = root.getObjectByName('carPink1');

    carBrown = root.getObjectByName('carBrown1');

    carGreen = root.getObjectByName('carGreen1');

    carLimo = root.getObjectByName('carLimo1');

    carPolice = root.getObjectByName('carPolice1');

    carRed = root.getObjectByName('carRed2');

    carWhite = root.getObjectByName('carWhite1');

    carYellow = root.getObjectByName('carYellow1');

    //console.log("camion position x: ", camion.position.x);
    //console.log("camion rotation z: ", camion.rotation.z);



// ----------- retrieving variables for the ferris wheel -------------

    axle = root.getObjectByName('AXLE');

    upper_ring = root.getObjectByName('SUPPORT.RING.OUTER');


// -------------- eagle model loading -------------------------
    gltfLoader.load('models/eagle.glb', (gltf) => {
      eagle = gltf.scene;
      scene.add(eagle);

// we add the shadows also to the eagle
      eagle.traverse((obj) => {
          if (obj.castShadow !== undefined) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });

// now we retrieve the single parts of eagle used in the animation
      body = eagle.getObjectByName('eagleBody');
      //scene.add(body);

      head = eagle.getObjectByName('neck');

      rightWing = eagle.getObjectByName('rightWing');
      leftWing = eagle.getObjectByName('leftWing');

      rightDownWing = eagle.getObjectByName('downRightWing');
      leftDownWing = eagle.getObjectByName('downLeftWing');

      rightPaw = eagle.getObjectByName('rightPaw');
      leftPaw = eagle.getObjectByName('leftPaw');

      upperBeak = eagle.getObjectByName('upperBeakPart');
      lowerBeak = eagle.getObjectByName('lowerBeakPart');

      body.position.set(-2, 180, -115); // initial position of the eagle set in the tip of the main tower

      //console.log(dumpObject(eagle).join('\n'));  //this prints the Scenegraph

    });

// -------------- end of eagle loading ---------------------------------------------




      // compute the box that contains all the stuff
      // from root and below

      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.update();
    });



function main() {
  const canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.shadowMap.enabled = true;

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	// ------------------------------------------------------
	  // create an AudioListener and add it to the camera
	  var listener = new THREE.AudioListener();
	  camera.add( listener );

	  // create a global audio source
	  sound = new THREE.Audio( listener );
    soundEagle = new THREE.Audio( listener );
    soundWind = new THREE.Audio( listener );

	  // load a sound and set it as the Audio object's buffer
	  var audioLoader = new THREE.AudioLoader();
	  audioLoader.load( 'sound/zelda.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( true );
		sound.setVolume( 0.3 );
		sound.play();
	  });

    // sound for the eagle
    var audioLoader = new THREE.AudioLoader();
	  audioLoader.load( 'sound/eagleSound.mp3', function( buffer ) {
		soundEagle.setBuffer( buffer );
		soundEagle.setLoop( false );
		soundEagle.setVolume( 0.2 );
	  });

    var audioLoader = new THREE.AudioLoader();
	  audioLoader.load( 'sound/wind.mp3', function( buffer ) {
		soundWind.setBuffer( buffer );
		soundWind.setLoop( false );
		soundWind.setVolume( 0.5 );
    soundWind.play();
	  });

	// ------------------------------------------------------

// with this we can control the scene with the mouse's left key holding
  controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();
//---------

  scene = new THREE.Scene();
  scene.background = new THREE.Color('#DEFEFF');
// now we load the background texture
  {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      'sky3/px.png',
      'sky3/nx.png',
      'sky3/py.png',
      'sky3/ny.png',
      'sky3/pz.png',
      'sky3/nz.png',
    ]);
    scene.background = texture;
  }

  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;
    light.position.set(-1000, 1000, -300); // first value is left and right, second is up and down, third is forward and backward
    light.target.position.set(-550, 40, -450);

    light.shadow.bias = -0.004;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    scene.add(light);
    scene.add(light.target);

    const cam = light.shadow.camera;
    cam.near = 1;
    cam.far = 2000;
    cam.left = -1500;
    cam.right = 1500;
    cam.top = 1500;
    cam.bottom = -1500;
  }




  requestAnimationFrame(render);
}


  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    // pick some near and far values for the frustum that
    // will contain the box.
    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    // point the camera to look at the center of the box
    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }


  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

// ----------------------
  function render() {

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
  }
// -----------------------

// -----------function that handles the keys interaction ------------------
function onKeyDown(event) {

    var keyCode = event.which;

    if(keyCode == 32){ // press spacebar to make the eagle fly
    startFly = true;
    }

    if(keyCode == 87){ // press S to switch between Orbit Controls and Camera
    active = !active;
    }

    if(keyCode == 83){ // press w to switch between third and first person
    activeCamera = !activeCamera;
    }

    if(keyCode == 65){ // make the eagle shout
    soundEagle.play();
    }

}
// --------------------------


 function animate(time){

// time is ised for basic movements like rotation of the wheels
  time *= 0.001	;  // convert to seconds

/* for each car we have a piece of code that sets all the relative parameters
before to call the move vehicle function */

  if(camion){
// declaration of customized variable for the vehicle movement
    var value = 96;
    var angle = Math.PI/2;
    var shift = 0.08;
    var i = 0;
    var turn;
    var move;
// incrementation of the move that controls when to turn and change direction
    move1 += shift;
// here we control the 4 directions to follow and the turning variable
    if(move1 >= value-shift && move1 < value){turn1 += angle; }
    if(move1 >= (2*value)-shift && move1 < 2*value){turn1 += angle; }
    if(move1 >= (3*value)-shift && move1 < 3*value){turn1 += angle;}
    if(move1 >= 4*value-shift && move1 < 4*value){ // if the square movement is complete we can restart it
      turn1 += angle;
      move1 = 0;
      }
// local variables are set each time to be send to the muovi_macchina
    move = move1;
    turn = turn1;
// muovi macchina is called with all local variables instantiated
    move_vehicle(camion, move, value, shift, turn, time);
  }

// ----------
  if(carPink){
    var value = 95;
    var angle = Math.PI/2;
    var shift = 0.3;
    var turn;
    var move;

    move2 += shift;

    if(move2 >= value-shift && move2 < value){turn2 += angle; }
    if(move2 >= (2*value)-shift && move2 < 2*value){turn2 += angle; }
    if(move2 >= (3*value)-shift && move2 < 3*value){turn2 += angle;}
    if(move2 >= 4*value-shift && move2 < 4*value){ // if the square movement is complete we can restart it
      turn2 += angle;
      move2 = 0;
      }

    move = move2;
    turn = turn2;

    move_vehicle(carPink, move, value, -shift, turn, time);
  }
// ----------
  if(carLimo){
    var value = 95;
    var angle = Math.PI/2;
    var shift = 0.1;
    var turn;
    var move;

    move3 += shift;

    if(move3 >= value-shift && move3 < value){turn3 += angle; }
    if(move3 >= (2*value)-shift && move3 < 2*value){turn3 += angle; }
    if(move3 >= (3*value)-shift && move3 < 3*value){turn3 += angle;}
    if(move3 >= 4*value-shift && move3 < 4*value){ // if the square movement is complete we can restart it
      turn3 += angle;
      move3 = 0;
      }

    move = move3;
    turn = turn3;

    move_vehicle(carLimo, move, value, shift, turn, time);
  }
// ----------
  if(carYellow){
    var value = 105;
    var angle = Math.PI/2;
    var shift = 0.2;
    var turn;
    var move;

    move4 += shift;

    if(move4 >= value-shift && move4 < value){turn4 += angle;  }
    if(move4 >= (2*value)-shift && move4 < 2*value){turn4 += angle; move4+=10; } // the addition in move helps in all the cases where the car has to make a non squared path
    if(move4 >= (3*value)-shift && move4 < 3*value){turn4 += angle; }
    if(move4 >= 4*value-shift && move4 < 4*value){ // if the square movement is complete we can restart it
      turn4 += angle;
      move4 = 0;
      move4+=10;
      }

    move = move4;
    turn = turn4;

    move_vehicle(carYellow, move, value, shift, turn, time);
  }
// ----------
  if(carPolice){
    var value = 102;
    var angle = Math.PI/2;
    var shift = 0.17;
    var turn;
    var move;

    move5 += shift;

    if(move5 >= value-shift && move5 < value){turn5 += angle; }
    if(move5 >= (2*value)-shift && move5 < 2*value){turn5 += angle; move5+=8; } // the addition in move helps in all the cases where the car has to make a non squared path
    if(move5 >= (3*value)-shift && move5 < 3*value){turn5 += angle;}
    if(move5 >= 4*value-shift && move5 < 4*value){ // if the square movement is complete we can restart it
      turn5 += angle;
      move5 = 0;
      move5+=8;
      }

    move = move5;
    turn = turn5;

    move_vehicle(carPolice, move, value, -shift, turn, time);
  }
// ----------
  if(carBrown){
    var value = 105;
    var angle = Math.PI/2;
    var shift = 0.2;
    var turn;
    var move;

    move6 += shift;

    if(move6 >= value-shift && move6 < value){turn6 += angle; move6+= 10;} // the addition in move helps in all the cases where the car has to make a non squared path
    if(move6 >= (2*value)-shift && move6 < (2*value)){turn6 += angle; }
    if(move6 >= (3*value)-shift && move6 < (3*value)){turn6 += angle; move6+= 10;}
    if(move6 >= (4*value)-shift && move6 < (4*value)){
      turn6 += angle;
      move6 = 0;
    }

    move = move6;
    turn = turn6;

    move_vehicle(carBrown, move, value, -shift, turn, time);
  }
// ----------
  if(carRed){
    var value = 103;
    var angle = Math.PI/2;
    var shift = 0.15;
    var turn;
    var move;

    move7 += shift;

    if(move7 >= value-shift && move7 < value){turn7 += angle; }
    if(move7 >= (2*value)-shift && move7 < 2*value){turn7 += angle; }
    if(move7 >= (3*value)-shift && move7 < 3*value){turn7 += angle;}
    if(move7 >= 4*value-shift && move7 < 4*value){ // if the square movement is complete we can restart it
      turn7 += angle;
      move7 = 0;
      }

    move = move7;
    turn = turn7;

    move_vehicle(carRed, move, value, -shift, turn, time);
  }
// ----------
  if(carBlack){
    var value = 105;
    var angle = Math.PI/2;
    var shift = 0.2;
    var turn;
    var move;

    move8 += shift;

    if(move8 >= value-shift && move8 < value){turn8 += angle; move8 += 8;} // the addition in move helps in all the cases where the car has to make a non squared path
    if(move8 >= (2*value)-shift && move8 < 2*value){turn8 += angle;  }
    if(move8 >= (3*value)-shift && move8 < 3*value){turn8 += angle; move8 += 8;}
    if(move8 >= 4*value-shift && move8 < 4*value){ // if the square movement is complete we can restart it
      turn8 += angle;
      move8 = 0;
      }

    move = move8;
    turn = turn8;

    move_vehicle(carBlack, move, value, -shift, turn, time);
  }
// ----------
  if(carGreen){
    var value = 92;
    var angle = Math.PI/2;
    var shift = 0.1;
    var turn;
    var move;

    move9 += shift;

    if(move9 >= value-shift && move9 < value){turn9 += angle; }
    if(move9 >= (2*value)-shift && move9 < 2*value){turn9 += angle; }
    if(move9 >= (3*value)-shift && move9 < 3*value){turn9 += angle;}
    if(move9 >= 4*value-shift && move9 < 4*value){ // if the square movement is complete we can restart it
      turn9 += angle;
      move9 = 0;
      }

    move = move9;
    turn = turn9;

    move_vehicle(carGreen, move, value, shift, turn, time);
  }
// ----------
  if(carWhite){
    var value = 105;
    var angle = Math.PI/2;
    var shift = 0.2;
    var turn;
    var move;

    move10 += shift;

    if(move10 >= value-shift && move10 < value){turn10 += angle; move10+=7; } // the addition in move helps in all the cases where the car has to make a non squared path
    if(move10 >= (2*value)-shift && move10 < 2*value){turn10 += angle;  }
    if(move10 >= (3*value)-shift && move10 < 3*value){turn10 += angle; move10 += 7;}
    if(move10 >= 4*value-shift && move10 < 4*value){ // if the square movement is complete we can restart it
      turn10 += angle;
      move10 = 0;
      }

    move = move10;
    turn = turn10;

    move_vehicle(carWhite, move, value, shift, turn, time);
  }



// --------- begin of control eagle animation ------
  if(eagle){

    move_static();

    // enable first/third person camera on the eagle
    if(active){
		var relativeCameraOffset = new THREE.Vector3(0,-5, -5);
    var cameraOffset = relativeCameraOffset.applyMatrix4(body.matrixWorld );

    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;

    camera.lookAt(body.position); // in front of the head

    if(activeCamera){body.add(camera);}
    else {body.remove(camera); } //switch between 1st and 3rd person
    }
    //console.log("startFly is: ",startFly);
    if(startFly){
    move_eagle();
    }

  }

// control for the Ferris Wheel animation
  if(axle){
    axle.rotation.y = 0.5*time;
    for (const piece of axle.children){
      for(const peg of piece.children) {
        if(peg.name.includes("SEAT")) {
           peg.rotation.z = 0.5*time + Math.PI;
           //console.log(piol.name);
          }
      }
    }
  }


  requestAnimationFrame(animate);

  render();
  }

//////////////

main();
animate();
