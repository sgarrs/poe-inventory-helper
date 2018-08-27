const _ = require('lodash');
const data = require('./data.json')[1];
const StashCollection = require('./models/StashCollection.js')
const Item = require('./models/Item.js');

const LEAGUE = 'Standard';
const PUBLIC_STASHES = data.filter((stash) => stash.public); // array of stashes
const LEAGUE_STASHES = PUBLIC_STASHES.filter((stash) => stash.league === LEAGUE); // array of stashes
const STANDARD_STASH_COLLECTION = new StashCollection(LEAGUE_STASHES);

// create arrays of item objects for each item category
// const item = new Item(ITEMS[0]);

const modObj = {
  explicitMods: ['Cannot be Frozen']
};
//console.log(STANDARD_STASH_COLLECTION.categories);
const weapons = STANDARD_STASH_COLLECTION.getItemsInCategory('weapons');
//const oneswords = STANDARD_STASH_COLLECTION.getItemsInSubCategory('onesword', weapons)

const gems = STANDARD_STASH_COLLECTION.getItemsInCategory('gems');
const cards = STANDARD_STASH_COLLECTION.getItemsInCategory('cards');
const currency = STANDARD_STASH_COLLECTION.getItemsInCategory('currency');
const flasks = STANDARD_STASH_COLLECTION.getItemsInCategory('flasks');
const jewels = STANDARD_STASH_COLLECTION.getItemsInCategory('jewels');
const maps = STANDARD_STASH_COLLECTION.getItemsInCategory('maps');
const gemItems = gems.map((item) => new Item(item));
console.log(gemItems[0].getItemCard());
//console.log(tombfistItems.filter((item) => item.socketedItems));
