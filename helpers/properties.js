const getPropTypes = (items) => {
  let types = [];
  for (let i = 0; i < 50; i++) {
    types.push(i);
  }
  let used = [];
  let propTypes = [];

  items.forEach((item) => {
    const itemObj = Object.assign(item);
    const props = [].concat(itemObj.properties);
    props.forEach((prop) => {
      const propObj = prop !== undefined && Object.assign(prop);
      if (propObj.hasOwnProperty('type')) {
        if (types.includes(propObj.type) && !used.includes(propObj.type)) {
          propTypes.push(propObj);
          used.push(propObj.type);
        }
      }
    });
  });

  return propTypes;
}

