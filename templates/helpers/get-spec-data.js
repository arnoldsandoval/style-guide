'use strict';

// Make base styles and breakpoint styles.
const reduce = require('lodash/reduce');
const forEach = require('lodash/forEach');
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

function mapData(selectorData, variables) {
  return reduce(selectorData, (result, declarations, selector) => {
    selector = trimSingleQuotes(selector);
    let displaySelector = getDisplaySelector(selector);

    const baseStyles = {};
    let qualifiers = null;
    let modifiers = null;

    // Go through each selector's declarations.
    forEach(declarations, (value, property) => {
      // Collect all styles that are always applied to the element.
      if (!SPECIAL.includes(property)) {
        baseStyles[property] = getValue(property, value, variables);

      } else if (property === 'qualifiers') {

        // Prepend the qualifier to each selector.
        let qData = reduce(value, (result, obj, parentSelector) => {
          result[parentSelector + ' .' + selector] = obj;
          return result;
        }, {});

        // Run through this method again to collect all styles.
        qualifiers = mapData(qData, variables);

      } else if (property === 'modifiers') {

        // Append the modifier to each selector.
        let qData = reduce(value, (result, obj, modifier) => {
          result[selector + '--' + trimSingleQuotes(modifier)] = obj;
          return result;
        }, {});

        // Run through this method again to collect all styles.
        modifiers = mapData(qData, variables);
      }
    });

    result[selector] = {
      displaySelector,
      baseStyles,
      breakpoints: declarations.breakpoints,
      qualifiers: qualifiers,
      'docs-demo': declarations['docs-demo'],
    };

    if (modifiers) {
      forEach(modifiers, (obj, mSelector) => {
        obj.isModifier = true;
        result[mSelector] = obj;
      });
    }

    return result;
  }, {});
}

module.exports = mapData;
