const path = require('path');
const mergeOptions = require('merge-options');
const config = require('./config');
const defaults = require('./defaults');
const gulpLoadTasks = require('./gulp-load-tasks');

module.exports.configure = function configure(options) {
  if (!options.jsonSource) {
    throw new TypeError('Missing `jsonSource` option for style guide.');
  }

  const buildConfig = mergeOptions(defaults, options);
  buildConfig.jsonSource = path.join(process.cwd(), buildConfig.jsonSource);
  config.current = buildConfig;

  // Export gulp tasks.
  gulpLoadTasks(path.join(__dirname, 'tasks'));
};

// Allow modifying the config after it has been initialized.
module.exports.getConfig = function getConfig() {
  return config.current;
};
