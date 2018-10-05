const _ = require('lodash');

// return array of unique implicit mod classes
module.exports = function getImplicitMods(items) {
  const modArray = getMods(items, 'implicitMods');
  const modClasses = _.uniq(modArray.map((mod) => getModClass(mod)));

  return modClasses;
}

// return array of unique explicit mod classes
module.exports = function getExplicitMods(items) {
  const modArray = getMods(items, 'explicitMods');
  const modClasses = _.uniq(modArray.map((mod) => getModClass(mod)));

  return modClasses;
}

// create a generic modifier by replacing the digits with x
module.exports = function getModClass(mod) {
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

// return array of raw modifiers from the specified mod category
module.exports = function getMods(items, modCategory) {
  const modArray = _.flatten(items.map((item) => item[modCategory]));
  return _.compact(modArray);
}

// *** find the ranges of the same mod

// return object of  specific item's modifiers
module.exports = function getItemMods(item) {
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
