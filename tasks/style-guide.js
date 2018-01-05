const requirePeer = require('require-linked-peer');

const gulp = requirePeer('gulp');

module.exports = gulp.parallel('style-guide--css', 'style-guide--js', 'style-guide--nunjucks');
