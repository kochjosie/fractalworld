class Walker {
  constructor(x, y) {
    if (arguments.length == 2) {
      this.pos = createVector(x, y);
      this.stuck = true;
    } else {
      this.pos = randomPoint();
      this.stuck = false;
    }
    this.r = size;
    this.twinkle = random(0.94, 1.6);
    this.twinkleTimer = floor(random(30));
  }

  walk() {
    var vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, ((height - 45) * random(0.95, 1.05)));
  }

  checkStuck(others) {
    for (var i = 0; i < others.length; i++) {
      let d = distSq(this.pos, others[i].pos);
      if (d < (this.r * this.r + others[i].r * others[i].r + 2 * others[i].r * this.r)) {
        //if (random(1) < 0.1) {
        this.stuck = true;
        return true;
      }
    }
    return false;
  }

  show() {
    this.twinkleTimer--;

    if (this.twinkleTimer <= 0) {
      this.twinkleX = random(0.94, 1.6);
      this.twinkleY = random(0.94, 1.6);
      this.twinkleTimer = 6; // change every ~30 frames
    }

    noStroke();
    fill(150, 1, 97, 1);
    rect(this.pos.x, this.pos.y, this.r * this.twinkleX, this.r * this.twinkleY);
  }
  
  updateSeason(season) {
    noStroke();

    if (season == 'winter') {
      if (this.r >= 4.25) {
      fill(150, 1, 97, 1);
      rect(this.pos.x, this.pos.y, this.r, this.r);
    } else {
      fill(myHue, mySat, myBright, myAlpha);
      rect(this.pos.x, this.pos.y, this.r, this.r);
    }
    // PLAY MUSIC
    } else if (season == 'spring') {
      if (this.r >= 4.25) {
      fill(150, 1, 97, 1);
      rect(this.pos.x, this.pos.y, this.r, this.r);
    } else {
      fill(myHue, mySat, myBright, myAlpha);
      rect(this.pos.x, this.pos.y, this.r, this.r);
    }
    // PLAY MUSIC
    } else if (season == 'summer') {
      if (this.r >= 4.25) {
      fill(150, 1, 97, 1);
      rect(this.pos.x, this.pos.y, this.r, this.r);
    } else {
      fill(myHue, mySat, myBright, myAlpha);
      rect(this.pos.x, this.pos.y, this.r, this.r);
    }
    // PLAY MUSIC
    } else if (season == 'fall') {
      if (this.r >= 4.25) {
      fill(150, 1, 97, 1);
      rect(this.pos.x, this.pos.y, this.r, this.r);
    } else {
      fill(myHue, mySat, myBright, myAlpha);
      rect(this.pos.x, this.pos.y, this.r, this.r);
    }
    // PLAY MUSIC
    }  
  }
}

function randomPoint() {
  var i = floor(random(5));

  if (i === 0 || i === 1) {
    let x = random(width*(1/3), width*(2/3));
    let y = random(0, height/2)
    return createVector(x, y);
  } else if (i === 2 || i === 3) {
    let x = random(width);
    let y = random(height);
    return createVector(x, y);
  } else {
    let x = random(width);
    return createVector(x, 0);
  }
}

function distSq(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return dx * dx + dy * dy;
}