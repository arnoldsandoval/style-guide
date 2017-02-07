'use strict';

const fs = require('fs');
const path = require('path');
const requirePeer = require('require-linked-peer');
const gulp = requirePeer('gulp');

module.exports = function (directory) {
  fs.readdirSync(directory).forEach(function (filename) {
    let file = path.join(directory, filename);
    let extension = path.extname(filename);
    let stat = fs.statSync(file);

    if (stat.isFile() && extension !== '.js') {
      return;
    }

    let taskName = path.basename(filename, extension);

    gulp.task.apply(gulp, [taskName].concat(require(file)));
  });
};
