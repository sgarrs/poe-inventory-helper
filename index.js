const fs = require('fs');
const request = require('request');
const through = require('through2');

const POE_URL = 'http://api.pathofexile.com/public-stash-tabs'
const outputFile = __dirname + '/data.txt';

function requestStashes(url) {
  request(url).pipe(fs.createWriteStream(outputFile));
}

requestStashes(POE_URL);
