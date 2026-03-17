let x = 0.1;
let y = 0;
let z = 0;

let dt = 0.01;

// Duffing parameters
let a = 1;   // linear stiffness
let b = -1;  // nonlinear stiffness
let c = 0.2; // damping
let f = 0.2; // driving amplitude
let w = 1.2; // driving frequency

let path = [];

let myScale = 250; // orbit scale

let lightGreen = color(80, 51, 83, 1);
let offWhite = color(150, 1, 97, 1);

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.parent("canvas-container");
  colorMode(HSB, 360, 100, 100, 1);
  background(240, 6, 14, 1);
}

function draw() {
  background(240, 6, 14, 1);
  stroke('offWhite');
  rotateY(frameCount * 0.006);
  sphere();
  orbitControl();
  rotateX(frameCount * 0.002);
  rotateY(frameCount * 0.004);
  
  // 3D Duffing-like chaotic equations
  let dx = y;
  let dy = -c * y - a * x - b * x*x*x + f * cos(w * frameCount * dt) + 0.5 * z;
  let dz = -c * z - a * z - b * z*z*z + 0.5 * x;
  
  x += dx * dt;
  y += dy * dt;
  z += dz * dt;
  
  path.push({x: x, y: y, z: z});
  
  pathHue = lerpColor('lightGreen', 'offWhite', sin(millis()/500));
  stroke(pathHue, 51, 84, 1);
  
  noFill();
  beginShape();
  for (let p of path) {
    vertex(p.x * myScale, p.y * myScale, p.z * myScale);
  }
  endShape();
  
  if (path.length > 2000) {
    path.shift();
  }
}