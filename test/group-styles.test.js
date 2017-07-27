import test from 'ava';
import groupStyles from '../templates/helpers/group-styles';


test('it will organize styles', (t) => {
  t.deepEqual(groupStyles({
    '-webkit-appearance': 'none',
    padding: 8,

    valid: {
      border: '1px solid green',
    },

    "':invalid'": {
      border: '1px solid #e21',
    },

    hover: {
      color: 'blue',
    },

    color: 'gray20',

    "'::after'": {
      position: 'absolute',
    },

    "':not(.disabled)'": {
      color: 'tan',
    },
  }), [
    {
      title: '',
      styles: {
        '-webkit-appearance': 'none',
        padding: 8,
        color: 'gray20',
      },
    },
    {
      title: ':valid',
      styles: {
        border: '1px solid green',
      },
    },
    {
      title: ':invalid',
      styles: {
        border: '1px solid #e21',
      },
    },
    {
      title: ':hover',
      styles: {
        color: 'blue',
      },
    },
    {
      title: '::after',
      styles: {
        position: 'absolute',
      },
    },
    {
      title: ':not(.disabled)',
      styles: {
        color: 'tan',
      },
    },
  ]);
});
