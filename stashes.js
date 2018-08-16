const data = require('./data.json')[1];

const PUBLIC_STASHES = data.filter((stash) => stash.public);

const items = () => {
  const itemArray = [];

  PUBLIC_STASHES.forEach((stash) => {
    itemArray.push(stash.items); 
  });

  return itemArray;

}
console.log(items);

