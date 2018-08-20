// TODO:
// find the ranges of the same mod
// sort by mod value
// how do I determine item rarity?
const _ = require('lodash');
const data = require('./data.json')[1];
const Stash = require('./helpers.js');
const {
  getStashItems,
  getItemsInCategory,
  getItemsWithMods,
  getItemMods
} = require('./helpers.js')
const Categories = require('./Categories.js');
const LEAGUE = 'Standard'

const PUBLIC_STASHES = data.filter((stash) => stash.public); // array of stashes
const LEAGUE_STASHES = PUBLIC_STASHES.filter((stash) => stash.league === LEAGUE); // array of stashes
const PUBLIC_ITEMS = _.flatten(getStashItems(PUBLIC_STASHES));
const LEAGUE_ITEMS = _.flatten(getStashItems(LEAGUE_STASHES));
const CATEGORIES = new Categories(PUBLIC_ITEMS);

// create arrays of item objects for each item category
// const item = new Item(ITEMS[0]);

console.log(getItemsWithMods(LEAGUE_ITEMS, {
  implicitMods: ['x% increased Damage']
}));
