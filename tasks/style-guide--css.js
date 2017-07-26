const path = require('path');
const requirePeer = require('require-linked-peer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const replace = require('gulp-replace');
const config = require('../config');

const gulp = requirePeer('gulp');

module.exports = function css() {
  const replacement = config.current.docsCssPath ?
    `@import "${path.resolve(config.current.docsCssPath)}";` :
    '';

  return gulp.src(path.join(config.dir.scss, config.patterns.scss))
    .pipe(replace('// %docsCssPath%', replacement))
    .pipe(replace('// %themeColor%', `$theme-color: ${config.current.themeColor};`))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.current.dist.css));
};
