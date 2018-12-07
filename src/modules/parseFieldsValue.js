function parseObject (fields, defaultValue = {}) {
  return fields.reduce((accum, item) => {
    if (Array.isArray(item)) return Object.assign(accum, parseObject(item, defaultValue));
    const { fields: subfields, multiple, name, value } = item;
    if (subfields) {
      accum[name] = multiple ? (defaultValue[name] || []) : parseObject(subfields, defaultValue[name]);
    } else {
      accum[name] = (name in defaultValue) ? defaultValue[name] : value;
    }
    return accum;
  }, {});
}

export default parseObject;
