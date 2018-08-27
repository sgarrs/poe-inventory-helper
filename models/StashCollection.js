const _ = require('lodash');
const request = require('request').defaults({encoding: null});
const {getItemMods} = require('../helpers/modifiers.js');

class StashCollection {
  constructor(data) {
    this.stashes = data;
    this.items = this.getStashItems();
    this.categories = this.getCategoryList();
  }

  // return array of raw item data
  getStashItems() {
    return _.flatten(this.stashes.map((stash) => stash.items));
  }

  // return array of items with specified modifiers
  // *** need to account for flasks using an entirely different set of modifier properties
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

  // return array of items matching a name
  getItemsWithName(name, items = this.items) {
    const matchName = new RegExp(name);
    return items.filter((item) => matchName.test(item.name));
  }

  // return array of items matching a category
  getItemsInCategory(category, items = this.items) {
    return items.filter((item) => {
      const itemCategory = Object.getOwnPropertyNames(item.category)[0];
      return itemCategory === category;
    });
  }

  // return array of items matching a sub-category
  getItemsInSubCategory(subcategory, items = this.items) {
    // assume items array is a value from getItemsInCategory
    const categoryName = this.getCategories(items)[0];
    return items.filter((item) => item.category[categoryName][0] === subcategory);
  }

  // return an object of containing all unique categories and their subcategories assigned to items
  // { category: ['subcategory', ...] }
  getCategoryList() {
    const catArray = this.getCategories();
    const obj = {};
    catArray.forEach((cat) => {
      obj[cat] = this.getSubCategories(cat);
    });

    return obj;
  }

  // return array of parent categories
  getCategories(items = this.items) {
    return StashCollection.sortCategories(items.map((item) => item.category));
  }

  // return array of sub-categories for a specified category
  getSubCategories(category) {
    const itemsArray = this.getItemsInCategory(category);

    return StashCollection.sortCategories(itemsArray.map((item) => item.category[category]));
  }

  // return a filtered array of unique strings
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
