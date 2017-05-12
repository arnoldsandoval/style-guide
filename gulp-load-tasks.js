const fs = require('fs');
const path = require('path');
const requirePeer = require('require-linked-peer');

const gulp = requirePeer('gulp');

module.exports = function loadTasks(directory) {
  fs.readdirSync(directory).forEach((filename) => {
    const file = path.join(directory, filename);
    const extension = path.extname(filename);
    const stat = fs.statSync(file);

    if (stat.isFile() && extension !== '.js') {
      return;
    }

    const taskName = path.basename(filename, extension);

    gulp.task.apply(gulp, [taskName].concat(require(file)));
  });
};
