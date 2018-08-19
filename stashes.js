const _ = require('lodash');
const data = require('./data.json')[1];
const {getStashItems, getCategories} = require('./helpers.js');
const Categories = require('./Categories.js');

const PUBLIC_STASHES = data.filter((stash) => stash.public); // array of stashes
const PUBLIC_STASH_ITEMS = getStashItems(PUBLIC_STASHES); // array of stash arrays of item objects
const ITEMS = _.flatten(PUBLIC_STASH_ITEMS);
const CATEGORIES = getCategories(ITEMS);


// create arrays of item objects for each item category
// const item = new Item(ITEMS[0]);
const available = new Categories(ITEMS);

console.log(available);
