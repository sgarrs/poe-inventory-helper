const {getCategories, getSubCategories, sortCategories} = require('./helpers.js');

module.exports = function Categories(items) {
  const availableCategories = getCategories(items);
  const availableSubCategories = availableCategories.map((category) => getSubCategories(items, category));

  let categoryObject = {};
  for (let i = 0; i < availableCategories.length; i++) {
    categoryObject[availableCategories[i]] = availableSubCategories[i];
  }
  return categoryObject;
};
