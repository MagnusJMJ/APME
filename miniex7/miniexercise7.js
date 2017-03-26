var res      = 50, // Resolution of the maze.
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

  // Let's make a two-dimensional array!
  var arr = [];
  for (x = 0; x < width/res; x++) {
    arr[x] = [];
    for (y = 0; y < height/res; y++) {
      // Each item in the 2D array is a progress-bar.
      // Each bar has a 50/50 chance of being rotated
      // 45° clockwise or counter-clockwise.
      arr[x][y] = createElement('progress');
      arr[x][y].attribute('value', '1');
      arr[x][y].style('width', widthVal);
      arr[x][y].position(x*res, y*res);
      var coinflip = round(random());
      if (coinflip) {
        arr[x][y].style('transform', 'rotate(45deg)');
      } else {
        arr[x][y].style('transform', 'rotate(-45deg)');
      }
    }
  }
}
