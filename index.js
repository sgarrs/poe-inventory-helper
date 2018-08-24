// TODO:
// find the ranges of the same mod
// sort by mod value
// how do I determine item rarity?
// for each item's mod, include distance from max value
// determine item mod tiers
// how do we tell if a modifier's value is variable?

const _ = require('lodash');
const data = require('./data.json')[1];
const {
  getStashItems,
  getItemsInCategory,
  getItemsWithMods,
  getItemsWithName,
  getExplicitMods,
} = require('./helpers.js')
const StashCollection = require('./StashCollection.js')
const Item = require('./Item.js');
const Categories = require('./Categories.js');

const LEAGUE = 'Standard'
const PUBLIC_STASHES = data.filter((stash) => stash.public); // array of stashes
const LEAGUE_STASHES = PUBLIC_STASHES.filter((stash) => stash.league === LEAGUE); // array of stashes
const STANDARD_STASH_COLLECTION = new StashCollection(LEAGUE_STASHES);

// create arrays of item objects for each item category
// const item = new Item(ITEMS[0]);

const modObj = {
  explicitMods: ['Cannot be Frozen']
};
//console.log(STANDARD_STASH_COLLECTION.categories);
