const {
  cleanTypeLine,
} = require('./helpers.js');

module.exports = function Item(data) {
  this.ilvl = data.ilvl;
  this.icon = data.icon;
  this.league = data.league;
  this.name = data.name;
  this.typeLine = cleanTypeLine(data);
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
