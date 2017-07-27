/* eslint no-use-before-define: ["error", { "functions": false }] */

// Parse json input into an object with selectors as keys.

const reduce = require('lodash/reduce');
const forEach = require('lodash/forEach');
const mapKeys = require('lodash/mapKeys');
const trimSingleQuotes = require('./trim-single-quotes');

const SPECIAL = [
  '__comment__',
  'docs-demo',

  'breakpoints',
  'modifiers',
  'qualifiers',
  'children',
  'raw',
];

function getValue(property, value, variables) {
  if (property === 'font-family' && variables && variables['font-families'] &&
      variables['font-families'][value]) {
    return trimSingleQuotes(variables['font-families'][value])
      .split(',')[0]
      .replace(/"/g, '');
  }

  return value;
}

// Prepend the selector with a dot if it doesn't have one.
function getDisplaySelector(selector) {
  if (selector.startsWith('.')) {
    return selector;
  }

  return '.' + selector;
}

// Prepend qualifer selector.
// Run through this method again to collect all styles.
function getQualifiers(selector, data, variables) {
  const newKeys = mapKeys(data, (v, k) => `${trimSingleQuotes(k)} .${selector}`);
  return mapData(newKeys, variables);
}

// Append the modifier to each selector.
// Run through this method again to collect all styles.
function getModifiers(selector, data, variables) {
  const newKeys = mapKeys(data, (v, k) => `${selector}--${trimSingleQuotes(k)}`);
  return mapData(newKeys, variables);
}

function mapData(selectorData, variables) {
  return reduce(selectorData, (result, declarations, selector) => {
    const trimmedSelector = trimSingleQuotes(selector);

    const data = {
      base: {
        displaySelector: getDisplaySelector(selector),
        selector: trimmedSelector,
        styles: {},
        breakpoints: declarations.breakpoints || null,
        'docs-demo': declarations['docs-demo'] || null,
      },
    };

    // Go through each selector's declarations.
    forEach(declarations, (value, property) => {
      // Collect all styles that are always applied to the element.
      if (!SPECIAL.includes(property)) {
        data.base.styles[property] = getValue(property, value, variables);
      } else if (property === 'qualifiers') {
        // Run through this method again to collect all styles.
        data.qualifiers = getQualifiers(trimmedSelector, value, variables);
      } else if (property === 'modifiers') {
        data.modifiers = getModifiers(trimmedSelector, value, variables);
      }
    });

    result[trimmedSelector] = data;

    return result;
  }, {});
}

module.exports = mapData;
