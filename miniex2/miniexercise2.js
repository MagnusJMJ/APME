/* variabler vi skal bruge i løbet af programmet */
var x             = 0;
var y             = 0;
var z             = 0;
var speed         = 0.001;
var frMax         = 60;
var fr            = frMax;
var frSpeed       = 0.5;
var boxWidth      = 250;
var boxHeight     = 50;
var boxDepth      = 50;
var howManyBoxes  = 25;

/* funktionen for vores roterende kasse */
function spinningBox() {
  rotateX(x);
  rotateY(y);
  rotateZ(z);
  box(boxWidth, boxHeight, boxDepth);
}

/* setup() laver et farveløst canvas der fylder hele vinduet
og sørger for at primitive 3D-objekter kan indlæses */
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  tint(255, 1);
}

function draw() {

  /* programmet kører pr. standard i 60 fps (frames per second),
  men hvis musen holdes nede falder fps hver sløjfe. Slippes musen,
  stiger fps automatisk til 60 igen. Farten fps falder og stiger med
  afgøres af frSpeed. */
  frameRate(fr);
  if (mouseIsPressed) {
    fr = fr - frSpeed;
  } else if (fr < frMax) {
    fr = fr + frSpeed;
  } else {}

  for (i = 0; i < howManyBoxes; i++) {
    spinningBox();
  }

  /* fordi x, y og z bliver forhøjet med 'speed' hver gang draw()
  bliver kørt, bevæger kasserne sig. Variablen 'speed' afgør hastigheden */
  x = x + speed;
  y = y + speed;
  z = z + speed;

}

/* windowResized() sørger for at programmets canvas stadig passer til
vinduet hvis det ændrer størrelse. */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* *burde* stoppe sløjfen hvis vinduet ikke er aktivt, virker ikke af
uransagelige årsager. */
if (!focused) {
  noLoop();
} else {
  loop();
}
