'use strict';

function isGrayscale(str) {
  return /black|white|gray/g.test(str);
}

module.exports = function (colorsObject, onlyGrays) {
  return Object.keys(colorsObject)
    .filter(key => onlyGrays ? isGrayscale(key) : !isGrayscale(key))
    .reduce((obj, key) => {
      obj[key] = colorsObject[key];
      return obj;
    }, {});
};
