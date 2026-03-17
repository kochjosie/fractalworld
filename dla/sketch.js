let tree = [];
let walkers = [];
// let treeBases = [(width / 4), (width / 2), (3 * width / 2)];
let maxWalkers = 100;
// let iterations = 200;
let size = 5;
let shrink = 0.999;
let trunkHeight;
let port;
let sensorData = 0;

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("canvas-container");
  colorMode(HSB, 360, 100, 100, 1);
  let btn = createButton('Connect Arduino');
  btn.mousePressed(connectSerial);
  
  start()
}

// connect arduino
async function connectSerial() {
  port = await navigator.serial.requestPort();
  await port.open({baudRate: 9600});
  readLoop();
}

async function readLoop() {
  const reader = port.readable.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value);
    let lines = buffer.split("\n");

    // make sure we have at least one full line
    if (lines.length > 1) {
      let lastLine = lines[lines.length - 2].trim(); // get the last complete line
      if (lastLine) {
        let parts = lastLine.split(","); // split by comma
        sensorData = Number(parts[0]);   // first part = potentiometer
      }
      buffer = lines[lines.length - 1]; // keep any partial line
    }
  }
}

function draw() {
  background(240, 6, 14, 1);
  
  let safeSensor = isNaN(sensorData) ? 0 : sensorData;
  let myTime = map(safeSensor, 0, 1023, 0, 360);  

  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
  }
  
  let currentIterations = tree.length < 400 ? 500 : 100;

  for (let n = 0; n < currentIterations; n++) {
    for (let i = walkers.length - 1; i >= 0; i--) {
      walkers[i].walk();
      if (walkers[i].checkStuck(tree)) {
        tree.push(walkers[i]);
        walkers.splice(i, 1);
      }
    }
  }
  
  while (walkers.length < maxWalkers && size > 1.5) {
    size *= shrink;
    walkers.push(new Walker());
  }
  
  if (size <= 1.5) {  
    if (myTime < 45) {
      for (let i=0; i<tree.length; i++) {
        tree[i].updateSeason('winter');
      }
    } else if (myTime >= 45 && myTime < 135) {
      for (let i=0; i<tree.length; i++) {
        tree[i].updateSeason('spring');
      }
    } else if (myTime >= 135 && myTime < 210) {
      for (let i=0; i<tree.length; i++) {
        tree[i].updateSeason('summer');
      }
    } else if (myTime >= 210 && myTime < 315) {
      for (let i=0; i<tree.length; i++) {
        tree[i].updateSeason('fall');
      }
    } else if (myTime >= 315 && myTime < 360) {
      for (let i=0; i<tree.length; i++) {
        tree[i].updateSeason('winter');
      }
    }
  }
}

function start() {
  background(240, 6, 14, 1);
  createTrunks(0.25);
  createTrunks(0.5);
  createTrunks(0.75);
  
  size *= shrink;
  for (var i = 0; i < maxWalkers; i++) {
    walkers[i] = new Walker();
    size *= shrink;
  }
}

function createTrunks(trunkBase) {
  trunkHeight = random(15, 35);
  console.log(trunkHeight);
  for (let i = 0; i < trunkHeight; i++) {
    tree.push(new Walker((width * trunkBase) * random(0.97, 1.03), height - (i * 5)));
    tree.push(new Walker((width * trunkBase) * random(0.97, 1.03), height - (i * 5)));
    tree.push(new Walker((width * trunkBase) * random(0.97, 1.03), height - (i * 5)));
    tree.push(new Walker((width * trunkBase) * random(0.97, 1.03), height - (i * 5)));
    tree.push(new Walker((width * trunkBase) * random(0.97, 1.03), height - (i * 5)));
  }
}