import test from 'ava';
import getSpecData from '../templates/helpers/get-spec-data';


test('it will place all styles in `base.styles`', (t) => {
  t.deepEqual(getSpecData({
    'type-display-1': {
      color: 'orangered',
      'margin-bottom': 0,
    },
  }), {
    'type-display-1': {
      base: {
        selector: 'type-display-1',
        displaySelector: '.type-display-1',
        styles: {
          color: 'orangered',
          'margin-bottom': 0,
        },
        breakpoints: null,
        'docs-demo': null,
      },
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
      base: {
        selector: 'type-display-1',
        displaySelector: '.type-display-1',
        styles: {
          color: 'orangered',
          'margin-bottom': 0,
        },
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
        'docs-demo': null,
      },
    },
  });
});

test('it can separate modifiers into their own object', (t) => {
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
      base: {
        selector: 'type-display-1',
        displaySelector: '.type-display-1',
        styles: {
          color: 'orangered',
          'margin-bottom': 0,
        },
        breakpoints: null,
        'docs-demo': null,
      },
      modifiers: {
        'type-display-1--small': {
          base: {
            selector: 'type-display-1--small',
            displaySelector: '.type-display-1--small',
            styles: {
              'font-size': 12,
            },
            breakpoints: null,
            'docs-demo': null,
          },
        },
      },
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
      base: {
        selector: 'type-display-1',
        displaySelector: '.type-display-1',
        styles: {
          color: 'orangered',
          'margin-bottom': 0,
        },
        breakpoints: null,
        'docs-demo': null,
      },
      modifiers: {
        'type-display-1--small': {
          base: {
            selector: 'type-display-1--small',
            displaySelector: '.type-display-1--small',
            styles: {
              'font-size': 12,
            },
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
            'docs-demo': null,
          },
        },
      },
    },
  });
});

test('it will put pseudo class objects in styles', (t) => {
  t.deepEqual(getSpecData({
    'type-display-1': {
      color: 'orangered',
      'margin-bottom': 0,
      hover: {
        color: 'blue',
      },
      '::after': {
        position: 'absolute',
      },
    },
  }), {
    'type-display-1': {
      base: {
        selector: 'type-display-1',
        displaySelector: '.type-display-1',
        styles: {
          color: 'orangered',
          'margin-bottom': 0,
          hover: {
            color: 'blue',
          },
          '::after': {
            position: 'absolute',
          },
        },
        breakpoints: null,
        'docs-demo': null,
      },
    },
  });
});

test('it will display the real font family name if available', (t) => {
  const data = {
    'type-display-1': {
      color: 'orangered',
      'font-family': 'sans-serif',
    },
  };

  t.deepEqual(getSpecData(data), {
    'type-display-1': {
      base: {
        selector: 'type-display-1',
        displaySelector: '.type-display-1',
        styles: {
          color: 'orangered',
          'font-family': 'sans-serif',
        },
        breakpoints: null,
        'docs-demo': null,
      },
    },
  });

  const variables = {
    'font-families': {
      'sans-serif': '\'"San Francisco", Helvetica, sans-serif\'',
    },
  };

  t.deepEqual(getSpecData(data, variables), {
    'type-display-1': {
      base: {
        selector: 'type-display-1',
        displaySelector: '.type-display-1',
        styles: {
          color: 'orangered',
          'font-family': 'San Francisco',
        },
        breakpoints: null,
        'docs-demo': null,
      },
    },
  });
});
