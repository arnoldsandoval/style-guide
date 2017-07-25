import test from 'ava';
import getObjectKeys from '../templates/helpers/get-object-keys';

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

test('it is the same as Object.keys() without exclusions', (t) => {
  t.deepEqual(getObjectKeys(allColors), Object.keys(allColors));
});

test('it can exlude a single key', (t) => {
  t.deepEqual(getObjectKeys(allColors, 'blue'), [
    'black',
    'gray10',
    'gray90',
    'gray',
    'white',
    'light-blue',
    'tan',
    'red',
    'purple',
    'yellow',
  ]);
});

test('it can exlude multiple keys', (t) => {
  t.deepEqual(getObjectKeys(allColors, ['black', 'blue', 'light-blue']), [
    'gray10',
    'gray90',
    'gray',
    'white',
    'tan',
    'red',
    'purple',
    'yellow',
  ]);
});
