/*
Daniel Shiffman's fractal tree (recursion demo).
There are several versions, but this one uses an
array of "branch" objects (and a constructor
function) as a means of structuring the program.

NOTE: MY CHANGES
- preference edits
  - changed certain variable names
  - changed some structure in how branching works
  - spacing/indentation changes
- added functionality
  - ???
*/

var tree   = [],
    leaves = [],
    count  = 0,
    slider,
    rot;

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(0, PI, PI/4, 0.001);
  slider.position(20, 20);
  slider.style('width', '120px');

  var trunkA = createVector(width/2, height),
      trunkB = createVector(width/2, height/1.5);

  tree.push(new Branch(trunkA, trunkB, 5));
}

function keyPressed() {
  if (keyCode == 32) {
    for (i = tree.length-1; i >= 0; i--) {
      if (!tree[i].grown && count < 10) {
        tree.push(tree[i].branch(rot));
        tree.push(tree[i].branch(-rot));
      }
      tree[i].grown = true;
    }
    count++;

    if (count === 10) {
      for (i = 0; i < tree.length; i++) {
        if (!tree[i].grown) {
          var leaf = tree[i].to.copy();
          leaves.push(leaf);
        }
      }
    }
  }
}

function draw() {
  background(28, 147, 216, 150);
  rot = slider.value();

  for (i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (i = 0; i < leaves.length; i++) {
    fill(60, 181, 16, 100);
    noStroke();
    var rnd = random(5, 25);
    ellipse(leaves[i].x, leaves[i].y, rnd, rnd);
    leaves[i].x += random(-0.5, 0.5);
    leaves[i].y += random(0, 2);
  }

}
function Branch(from, to, thickness) {
  this.from = from;
  this.to = to;
  this.thickness = thickness;
  this.grown = false;

  this.show = function() {
    stroke(140, 116, 88);
    strokeWeight(this.thickness)
    line(this.from.x, this.from.y, this.to.x, this.to.y);
  }

  this.branch = function(angle) {
    var dir = p5.Vector.sub(this.to, this.from);
    dir.rotate(angle);
    dir.mult(0.67);
    var newTo = p5.Vector.add(this.to, dir);
    var newBranch = new Branch(this.to, newTo, this.thickness*0.8);
    return newBranch;
  }
}
