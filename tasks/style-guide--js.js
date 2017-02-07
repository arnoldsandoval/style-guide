'use strict';

const path = require('path');
const requirePeer = require('require-linked-peer');
const gulp = requirePeer('gulp');
const concat = require('gulp-concat');
const config = require('../config');

module.exports = function () {
  return gulp.src([
      path.join(config.dir.root, 'js/*.js'),
      require.resolve('prismjs/prism.js'),
      require.resolve('prismjs/components/prism-scss.js'),
    ])
    .pipe(concat('docs.js'))
    .pipe(gulp.dest(config.current.dist.js));
};
