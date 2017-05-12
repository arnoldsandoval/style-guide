const path = require('path');
const requirePeer = require('require-linked-peer');
const concat = require('gulp-concat');
const config = require('../config');

const gulp = requirePeer('gulp');

module.exports = function js() {
  return gulp.src([
    path.join(config.dir.root, 'js/*.js'),
    require.resolve('prismjs/prism.js'),
    require.resolve('prismjs/components/prism-scss.js'),
  ])
    .pipe(concat('docs.js'))
    .pipe(gulp.dest(config.current.dist.js));
};
