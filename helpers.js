const _ = require('lodash');

function getStashItems(data) { // separate the item data from parent objects
  const itemArray = [];

  data.forEach((stash) => {
    itemArray.push(stash.items);
  });

  return itemArray;
}

function getModClasses(mod) {
  const digitString = /(\d+(\.\d+)?)/;
  const toString = /\s\d+\s(to)\s\d+\s/;

  const regexArray = [toString, digitString];
  let matchedRegex = regexArray.filter((r) => r.test(mod))[0];

  switch (matchedRegex) {
    case toString:
      return String(mod).replace(toString, ' x to x ');
    case digitString:
      return String(mod).replace(digitString, 'x');
    default:
      return String(mod);
  }
}

function getMods(items, modClass) {
  let modArray = [];
  items.forEach((item) => { modArray.push(item[modClass]) });
  modArray = _.flatten(modArray);
  modArray = _.compact(modArray);
  return modArray;
}

function getImplicitMods(items) {
  const modArray = getMods(items, 'implicitMods');
  const modClasses = _.uniq(modArray.map((mod) => getModClasses(mod)));

  return modClasses;
}
  // find the ranges of the same mod

function getExplicitMods(items) {
  const modArray = getMods(items, 'explicitMods');
  const modClasses = _.uniq(modArray.map((mod) => getModClasses(mod)));

  return modClasses;

}

function getItemsInCategory(items, category) {
  return items.filter((item) => {
    const itemCategory = Object.getOwnPropertyNames(item.category)[0];
    return itemCategory === category;
  });
}

function getItemsInSubCategory(items, subcategory) {
  // assume items array is a value from getItemsInCategory
  const categoryName = getCategories(items)[0];
  return items.filter((item) => item.category[categoryName][0] === subcategory);
}

function getCategories(items) {
  let categoryArray = [];
  items.forEach((item) => categoryArray.push(item.category));

  return sortCategories(categoryArray);
}

function getSubCategories(items, category) {
  const itemsArray = getItemsInCategory(items, category);

  let subcategoryArray = [];
  itemsArray.forEach((item) => subcategoryArray.push(item.category[category]))

  return sortCategories(subcategoryArray);
}

function sortCategories(array) {
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


module.exports.getStashItems = getStashItems;
module.exports.getImplicitMods = getImplicitMods;
module.exports.getExplicitMods = getExplicitMods;
module.exports.getItemsInCategory = getItemsInCategory;
module.exports.getItemsInSubCategory = getItemsInSubCategory;
module.exports.getCategories = getCategories;
module.exports.getSubCategories = getSubCategories;
module.exports.sortCategories = sortCategories;
