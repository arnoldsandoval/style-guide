import test from 'ava';
import getFilteredColors from '../templates/helpers/get-filtered-colors';

const allColors = {
  black: 'a',
  gray10: 'b',
  gray90: 'c',
  gray: 'd',
  white: 'e',
  blue: 'f',
  'light-blue': 'g',
  tan: 'h',
  red: 'i',
  purple: 'j',
  yellow: 'k',
};

test('it can filter colors from grays', (t) => {
  t.deepEqual(getFilteredColors(allColors, false), {
    blue: 'f',
    'light-blue': 'g',
    tan: 'h',
    red: 'i',
    purple: 'j',
    yellow: 'k',
  });
});

test('it can filter grays from all colors', (t) => {
  t.deepEqual(getFilteredColors(allColors, true), {
    black: 'a',
    gray10: 'b',
    gray90: 'c',
    gray: 'd',
    white: 'e',
  });
});
