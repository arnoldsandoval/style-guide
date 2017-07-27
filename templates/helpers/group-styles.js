const trimSingleQuotes = require('./trim-single-quotes');

// Full list of pseudo classes
// https://developer.mozilla.org/en-US/docs/Web/CSS/:active
// Commented out classes either conflict with normal css properties (left, right)
// or require parenthesis (:not(.foo)) and won't match an array.includes('not').
const pseudoClasses = [
  'active',
  // 'any',
  'any-link',
  'checked',
  'default',
  // 'dir',
  'disabled',
  'empty',
  'enabled',
  'first',
  'first-child',
  'first-of-type',
  'fullscreen',
  'focus',
  'focus-within',
  'hover',
  'indeterminate',
  'in-range',
  'invalid',
  // 'lang',
  'last-child',
  'last-of-type',
  // 'left',
  'link',
  // 'not',
  // 'nth-child',
  // 'nth-last-child',
  // 'nth-last-of-type',
  // 'nth-of-type',
  'only-child',
  'only-of-type',
  'optional',
  'out-of-range',
  'placeholder-shown',
  'read-only',
  'read-write',
  'required',
  // 'right',
  'root',
  'scope',
  'target',
  'valid',
  'visited',
];

module.exports = (styles) => {
  const result = [];
  const baseStyles = {};

  Object.keys(styles).forEach((property) => {
    const prop = trimSingleQuotes(property);

    const startsWithColon = prop.startsWith(':');
    if (startsWithColon || pseudoClasses.includes(prop)) {
      result.push({
        title: startsWithColon ? prop : ':' + prop,
        styles: styles[property],
      });
    } else {
      baseStyles[property] = styles[property];
    }
  });

  // Base styles could possibly be mixed within the other pseudo classes/elements,
  // so after collecting all of them, put it first.
  result.unshift({
    title: '',
    styles: baseStyles,
  });

  return result;
};
