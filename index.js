const _ = require('lodash');
const {JSON_FILE} = require('./constants.js');
const fs = require('fs');
const StashCollection = require('./models/StashCollection.js')
const Item = require('./models/Item.js');

const data = fs.readFileSync(JSON_FILE);
const parsedData = JSON.parse(data);

const LEAGUE = 'Standard';
const PUBLIC_STASHES = parsedData[1].filter((stash) => stash.public); // array of stashes
const LEAGUE_STASHES = PUBLIC_STASHES.filter((stash) => stash.league === LEAGUE); // array of stashes
const STANDARD_STASH_COLLECTION = new StashCollection(LEAGUE_STASHES);

const test = PUBLIC_STASHES[0].items[0];

//console.log(test.requirements[1]);

/*

// create arrays of item objects for each item category

const modObj = {
  explicitMods: ['Cannot be Frozen']
};
//console.log(STANDARD_STASH_COLLECTION.categories);
//const oneswords = STANDARD_STASH_COLLECTION.getItemsInSubCategory('onesword', weapons)
*/

const ssc = STANDARD_STASH_COLLECTION;
const armour = ssc.getItemsInCategory('armour');
const weapons = ssc.getItemsInCategory('weapons');
const accessories = ssc.getItemsInCategory('accessories');
const gems = ssc.getItemsInCategory('gems');
const cards = ssc.getItemsInCategory('cards');
const currency = ssc.getItemsInCategory('currency');
const flasks = ssc.getItemsInCategory('flasks');
const jewels = ssc.getItemsInCategory('jewels');
const maps = ssc.getItemsInCategory('maps');

const armourItems = armour.map((item) => new Item(item));
const weaponItems = weapons.map((item) => new Item(item));
const accessoryItems = accessories.map((item) => new Item(item));
const gemItems = gems.map((item) => new Item(item));
const cardItems = cards.map((item) => new Item(item));
const currencyItems = currency.map((item) => new Item(item));
const flaskItems = flasks.map((item) => new Item(item));
const jewelItems = jewels.map((item) => new Item(item));
const mapItems = maps.map((item) => new Item(item));

console.log(weaponItems.filter((item) => item.frameType === 3)[0]);
