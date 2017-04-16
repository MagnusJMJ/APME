var
search,
url = 'http://api.giphy.com/v1/gifs/translate',
query = '',
key = 'dc6zaTOxFJmzC',
request = url + '&s=' + query.replace(/ /g, '+') + '&api_key=' + key;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(150);
  search = createInput('');
  search.position(width/2, height/2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode == 13) {
    query = search.value;
    image(loadJSON(request), width/2, height/2);
  }
}
