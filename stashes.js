const _ = require('lodash');
const data = require('./data.json')[1];
const {getStashItems, getExplicitMods, getCategories, getSubCategories, getItemsInCategory, getItemsInSubCategory} = require('./helpers.js');
const Categories = require('./Categories.js');

const PUBLIC_STASHES = data.filter((stash) => stash.public); // array of stashes
const ITEMS = _.flatten(getStashItems(PUBLIC_STASHES));
const CATEGORIES = new Categories(ITEMS);

// create arrays of item objects for each item category
// const item = new Item(ITEMS[0]);

const weapons = getItemsInCategory(ITEMS, 'weapons');
console.log(getExplicitMods(ITEMS));
