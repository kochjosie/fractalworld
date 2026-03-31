let potAngle = 0;
let virtualSketch = function(p) {
  p.setup = function() {
    let canvas = p.createCanvas(200, 200);
    canvas.parent("virtual-container");
    p.angleMode(p.DEGREES);
    p.colorMode(p.HSB, 360, 100, 100, 1);
  };

  p.draw = function() {
    p.background(240, 6, 14, 1);
    p.translate(100, 100);
    p.rotate(potAngle);

    p.stroke(240, 6, 14, 1);
    p.fill(80, 51, 84, 1);
    p.circle(0, 0, 180);

    p.strokeWeight(4);
    p.line(0, 0, 0, 80);
  };

  p.mouseDragged = function() {
    let cur = p.atan2(p.mouseY - 100, p.mouseX - 100);
    let prev = p.atan2(p.pmouseY - 100, p.pmouseX - 100);
    potAngle += (cur - prev);

    // normalize to 0–360
    let normalized = ((potAngle % 360) + 360) % 360;

    // map 0–360 degrees → 0–1023 to match the arduino range sensorData expects
    sensorData = p.map(normalized, 0, 360, 0, 1023);
  };
};