var tree = [],
    angle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke('white');

  var slider = createSlider(0, PI, PI/4, 0.001);
  slider.position(20, 20);
  slider.style('width', '100px');
  angle = slider.value();

  var trunkA = createVector(width/2, height);
      trunkB = createVector(width/2, height/1.5);

  tree.push(new Branch(trunkA, trunkB, 10));
}

function draw() {
  background(150, 150);
  for (i = 0; i < tree.length; i++) {
    tree[i].show();
  }
}

function keyPressed() {
  if (keyCode == 32) {
    for (i = tree.length-1; i >= 0; i--) {
      if (!tree[i].grown) {
        tree[i].branch(angle);
        tree[i].branch(-angle);
      }
    }
  }
}

function Branch(from, to, thickness) {
  this.from = from;
  this.to = to;
  this.grown = false;
  this.thickness = thickness;
  this.show = function() {
    strokeWeight(this.thickness)
    line(this.from.x, this.from.y, this.to.x, this.to.y);
  }
  this.branch = function(angle) {
      var dir = p5.Vector.sub(this.to, this.from);
      dir.rotate(angle);
      dir.mult(0.67);
      var newEnd = p5.Vector.add(this.to, dir);
      tree.push(new Branch(this.to, newEnd, this.thickness*0.8));
      this.grown = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
