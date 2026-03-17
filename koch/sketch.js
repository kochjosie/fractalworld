let walls = [];
let points = [];
let triangleVertices = [[100, 575],[360, 25],[650, 575]];
let theta = -Math.PI / 3;
let depth = 4;
let freq = 130;  // c3 as default

const flakebtn = document.getElementById('snowflake');
flakebtn.addEventListener('click', () => {
  theta = -Math.PI / 3;
  triangleVertices = [[100, 575],[360, 25],[650, 575]];
  generateFlake();
});

const antibtn = document.getElementById('antiflake');
antibtn.addEventListener('click', () => {
  theta = Math.PI / 3;
  triangleVertices = [[10, 740], [370, 10], [740, 740]];
  generateFlake();
});

const c = document.getElementById('playC');
c.addEventListener('click', () => {
  freq = 130;
});

const d = document.getElementById('playD');
d.addEventListener('click', () => {
  freq = 146;
});

const e = document.getElementById('playE');
e.addEventListener('click', () => {
  freq = 164;
});

const f = document.getElementById('playF');
f.addEventListener('click', () => {
  freq = 174;
});

const g = document.getElementById('playG');
g.addEventListener('click', () => {
  freq = 196;
});

const a = document.getElementById('playA');
a.addEventListener('click', () => {
  freq = 220;
});

const b = document.getElementById('playB');
b.addEventListener('click', () => {
  freq = 246;
});

function setup() {
  let canvas = createCanvas(750, 750);
  canvas.parent("canvas-container");
  colorMode(HSB, 360, 100, 100, 1);
  generateFlake();
}

function generateFlake() {
  walls = [];
  
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(0, 0, 0, height));
  walls.push(new Wall(0, height, width, height));
  walls.push(new Wall(width, 0, width, height));
  
  for (let i = 0; i < triangleVertices.length; i++) {
    drawKoch(triangleVertices[i][0], triangleVertices[i][1], triangleVertices[(i + 1) % 3][0], triangleVertices[(i + 1) % 3][1], depth);
}
}

function draw() {
  console.log(freq)
  background(240, 6, 14, 1);
  for (let w of walls) {
    w.show();
  }
  for (let p of points) {
    p.position.add(p.velocity);
    p.show();
    
    for (let w of walls) {
      let newVelocity = w.collide(p.position, p.velocity, 5);
      if (newVelocity) {
        p.a *= 0.75;
        p.osc.amp(p.a);
        p.velocity = newVelocity;
        p.position.add(p.velocity);
      }
    }
  }
}

function drawKoch(x1, y1, x2, y2, depth) {
  // prevents infinite loop, depth = our # of nests
  if (depth == 0) {
    let w = new Wall(x1, y1, x2, y2);
    walls.push(w);
    return;
  } else if (depth > 0) {
    let p = findThird(x1, y1, x2, y2);
    let q = findTwoThirds(x1, y1, x2, y2);
    let r = findApex(p.x, p.y, q.x, q.y, theta);
    drawKoch(x1, y1, p.x, p.y, depth - 1);
    drawKoch(p.x, p.y, r.x, r.y, depth - 1);
    drawKoch(r.x, r.y, q.x, q.y, depth - 1);
    drawKoch(q.x, q.y, x2, y2, depth - 1);
  }
}

function findThird(x1, y1, x2, y2) {
  let thirdX = x1 + ((1/3) * (x2 - x1));
  let thirdY = y1 + ((1/3) * (y2 -y1));
  return {x: thirdX, y: thirdY}; // return as object
}

function findTwoThirds(x1, y1, x2, y2) {
  let twoThirdsX = x1 + ((2/3) * (x2 - x1));
  let twoThirdsY = y1 + ((2/3) * (y2 -y1));
  return{x: twoThirdsX, y: twoThirdsY};
}

// rotates a vector by 60 degrees
function findApex(x1, y1, x2, y2, theta) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  // if you want the anti snowflake: pi / 3, regular: -pi / 3
  let rotX = (dx * cos(theta)) - (dy * sin(theta)) + x1;
  let rotY = (dx * sin(theta)) + (dy * cos(theta)) + y1;
  return{x: rotX, y: rotY}
}

function mouseClicked() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let p = new Pt(mouseX, mouseY, random(-0.75, 0.75), random(-0.75, 0.75), freq);
    points.push(p);
  }
}

class Wall {
  constructor (x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }
  
  show() {
    strokeWeight(1);
    stroke(150, 1, 97, 1);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
  
  // calculates reflected velocity vector and returns upon hit
  collide(r, v, radius) {
    let ab = p5.Vector.sub(this.b, this.a);
    let ap = p5.Vector.sub(r, this.a);
    let scalarProj = constrain(ab.dot(ap) / ab.magSq(), 0, 1);
    let closest = p5.Vector.add(this.a, p5.Vector.mult(ab, scalarProj));
    let d = p5.Vector.dist(closest, r);
    
    // checks for collision
    if (d <= radius) {
      let n = createVector(-ab.y, ab.x).normalize();
      let dot = v.dot(n);
      let projection = p5.Vector.mult(n, 2 * dot);
      return p5.Vector.sub(v, projection);
    }
    return null;
  }
}

class Pt {
  constructor(x, y, xv, yv, freq) {
    this.position = createVector(x, y);
    this.velocity = createVector(xv, yv);
    // individual sound
    this.f = freq;
    this.a = 0.5;
    this.osc = new p5.Oscillator('sine');
    this.osc.freq(this.f);
    this.osc.amp(0);
    this.osc.start();
  }
  
  show() {
    strokeWeight(4);
    stroke(80, 51, 84, 1);
    point(this.position.x, this.position.y);
  }
}