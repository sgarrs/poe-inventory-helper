const _ = require('lodash');
const request = require('request').defaults({encoding: null});
const {getItemMods} = require('./helpers/modifiers.js');

class StashCollection {
  constructor(data) {
    this.stashes = data;
    this.items = this.getStashItems();
    this.categories = this.getCategoryList();
  }

  getStashItems() {
    const itemArray = [];

    this.stashes.forEach((stash) => {
      itemArray.push(stash.items);
    });

    return _.flatten(itemArray);
  }

  getItemsWithMods(modObj){
    return this.items.filter((item) => {
      const itemMods = getItemMods(item);
      let hasImplicits = false;
      let hasExplicits = false;

      if ((modObj.implicitMods && !itemMods.implicitMods) || (modObj.explicitMods && !itemMods.explicitMods)) {
        return false;
      }

      if (modObj.implicitMods) {
        modObj.implicitMods.forEach((mod) => {
          if (itemMods.implicitMods.includes(mod)) {
            hasImplicits = true;
          }
        });
      }

      if (modObj.explicitMods) {
        modObj.explicitMods.forEach((mod) => {
          if (itemMods.explicitMods.includes(mod)) {
            hasExplicits = true;
          }
        });
      }

      if (!modObj.implicitMods && modObj.explicitMods) {
        return hasExplicits;
      } else if (!modObj.explicitMods && modObj.implicitMods) {
        return hasImplicits;
      } else {
        return hasImplicits && hasExplicits;
      }

    });
  }

  getItemsWithName(name) {
    const matchName = new RegExp(name);
    return this.items.filter((item) => matchName.test(item.name));
  }

  getItemsInCategory(category) {
    return this.items.filter((item) => {
      const itemCategory = Object.getOwnPropertyNames(item.category)[0];
      return itemCategory === category;
    });
  }

  getItemsInSubCategory(subcategory) {
    // assume items array is a value from getItemsInCategory
    const categoryName = this.getCategories(this.items)[0];
    return this.items.filter((item) => item.category[categoryName][0] === subcategory);
  }

  getCategoryList() {
    const catArray = this.getCategories();
    const obj = {};
    catArray.forEach((cat) => {
      obj[cat] = this.getSubCategories(cat);
    });

    return obj;
  }

  getCategories() {
    return StashCollection.sortCategories(this.items.map((item) => item.category));
  }

  getSubCategories(category) {
    const itemsArray = this.getItemsInCategory(category);

    let subcategoryArray = [];
    itemsArray.forEach((item) => subcategoryArray.push(item.category[category]))

    return StashCollection.sortCategories(subcategoryArray);
  }

  static sortCategories(array) {
    let sortedCategories = [];
    array.forEach((a) => {
      if (Object.getPrototypeOf(a) === Object.getPrototypeOf({})) {
        sortedCategories.push(Object.getOwnPropertyNames(a));
        sortedCategories = _.flatten(sortedCategories);
      } else if (Object.getPrototypeOf(a) === Object.getPrototypeOf([])) {
        a.forEach((c) => sortedCategories.push(c));
      } else {
        return a;
      }
    });
    sortedCategories = _.uniq(sortedCategories).sort();

    return sortedCategories;
  }
}

module.exports = StashCollection;
