const path = require('path');
const fs = require('fs');
const requireDir = require('require-dir');

// Helpers
const getFilteredColors = require('./templates/helpers/get-filtered-colors');
const getSpecData = require('./templates/helpers/get-spec-data');
const color = require('./templates/helpers/color');
const trimSingleQuotes = require('./templates/helpers/trim-single-quotes');
const getObjectKeys = require('./templates/helpers/get-object-keys');

const root = path.resolve(__dirname);

module.exports = {
  dir: {
    root,
    templates: path.join(root, 'templates'),
    pages: path.join(root, 'templates/pages'),
    js: path.join(root, 'js'),
    scss: path.join(root, 'css'),
  },

  templateUtils: {
    color,
    getFilteredColors,
    getSpecData,
    getObjectKeys,
    trimSingleQuotes,
  },

  patterns: {
    js: '**/*.js',
    json: '**/*.json',
    nunjucks: '**/*.nunjucks',
    scss: '**/*.scss',
  },

  current: null,
};

/**
 * Get the global list of icons.
 * @param {string} iconDirectory icon directory in source.
 * @return {Array.<string>} An array of SVG file names.
 */
function getIcons(iconDirectory) {
  if (iconDirectory) {
    return fs.readdirSync(iconDirectory)
      .filter(icon => path.extname(icon) === '.svg')
      .map(icon => path.basename(icon, '.svg'));
  }

  return [];
}

module.exports.getTemplateData = function getTemplateData() {
  // Read all .json files into an object and merge with the user-defined config.
  return Object.assign(
    {},
    module.exports.current,
    { iconList: getIcons(module.exports.current.iconPath) },
    requireDir(module.exports.current.jsonSource, { camelcase: true }),
    module.exports.templateUtils
  );
};
