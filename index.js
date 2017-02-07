'use strict';

const path = require('path');
const mergeOptions = require('merge-options');
const config = require('./config');
const defaults = require('./defaults');

module.exports.configure = function (options) {
  if (!options.jsonSource) {
    throw new TypeError('Missing `jsonSource` option for style guide.');
  }

  let buildConfig = mergeOptions(defaults, options);
  buildConfig.jsonSource = path.join(process.cwd(), buildConfig.jsonSource);
  config.current = buildConfig;

  // Export gulp tasks.
  require('./gulp-load-tasks')(path.join(__dirname, 'tasks'));
};
