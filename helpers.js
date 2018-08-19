const _ = require('lodash');

function getStashItems(data) { // separate the item data from parent objects
  const itemArray = [];

  data.forEach((stash) => {
    itemArray.push(stash.items);
  });

  return itemArray;
}

function getCategories(items) {
  let categoryArray = [];
  items.forEach((item) => categoryArray.push(item.category));

  return sortCategories(categoryArray);
}

function getSubCategories(items, category) {
  const itemsArray = items.filter((item) => {
    const itemCategory = Object.getOwnPropertyNames(item.category)[0];
    return itemCategory === category;
  });

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
module.exports.getCategories = getCategories;
module.exports.getSubCategories = getSubCategories;
module.exports.sortCategories = sortCategories;

