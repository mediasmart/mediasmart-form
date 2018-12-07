function patch (object = {}, changes = {}, options = {}) {
  const { level = 0, fields } = options;
  Object.entries(changes)
    .filter(([key]) => (!fields || fields.includes(key)))
    .forEach(([key, value]) => {
      if (key.startsWith('_')) return;
      if (!object[key]) {
        object[key] = value;
        return;
      }
      if (!value || Array.isArray(value) || typeof value !== 'object' || value instanceof File || level > 0) {
        object[key] = value;
      } else {
        options.level = level + 1;
        patch(object[key], value, options);
      }
    });
}

export default patch;
