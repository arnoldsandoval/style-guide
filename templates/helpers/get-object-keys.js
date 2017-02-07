'use strict';

/**
 * Retrieve the keys of an object as an array while excluding some keys.
 * @param {!Object} object Object to retrieve keys from.
 * @param {string|string[]} exclusions Array of keys to exclude.
 * @return {string[]} Array of keys.
 */
module.exports = function getObjectKeys(object, exclusions) {
  if (!Array.isArray(exclusions)) {
    exclusions = [exclusions];
  }

  return Object.keys(object).filter(k => exclusions.indexOf(k) === -1);
};
