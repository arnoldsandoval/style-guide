import test from 'ava';
import getSpecData from '../templates/helpers/get-spec-data';


test('it will place all styles in `baseStyles`', (t) => {
  t.deepEqual(getSpecData({
    'type-display-1': {
      color: 'orangered',
      'margin-bottom': 0,
    },
  }), {
    'type-display-1': {
      baseStyles: {
        color: 'orangered',
        'margin-bottom': 0,
      },
      displaySelector: '.type-display-1',
      breakpoints: null,
      qualifiers: null,
      'docs-demo': null,
    },
  });
});

test('it can have breakpoint-specific styles', (t) => {
  t.deepEqual(getSpecData({
    'type-display-1': {
      color: 'orangered',
      'margin-bottom': 0,
      breakpoints: {
        sm: {
          'font-size': 24,
          'margin-bottom': 4,
        },
        md: {
          'font-size': 28,
          'margin-bottom': 8,
        },
      },
    },
  }), {
    'type-display-1': {
      baseStyles: {
        color: 'orangered',
        'margin-bottom': 0,
      },
      displaySelector: '.type-display-1',
      breakpoints: {
        sm: {
          'font-size': 24,
          'margin-bottom': 4,
        },
        md: {
          'font-size': 28,
          'margin-bottom': 8,
        },
      },
      qualifiers: null,
      'docs-demo': null,
    },
  });
});

test('it can separate modifiers into their own selectors and add `isModifier` property', (t) => {
  t.deepEqual(getSpecData({
    'type-display-1': {
      color: 'orangered',
      'margin-bottom': 0,
      modifiers: {
        small: {
          'font-size': 12,
        },
      },
    },
  }), {
    'type-display-1': {
      baseStyles: {
        color: 'orangered',
        'margin-bottom': 0,
      },
      displaySelector: '.type-display-1',
      breakpoints: null,
      qualifiers: null,
      'docs-demo': null,
    },
    'type-display-1--small': {
      baseStyles: {
        'font-size': 12,
      },
      displaySelector: '.type-display-1--small',
      breakpoints: null,
      qualifiers: null,
      'docs-demo': null,
      isModifier: true,
    },
  });
});

test('it can combine modifiers and breakpoints', (t) => {
  t.deepEqual(getSpecData({
    'type-display-1': {
      color: 'orangered',
      'margin-bottom': 0,
      modifiers: {
        small: {
          'font-size': 12,
          breakpoints: {
            sm: {
              'font-size': 24,
              'margin-bottom': 4,
            },
            md: {
              'font-size': 28,
              'margin-bottom': 8,
            },
          },
        },
      },
    },
  }), {
    'type-display-1': {
      baseStyles: {
        color: 'orangered',
        'margin-bottom': 0,
      },
      displaySelector: '.type-display-1',
      breakpoints: null,
      qualifiers: null,
      'docs-demo': null,
    },
    'type-display-1--small': {
      baseStyles: {
        'font-size': 12,
      },
      displaySelector: '.type-display-1--small',
      breakpoints: {
        sm: {
          'font-size': 24,
          'margin-bottom': 4,
        },
        md: {
          'font-size': 28,
          'margin-bottom': 8,
        },
      },
      qualifiers: null,
      'docs-demo': null,
      isModifier: true,
    },
  });
});

test('it will put state objects in baseStyles', (t) => {
  t.deepEqual(getSpecData({
    'type-display-1': {
      color: 'orangered',
      'margin-bottom': 0,
      hover: {
        color: 'blue',
      },
    },
  }), {
    'type-display-1': {
      baseStyles: {
        color: 'orangered',
        'margin-bottom': 0,
        hover: {
          color: 'blue',
        },
      },
      displaySelector: '.type-display-1',
      breakpoints: null,
      qualifiers: null,
      'docs-demo': null,
    },
  });
});

test('it will display the real font family name if available', (t) => {
  t.deepEqual(getSpecData({
    'type-display-1': {
      color: 'orangered',
      'font-family': 'sans-serif',
    },
  }), {
    'type-display-1': {
      baseStyles: {
        color: 'orangered',
        'font-family': 'sans-serif',
      },
      displaySelector: '.type-display-1',
      breakpoints: null,
      qualifiers: null,
      'docs-demo': null,
    },
  });

  const data = {
    'type-display-1': {
      color: 'orangered',
      'font-family': 'sans-serif',
    },
  };
  const variables = {
    'font-families': {
      'sans-serif': '\'"San Francisco", Helvetica, sans-serif\'',
    },
  };

  t.deepEqual(getSpecData(data, variables), {
    'type-display-1': {
      baseStyles: {
        color: 'orangered',
        'font-family': 'San Francisco',
      },
      displaySelector: '.type-display-1',
      breakpoints: null,
      qualifiers: null,
      'docs-demo': null,
    },
  });
});
