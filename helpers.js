const _ = require('lodash');

function getStashItems(data) { // separate the item data from parent objects
  const itemArray = [];

  data.forEach((stash) => {
    itemArray.push(stash.items);
  });

  return itemArray;
}

function getModClass(mod) {
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
  const modClasses = _.uniq(modArray.map((mod) => getModClass(mod)));

  return modClasses;
}
  // find the ranges of the same mod

function getExplicitMods(items) {
  const modArray = getMods(items, 'explicitMods');
  const modClasses = _.uniq(modArray.map((mod) => getModClass(mod)));

  return modClasses;
}

function getItemsWithMods(items, modObj){
  return items.filter((item) => {
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

function getItemMods(item) {
  const implicitMods = (item.implicitMods)
    ? item.implicitMods.map((mod) => getModClass(mod))
    : null;
  const explicitMods = (item.explicitMods)
    ? item.explicitMods.map((mod) => getModClass(mod))
    : null;

  return {
    implicitMods: implicitMods,
    explicitMods: explicitMods
  }
}

function cleanMarkup(text) {
  const matchMarkup = /^[\w\d<>:]+>>/;

  if (matchMarkup.test(text)) {
    return text.replace(matchMarkup, '');
  }

  return text;
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
module.exports.getItemMods = getItemMods;
module.exports.getItemsWithMods = getItemsWithMods;
module.exports.getItemsInCategory = getItemsInCategory;
module.exports.getItemsInSubCategory = getItemsInSubCategory;
module.exports.cleanMarkup = cleanMarkup;
module.exports.getCategories = getCategories;
module.exports.getSubCategories = getSubCategories;
module.exports.sortCategories = sortCategories;
