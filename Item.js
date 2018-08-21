const {
  cleanMarkup,
} = require('./helpers.js');

module.exports = function Item(data) {
  this.ilvl = data.ilvl;
  this.icon = data.icon;
  this.league = data.league;
  this.name = cleanMarkup(data.name);
  this.typeLine = cleanMarkup(data.typeLine);
  this.identified = data.identified;
  this.requirements = data.requirements;
  this.mods = {
    implicit: data.implicitMods,
    explicit: data.explicitMods,
  };
  this.flavorText = data.flavourText; // 'murica
  this.category = data.category;
  this.inventoryId = data.inventoryId;
};
