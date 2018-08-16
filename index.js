const fs = require('fs');
const request = require('request');
const through = require('through2');
const JSONStream = require('JSONStream');

const POE_URL = 'http://api.pathofexile.com/public-stash-tabs'
const OUTPUT_FILE = __dirname + '/data.txt';
const JSON_FILE = __dirname + '/data.json';

function requestStashes(url) {
  request(url).pipe(fs.createWriteStream(OUTPUT_FILE));
}

// parse stash data
const stream = through({objectMode: true}, function(buffer, _, next) {
  this.push(buffer);
  next();
});

fs.createReadStream(OUTPUT_FILE)
  .pipe(JSONStream.parse('*'))
  .pipe(stream)
  .pipe(JSONStream.stringify('[\n', '\n', '\n]\n'))
  .pipe(fs.createWriteStream(JSON_FILE));
