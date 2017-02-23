function planet(speed, distance, size, color) { // the template planet.
  var rot = 360/speed*(frameCount%speed);       // NB: the speed parameter is inverted!
  rotate(radians(rot));                         // (higher value -> slower speed)
  fill(color);
  ellipse(0, distance, size, size);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(50); // framerate is pre-set for uniform speed across different devices
}
function draw() {
  background(0, 100);
  noStroke();
  var words = ['Loading system', 'Please wait'];
  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  textSize(24);
  fill('white');
  text(words[0], width/2, height/20);
  text(words[1], width/2, height/20*19);
  push();
  translate(width/2, height/2);
  planet(0, 0, 75, '#ff9030');      // sun
  planet(500, 80, 2, '#726291');    // mercury
  planet(800, 100, 5, '#e8ce96');   // venus
  planet(1000, 115, 5, '#4494d6');  // earth
  planet(750, 140, 3, '#bf5e0f');   // mars
  planet(5000, 165, 24, '#d8c5b6'); // jupiter
  planet(4000, 210, 19, '#ccad70'); // saturn (doesn't have rings, sue me)
  planet(1200, 234, 9, '#3da4db');  // uranus
  planet(1000, 275, 6, '#2364d3');  // neptune
  planet(1000, 300, 2, '#bcbab1');  // pluto
  pop();
}
function windowResized() { // makes canvas still fit if window is resized
  resizeCanvas(windowWidth, windowHeight);
}
