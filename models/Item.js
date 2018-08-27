const request = require('request');

class Item {
  constructor(data, id) {
    this.socketedItems = (data.socketedItems) ? data.socketedItems : [];
    this.category = Object.getOwnPropertyNames(data.category).join();
    this.subCategory = Object.values(data.category)[0].join();
    this.stashId = id;
    this.inventoryId = data.inventoryId;
    this.ilvl = data.ilvl;
    //    this.icon = Item.getItemImage(data.icon);
    this.league = data.league;
    this.name = Item.cleanMarkup(data.name);
    this.typeLine = Item.cleanMarkup(data.typeLine);
    this.identified = data.identified;
    this.support = data.support;
    this.properties = Item.addQuality(data.properties);
    this.additionalProperties = data.additionalProperties;
    this.requirements = data.requirements;
    this.mods = {
      implicit: data.implicitMods,
      explicit: data.explicitMods,
    };
    this.descrText = data.descrText;
    this.secDescrText = data.secDescrText;
    this.flavorText = data.flavourText; // 'murica
    this.sockets = (data.sockets) ? data.sockets.length : 0;
    this.socketDetails = data.sockets;
    this.stackSize = data.stackSize;
    this.maxStackSize = data.maxStackSize;
    this.artFilename = data.artFilename;
    this.coords = { x: data.x, y: data.y };
  }

  getItemCard() {
    switch (this.category) {
      case 'gems':
        return {
          header: [this.typeLine],
          body: [this.properties, this.requirements, this.secDescrText, this.mods.explicit, 'xp bar', this.descrText]
        }
      default:
        return {
          header: [this.name, this.typeLine],
          body: [this.properties, this.requirements, this.mods.implicit, this.mods.explciit, this.flavorText]
        }
    }
  }

  static addQuality(props) {
    const qualityProp = {                                          
      name: 'Quality ',                                             
      values: [ [ '0%', 1 ] ],                                         
      displayMode: 0,                                              
      type: 6                                             
    };                                                             
    if (props && props.length > 1 && props[1].name === 'Quality') {                                    
      return props;                                               
    } else if (props && props.length > 1) {
      return [props[0], qualityProp].concat(props.slice(1));                
    }
  };                                                             

  // clean item name from markup prefix
  static cleanMarkup(text) {
    const matchMarkup = /^[\w\d<>:]+>>/;

    if (matchMarkup.test(text)) {
      return text.replace(matchMarkup, '');
    }

    return text;
  }

  // return image data from href to poe cdn
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
