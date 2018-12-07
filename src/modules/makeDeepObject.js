function makeDeep (object) {
  const result = {};
  Object.entries(object).forEach(([key, value]) => {
    const keys = key.split('.');
    let partial = result;
    keys.slice(0, keys.length - 1).forEach((k) => {
      partial[k] = partial[k] || {};
      partial = partial[k];
    });
    partial[keys.pop()] = value;
  });
  return result;
}

export default makeDeep;
