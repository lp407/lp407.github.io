let octahedrons;
let particleEffect;
let myCam;
let player;
let playerShader, boxShader, landscapeShader, particleShader;
let noisetxt;
let ampSlider, speedShiftSlider;
let worldOffset;
let gui;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  player.playerCamera.perspective(PI / 3.0, width / height, 0.1, 1000000);
}

function keyPressed(){
  if (keyCode == ESCAPE){
    gui.show();
  }
}


// MAIN SECTION //

function preload(){
  // load shaders
  particleShader = loadShader('assets/particle.vert', 'assets/particle.frag');
  boxShader = loadShader('assets/box.vert', 'assets/box.frag');
  playerShader = loadShader('assets/player.vert', 'assets/player.frag');
  landscapeShader = loadShader('assets/landscape.vert', 'assets/landscape.frag');
  // load textures
  noisetxt = loadImage('assets/noiseTexture.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // init classes
  player = new Player();
  gui = new GUI();
  particleEffect = new OctahedronParticles(100000, 30, 0.5);
  // camera should probably not be coupled with the player like this
  setCamera(player.playerCamera);
  // the player stays at world origin and the world moves around them
  worldOffset = createVector(0, 0, 0);
}

function draw() {
  background(0);
  orbitControl();
  // update
  gui.update();
  player.input();
  // render
  player.render();
  particleEffect.render();
  drawBox();
  drawLandscape();
}
