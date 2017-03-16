var cells     = [],    // array of objects/cells (currently empty)
    cs        = 20,    // cell size in pixels
    ticker    = 0;     // the iteration counter
    isLooping = false; /* loop() cannot return true or false,
                          so we make a boolean for this */
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  textAlign(CENTER, CENTER);
  noStroke();

  // buttons, man
  var button1, button2;
  button1 = createButton('Start/Stop');
  button2 = createButton('Clear');
  button1.position(10, 10);
  button2.position(100, 10);
  button1.mousePressed(toggle);
  button2.mousePressed(killAll);

  // this nested FOR-loop fills our empty array with cells
  for (w = 0; w < width/cs; w++) {
    for (h = 0; h < height/cs; h++) {
      cells.push(new Cell(w, h));
    }
  }

  // this nested FOR-loop assigns eight neighbours to each cell
  for (i = 0; i < cells.length; i++) {
    var currentCell = cells[i];
    for (j = 0; j < cells.length; j++) {
      var cellToCheck = cells[j];

      if ( currentCell.x == cellToCheck.x && currentCell.y == (cellToCheck.y + 1)) {
        currentCell.adjacentUp = cellToCheck;
      }
      if ( currentCell.x == (cellToCheck.x - 1) && currentCell.y == (cellToCheck.y + 1)) {
        currentCell.adjacentUR = cellToCheck;
      }
      if ( currentCell.x == (cellToCheck.x - 1) && currentCell.y == cellToCheck.y) {
        currentCell.adjacentRi = cellToCheck;
      }
      if ( currentCell.x == (cellToCheck.x - 1) && currentCell.y == (cellToCheck.y - 1)) {
        currentCell.adjacentLR = cellToCheck;
      }
      if ( currentCell.x == cellToCheck.x && currentCell.y == (cellToCheck.y - 1)) {
        currentCell.adjacentLo = cellToCheck;
      }
      if ( currentCell.x == (cellToCheck.x + 1) && currentCell.y == (cellToCheck.y - 1)) {
        currentCell.adjacentLL = cellToCheck;
      }
      if ( currentCell.x == (cellToCheck.x + 1) && currentCell.y == cellToCheck.y) {
        currentCell.adjacentLe = cellToCheck;
      }
      if ( currentCell.x == (cellToCheck.x + 1) && currentCell.y == (cellToCheck.y + 1)) {
        currentCell.adjacentUL = cellToCheck;
      }
    }
  }
  noLoop();
}

function draw() {
  background(255);
  fill(0);
  rect(0, 0, 199, 39);

  // phase 1: this FOR-loop counts the # of live neighbours for all cells
  for (i = 0; i < cells.length; i++) {
    var currentCell = cells[i];
    currentCell.liveAdjacent = 0;

    function addNeighbour() {
      currentCell.liveAdjacent++
    }

    // each IF only adds to the total if the neighbour has been defined and is alive
    if (currentCell.adjacentUp != undefined && currentCell.adjacentUp.alive)
      { addNeighbour(); }
    if (currentCell.adjacentUR != undefined && currentCell.adjacentUR.alive)
      { addNeighbour(); }
    if (currentCell.adjacentRi != undefined && currentCell.adjacentRi.alive)
      { addNeighbour(); }
    if (currentCell.adjacentLR != undefined && currentCell.adjacentLR.alive)
      { addNeighbour(); }
    if (currentCell.adjacentLo != undefined && currentCell.adjacentLo.alive)
      { addNeighbour(); }
    if (currentCell.adjacentLL != undefined && currentCell.adjacentLL.alive)
      { addNeighbour(); }
    if (currentCell.adjacentLe != undefined && currentCell.adjacentLe.alive)
      { addNeighbour(); }
    if (currentCell.adjacentUL != undefined && currentCell.adjacentUL.alive)
      { addNeighbour(); }
  }

  // phase 2: this FOR-loop contains and applies the four rules to the simulation
  for (i = 0; i < cells.length; i++) {
    var currentCell = cells[i];
    var isAlive     = cells[i].alive;
    function lives() { currentCell.next = true;  }
    function dies()  { currentCell.next = false; }

    if (isAlive) {
      if (currentCell.liveAdjacent < 2 || currentCell.liveAdjacent > 3) {
        dies();
      } else {
        lives();
      }
    } else {
      if (currentCell.liveAdjacent == 3) {
        lives();
      }
    }
  }

  // phase 3: the new iteration is executed
  for (i = 0; i < cells.length; i++) {
    cells[i].alive = cells[i].next;
  }

  // phase 4: the new iteration is drawn on the canvas
  for (i = 0; i < cells.length; i++) {
    cells[i].draw();
  }

  // draws iteration/frame count
  fill(255);
  text(ticker, 180, 20);
  ticker++;
}

// starts and stops the simulation
function toggle() {
  if (isLooping) {
    noLoop();
    for (i = 0; i < cells.length; i++) {
      cells[i].next  = undefined;
    }
  } else {
    loop();
  }
  isLooping = !isLooping;
}

// clears the grid
function killAll() {
  noLoop();
  for (i = 0; i < cells.length; i++) {
    cells[i].alive = false;
    cells[i].next  = false;
  }
  redraw();
  ticker = 0;
}

// when mouse is pressed, finds out which cell you pressed and changes the state (alive/dead)
function mousePressed() {
  var cursorGridX = floor(map(mouseX, 0, width,  0, width/cs )),
      cursorGridY = floor(map(mouseY, 0, height, 0, height/cs));

  for (i = 0; i < cells.length; i++) {
    if (mouseX > 200 || mouseY > 40) { // NB: this IF prevents clicking "through" the buttons
      if (cells[i].x == cursorGridX && cells[i].y == cursorGridY) {
        cells[i].alive = !cells[i].alive;
        cells[i].draw();
        break; // NB: break; makes sure the loop stops when the clicked cell is found
      }
    }
  }
}

// this constructor function makes cells                      NB: The .x and .y property is
function Cell(x, y) {       //                                the index in the grid, *not*
  this.x     = x;           // the # column of this cell      coordinates on the canvas!
  this.y     = y;           // the # row of this cell
  this.alive = false;       // the cell's state (alive/dead)
  this.next;                // the cell's state in the next iteration
  this.draw  = function() { // method (function) that draws the cell
    if (this.alive) { fill(255, 255, 0); }
    else            { fill(0); }
    rect(this.x*cs, this.y*cs, cs-0.4, cs-0.4);
  }
  // neighbouring (adjacent) cells
  this.adjacentUp;   // upper
  this.adjacentUR;   // upper-right
  this.adjacentRi;   // right
  this.adjacentLR;   // lower-right
  this.adjacentLo;   // lower
  this.adjacentLL;   // lower-left
  this.adjacentLe;   // left
  this.adjacentUL;   // upper-left
  this.liveAdjacent; // # of living neighbours

}
