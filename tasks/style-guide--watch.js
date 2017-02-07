'use strict';

const path = require('path');
const requirePeer = require('require-linked-peer');
const gulp = requirePeer('gulp');
const config = require('../config');

// Remove cached files which have changed.
function removeCachedFile(event) {
  delete require.cache[event.path];
}

module.exports = function () {

  gulp.watch(config.patterns.nunjucks, {
    cwd: config.dir.templates,
  }, ['style-guide--nunjucks']);

  let jsonWatcher = gulp.watch(config.patterns.json, {
    cwd: config.current.jsonSource,
  }, ['style-guide--nunjucks']);

  jsonWatcher.on('change', removeCachedFile);

  gulp.watch(config.patterns.js, {
    cwd: path.resolve(config.dir.js),
  }, ['style-guide--css']);

  gulp.watch(config.patterns.scss, {
    cwd: path.resolve(config.dir.scss),
  }, ['style-guide--css']);
};
