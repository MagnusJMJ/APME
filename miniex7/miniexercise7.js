var res      = 50,
    arr      = [],
    widthVal = res + 35 + 'px';
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (x = 0; x < width/res; x++) {
    arr[x] = [];
    for (y = 0; y < height/res; y++) {
      arr[x][y] = createElement('progress');
      arr[x][y].attribute('value', '1');
      arr[x][y].mousePressed(change);
      arr[x][y].position(x*res, y*res);
      arr[x][y].style('width', widthVal);
      arr[x][y].style('transform', coinflip('rotate(45deg)', 'rotate(-45deg)'))
    }
  }
}
function coinflip(heads, tails) {
  var coin = round(random());
  if (coin) { return heads; }
  else      { return tails; }
}
function change() {
  this.style('transform', coinflip('rotate(45deg)', 'rotate(-45deg)'));
}
function keyPressed() {
  if (keyCode == 32) {
    for (x = 0; x < arr.length; x++) {
      for (y = 0; y < arr[x].length; y++) {
        arr[x][y].style('transform', coinflip('rotate(45deg)', 'rotate(-45deg)'));
      }
    }
  }
}
