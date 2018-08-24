const fs = require('fs');
const request = require('request');
const through = require('through2');
const JSONStream = require('JSONStream');

const POE_URL = 'http://api.pathofexile.com/public-stash-tabs'
const OUTPUT_FILE = __dirname + '/data.txt';
const JSON_FILE = __dirname + '/data.json';

const dataToFile = (url) => {
  request(url).pipe(fs.createWriteStream(OUTPUT_FILE));
}

// bring in all the pages of data that the server gives us
// poe prefixes JSON with a next_change_id


// parse stash data
const stream = through({objectMode: true}, function(buffer, _, next) {
  const buf = buffer;
  this.push(buf);
  next();
});

const JSONToFile = () => {
  fs.createReadStream(OUTPUT_FILE)
    .pipe(JSONStream.parse('*'))
    .pipe(stream)
    .pipe(JSONStream.stringify())
    .pipe(fs.createWriteStream(JSON_FILE));
}

JSONToFile();
