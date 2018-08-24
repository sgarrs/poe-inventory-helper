const _ = require('lodash');

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

module.exports = function getMods(items, modClass) {
  let modArray = [];
  items.forEach((item) => { modArray.push(item[modClass]) });
  modArray = _.flatten(modArray);
  modArray = _.compact(modArray);
  return modArray;
}

module.exports = function getImplicitMods(items) {
  const modArray = getMods(items, 'implicitMods');
  const modClasses = _.uniq(modArray.map((mod) => getModClass(mod)));

  return modClasses;
}
  // find the ranges of the same mod

module.exports = function getExplicitMods(items) {
  const modArray = getMods(items, 'explicitMods');
  const modClasses = _.uniq(modArray.map((mod) => getModClass(mod)));

  return modClasses;
}

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
