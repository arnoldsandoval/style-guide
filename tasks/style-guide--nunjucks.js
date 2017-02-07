'use strict';

const path = require('path');
const requirePeer = require('require-linked-peer');
const gulp = requirePeer('gulp');
const glob = require('glob');
const rename = require('gulp-rename');
const uniqWith = require('lodash/uniqWith');
const gulpNunjucks = require('gulp-nunjucks-render');
const config = require('../config');
const nunjucks = gulpNunjucks.nunjucks;
const trimSingleQuotes = require('../templates/helpers/trim-single-quotes');

function getSourcePages() {
  let pages = glob.sync(path.join(config.dir.pages, '*.nunjucks'));

  if (config.current.templatePath) {
    let customPages = glob.sync(path.join(config.current.templatePath, 'pages/*.nunjucks'));
    pages = uniqWith(customPages.concat(pages), filepath => path.basename(filepath));
  }

  return pages;
}

function getSearchPaths() {
  let searchPaths = [config.dir.templates];

  // Prepend the project's template path if it exists. Nunjucks will prioritize
  // the project template.
  if (config.current.templatePath) {
    searchPaths.unshift(config.current.templatePath);
  }

  return searchPaths;
}

function getNunjucksOptions() {
  let searchPaths = getSearchPaths();
  let loaderOptions = { watch: false, noCache: true };

  return {
    data: config.getTemplateData(),
    loaders: new nunjucks.FileSystemLoader(searchPaths, loaderOptions),
    envOptions: {
      autoescape: false,
      trimBlocks: true, // automatically remove trailing newlines from a block/tag
      lstripBlocks: true, // automatically remove leading whitespace from a block/tag
    },
    manageEnv(env) {
      // macros do not have access to the template's context (data, methods, etc.).
      env.addGlobal('trimSingleQuotes', trimSingleQuotes);
      env.addGlobal('size', obj => Object.keys(obj).length);
    },
  };
}

module.exports = function (done) {
  return gulp.src(getSourcePages())
    .pipe(rename(config.current.renamePages))
    .pipe(gulpNunjucks(getNunjucksOptions()).on('error', (err) => {
      done(err);
    }))
    .pipe(gulp.dest(config.current.dist.markup));
};
