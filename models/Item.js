const request = require('request');

class Item {
  constructor(data, id) {
  // should I enforce type here?
    this.ilvl = data.ilvl;
    this.icon = Item.getItemImage(data.icon);
    this.league = data.league;
    this.name = Item.cleanMarkup(data.name);
    this.typeLine = Item.cleanMarkup(data.typeLine);
    this.identified = data.identified;
    this.requirements = data.requirements;
    this.mods = {
      implicit: data.implicitMods,
      explicit: data.explicitMods,
    };
    this.flavorText = data.flavourText; // 'murica
    this.category = data.category;
    this.stashId = id;
    this.inventoryId = data.inventoryId;
    }

  static cleanMarkup(text) {
    const matchMarkup = /^[\w\d<>:]+>>/;

    if (matchMarkup.test(text)) {
      return text.replace(matchMarkup, '');
    }

    return text;
  }

  static getItemImage(uri) {
    return request.get(uri, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        return "data:" +
          res.headers["content-type"] +
          ";base64," +
          new Buffer(body).toString('base64');
      }
    });
  }
};

module.exports = Item;
