/**
 * Convert array of enities to id keyed object
 * https://medium.com/dailyjs/ec579cafbfc7
 *
 * @param {Array} array
 * @param {String} keyField
 */
const arrayToObject = (array = [], keyField = "id") => {
  if (!Array.isArray(array)) {
    throw new Error("First argument should be array");
  }

  return array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
};

export default arrayToObject;
