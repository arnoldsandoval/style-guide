'use strict';

const path = require('path');
const requirePeer = require('require-linked-peer');
const gulp = requirePeer('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const insert = require('gulp-insert');
const config = require('../config');

module.exports = function () {
  return gulp.src(path.join(config.dir.scss, config.patterns.scss))
    .pipe(sourcemaps.init())
    .pipe(insert.prepend('$theme-color: ' + config.current.themeColor + ';'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.current.dist.css));
};
