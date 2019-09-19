/**
 * Group array of objects by key value
 *
 * @param {Array} array
 * @param {String} keyField
 */
const groupBy = (array = [], prop) => {
  if (!Array.isArray(array)) {
    throw new Error("First argument should be array");
  }

  return array.reduce((groups, item) => {
    const val = item[prop];
    groups[val] = groups[val] || []; // eslint-disable-line no-param-reassign
    groups[val].push(item);
    return groups;
  }, {});
};

export default groupBy;
