const fs = require('fs');
const request = require('request');
const through = require('through2');
const JSONStream = require('JSONStream');

const { POE_URL, OUTPUT_FILE, JSON_FILE } = require('./constants.js');
// bring in all the pages of data that the server gives us
// poe prefixes JSON with a next_change_id

// parse stash data
const stream = through({objectMode: true}, function(buffer, _, next) {
  const buf = buffer;
  this.push(buf);
  next();
});

request(POE_URL)
  .pipe(stream)
  .pipe(JSONStream.parse('*'))
  .pipe(JSONStream.stringify())
  .pipe(fs.createWriteStream(JSON_FILE));
