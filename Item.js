function Item(data) {
  this.ilvl = data.ilvl;
  this.icon = data.icon;
  this.league = data.league;
  this.name = data.name;
  this.typeLine = data.typeLine;
  this.identified = data.identified;
  this.requirements = [data.requirements];
  this.implicitMods = [data.implicitMods];
  this.explicitMods = [data.explicitMods];
  this.category = data.category;
  this.inventoryId = data.inventoryId;
}

export default Item;
