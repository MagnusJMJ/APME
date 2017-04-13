var
// Basic parameters - the API URL, the query and the API key.
url     = 'https://api.wolframalpha.com/v1/simple',
query   = document.getElementById('textfield').getAttribute('value'), // Does not accept special characters, except spaces and question marks.
appId   = 'J3G5WY-T52G28X6X8', // API-key for authentication with Wolfram Alpha.

// Result styling (optional).
broad   = (window.innerWidth * 0.5).toString(), // This variable is called 'broad' to avoid conflict with p5.js' built-in variable 'width'.
units   = 'metric', // Can be either 'metric', 'imperial' or 'automatic'.
bgCol   = 'black', // Written in plain english to avoid messy URL character codes.
fgCol   = 'white', // Written in plain english to avoid messy URL character codes.
layout  = 'labelbar', // Can be either 'labelbar' or 'divider'.

// The variable 'request' is just a god-awful mess stitched together from all the other variables along with some URL encoding.
request = url+'?i='+query.replace(/ /g,'+').replace('?','%3F')+'&width='+broad+'&units='+units+'&background='+bgCol+'&foreground='+fgCol+'&layout='+layout+'&appid='+appId;

// This function uses AJAX (Asynchronous JavaScript And XML) to fetch the result because WA's API does not return results in JSON, but in XML.
function fetchResult() {
  console.log('fetchResult() triggered.');
  var xhr = new XMLHttpRequest;
  xhr.onreadystateChange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('content').innerHTML = '<p id="response">' + this.responseText + '</p>';
    }
  }
  xhr.open('GET', 'http://api.wolframalpha.com/v1/result?appid=DEMO&i=How+far+is+Los+Angeles+from+New+York%3f&units=metric', true);
  xhr.send();
  console.log('request sent');
}
