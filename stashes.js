const data = require('./data.json')[1];
const _ = require('lodash');

const PUBLIC_STASHES = data.filter((stash) => stash.public); // array of stashes
const PUBLIC_STASH_ITEMS = getStashItems(PUBLIC_STASHES); // array of stash arrays of item objects
const ITEMS = _.flatten(PUBLIC_STASH_ITEMS);
const CATEGORIES = getCategories(ITEMS);

function getCategories(items) {
  let categoryArray = [];
  items.forEach((item) => categoryArray.push(item.category));

  let sortedCategories = [];
  categoryArray.forEach((obj) => sortedCategories.push(Object.getOwnPropertyNames(obj)));
  sortedCategories = _.flatten(sortedCategories);
  sortedCategories = _.uniq(sortedCategories).sort();

  return sortedCategories;
}

function getStashItems(data) { // separate the item data from parent objects
  const itemArray = [];

  data.forEach((stash) => {
    itemArray.push(stash.items);
  });

  return itemArray;
}

// const item = new Item(ITEMS[0]);

console.log(CATEGORIES);
