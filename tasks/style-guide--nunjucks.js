const path = require('path');
const requirePeer = require('require-linked-peer');
const glob = require('glob');
const rename = require('gulp-rename');
const uniqBy = require('lodash/uniqBy');
const gulpNunjucks = require('gulp-nunjucks-render');
const config = require('../config');
const trimSingleQuotes = require('../templates/helpers/trim-single-quotes');
const groupStyles = require('../templates/helpers/group-styles');

const gulp = requirePeer('gulp');

const nunjucks = gulpNunjucks.nunjucks;

function getSourcePages() {
  let pages = glob.sync(path.join(config.dir.pages, '*.nunjucks'));

  if (config.current.templatePath) {
    const customPages = glob.sync(path.join(config.current.templatePath, 'pages/*.nunjucks'));
    pages = uniqBy(customPages.concat(pages), filepath => path.basename(filepath));
  }

  return pages;
}

function getSearchPaths() {
  const searchPaths = [config.dir.templates];

  // Prepend the project's template path if it exists. Nunjucks will prioritize
  // the project template.
  if (config.current.templatePath) {
    searchPaths.unshift(config.current.templatePath);
  }

  return searchPaths;
}

function getNunjucksOptions() {
  const searchPaths = getSearchPaths();
  const loaderOptions = { watch: false, noCache: true };

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
      env.addGlobal('groupStyles', groupStyles);
      env.addGlobal('size', obj => Object.keys(obj).length);
    },
  };
}

module.exports = function nunjucks(done) {
  return gulp.src(getSourcePages())
    .pipe(rename(config.current.renamePages))
    .pipe(gulpNunjucks(getNunjucksOptions()).on('error', (err) => {
      done(err);
    }))
    .pipe(gulp.dest(config.current.dist.markup));
};
