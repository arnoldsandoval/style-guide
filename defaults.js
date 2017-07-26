const path = require('path');

module.exports = {
  title: 'Odopod Style Guide',
  client: 'Odopod',
  jsonSource: null,
  stylesheets: [
    'css/docs.css',
  ],
  headScripts: [],
  bodyScripts: [
    'js/docs.js',
  ],
  dist: {
    markup: path.join(process.cwd(), 'dist'),
    css: path.join(process.cwd(), 'dist/css'),
    js: path.join(process.cwd(), 'dist/js'),
  },
  themeColor: '#03a9fa',
  templatePath: null,
  iconPath: null,
  docsCssPath: null,
  homeLink: 'index.html',
  directoryLinks: {
    'Style Guide': [
      {
        text: 'Grid',
        href: 'grid.html',
      }, {
        text: 'Colors',
        href: 'colors.html',
      }, {
        text: 'Typography',
        href: 'typography.html',
      }, {
        text: 'UI Components',
        href: 'ui-components.html',
      }, {
        text: 'CSS Utilities',
        href: 'css-utilities.html',
      },
    ],
    Modules: [],
    Pages: [],
  },
  renamePages: filepath => filepath,
};
