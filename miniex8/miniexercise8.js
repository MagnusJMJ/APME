var tree = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(150);
  stroke('white');

  var trunkA = createVector(width/2, height    );
      trunkB = createVector(width/2, height/1.5);

  tree.push(new Branch(trunkA, trunkB));
}

function mousePressed() {
  for (i = tree.length-1; i >= 0; i--) {
    tree[i].branch();
    tree[i].show();
  }
}

function Branch(from, to, thickness) {
  this.from = from;
  this.to = to;
  this.grown = false;
  this.len = p5.Vector.sub(this.to, this.from);
  this.thickness = thickness || 5;
  this.show = function() {
    push();
    strokeWeight(this.thickness)
    line(this.from.x, this.from.y, this.to.x, this.to.y);
    pop();
  }
  this.branch = function() {
    if (!this.grown) {
      var dir = p5.Vector.sub(this.to, this.from);
      dir.rotate(PI / 4);
      dir.mult(0.67);
      var newEnd = p5.Vector.add(this.to, dir);
      tree.push(new Branch(this.to, newEnd, this.thickness*0.8));
      this.grown = true;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
