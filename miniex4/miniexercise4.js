var
xPos, yPos, xVel, yVel, xAcc, yAcc, bounce, keyForce, gravity, // variables for physics
red, green, blue, fade, changeColor, size,                     // variables for visuals
printInfo, ampMode;                                            // variables for toggling

function setup() {
  createCanvas(windowWidth, windowHeight);

  // default values
  ampMode     = false;
  printInfo   = false;
  changeColor = false;
  red         = 230;
  green       = 200;
  blue        = 60
  fade        = 0;
  size        = 100;
  keyForce    = 0.5;
  gravity     = 0.25;
  xPos        = width/2;
  yPos        = height/2;
  xVel        = 0;
  yVel        = 0;
  xAcc        = 1;
  yAcc        = 1;
  bounce      = 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode == 73) { printInfo = !printInfo; } // press 'i' to toggle debug info
  if (keyCode == 32) { ampMode   = !ampMode;   } // press spacebar to toggle mode
}

function draw() {
  if (ampMode) {
    background(230, 200, 60, 100);  // amplifier mode (positive feedback loop)
    xAcc   = 1.0025;
    yAcc   = 1.0025;
    bounce = 1.25;
    red   = random(255);
    green = random(255);
    blue  = random(255);
  } else {
    background(80, 100, 130, 100);  // stabilizer mode (negative feedback loop)
    xAcc   = 0.993;
    yAcc   = 0.993;
    bounce = 0.9;

    // changes color on impact with canvas edge
    if (changeColor) {
      red   = random(255);
      green = random(255);
      blue  = random(255);
      changeColor = false;
    }

    // teleports ball to center if it flies out of the canvas
    if (xPos > width + size || xPos < -size || yPos > height + size || yPos < -size) {
      xPos = width/2;
      yPos = height/2;
      xVel = 0;
      yVel = 0;
    }

    // very primitive gravitywell in center of canvas
    if (xPos > width/2 && yPos > height/2) {
      xVel -= gravity;
      yVel -= gravity;
    } else if (xPos > width/2 && yPos < height/2) {
      xVel -= gravity;
      yVel += gravity;
    } else if (xPos < width/2 && yPos < height/2) {
      xVel += gravity;
      yVel += gravity;
    } else if (xPos < width/2 && yPos > height/2) {
      xVel += gravity;
      yVel -= gravity;
    }

  }

  // ball
  noStroke();
  fill(red, green, blue);
  ellipse(xPos, yPos, size, size);

  // shows instructions on start-up
  if (frameCount < 255) { fade++; } else { fade--; }
  push();
  fill(230, 200, 60, fade);
  textSize(30);
  textAlign(CENTER, CENTER);
  text('PRESS ARROWKEYS TO MOVE', width/2, height/20)
  text('PRESS THE SPACEBAR TO GO FAST', width/2, height/20*19);
  pop();

  // shows the ball's current position, velocity and acceleration (if enabled)
  if (printInfo) {
    fill('white');
    text('xPos: ' + round(xPos), 20, 30);
    text('yPos: ' + round(yPos), 20, 50);
    text('xVel: ' + round(abs(xVel)), 20, 70);
    text('yVel: ' + round(abs(yVel)), 20, 90);
    text('xAcc: ' + round((xAcc - 1)), 20, 110);
    text('yAcc: ' + round((yAcc - 1)), 20, 130);
  }

  // controls ball
  if (keyIsDown(38)) { yVel -= keyForce; } // up
  if (keyIsDown(40)) { yVel += keyForce; } // down
  if (keyIsDown(39)) { xVel += keyForce; } // right
  if (keyIsDown(37)) { xVel -= keyForce; } // left

  // State of the art, cutting-edge physics engine (patent pending)
  xPos += xVel
  yPos += yVel
  xVel *= xAcc
  yVel *= yAcc
  if (xPos >= (width - size/2) || xPos <= (0 + size/2)) {
    xVel *= -bounce;
    changeColor = true;
  } else if (yPos >= (height - size/2) || yPos <= (0 + size/2)) {
    yVel *= -bounce;
    changeColor = true;
  }
}
