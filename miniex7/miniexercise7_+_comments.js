var res      = 50, // Resolution of the maze.
    arr      = [], // The array that will contain our progress bars.
    widthVal = res + 35 + 'px'; // Converts res to a string CSS can understand.
                                // NB: We add '35' to make the progress bars
                                // overlap, but this number would need to be
                                // changed manually to fit a new resolution.
function setup() {
  createCanvas(windowWidth, windowHeight);
  // The only reason we have a p5 canvas here is because
  // the variables 'width' and 'height' rely on it. The
  // background color is set with CSS in index.html to
  // avoid white borders.

  // We're going to make arr into a great, big, two-dimensional
  // array! That's twice as many dimensions as a normal array.
  // Normal arrays only have one! Can you imagine? SAD!
  for (x = 0; x < width/res; x++) {
    arr[x] = [];
    for (y = 0; y < height/res; y++) {
      // Each item in the 2D array is a progress-bar.
      arr[x][y] = createElement('progress');
      arr[x][y].attribute('value', '1');
      arr[x][y].mousePressed(change);
      arr[x][y].position(x*res, y*res);
      arr[x][y].style('width', widthVal);
      // Each bar has a 50/50 chance of being rotated
      // 45° clockwise or counter-clockwise. (see coinflip() function)
      arr[x][y].style('transform', coinflip('rotate(45deg)', 'rotate(-45deg)'))
    }
  }
}

// Simple coinflip function! Takes two arguments
// and has a 50/50 chance of returning either.
function coinflip(heads, tails) {
  var coin = round(random());
  if (coin) { return heads; }
  else      { return tails; }
}

// Used to change an individual bar.
function change() {
  this.style('transform', coinflip('rotate(45deg)', 'rotate(-45deg)'));
}

function keyPressed() { // Pressing the space-bar refreshes the entire maze.
  if (keyCode == 32) {
    for (x = 0; x < arr.length; x++) {
      for (y = 0; y < arr[x].length; y++) {
        arr[x][y].style('transform', coinflip('rotate(45deg)', 'rotate(-45deg)'));
      }
    }
  }
}
