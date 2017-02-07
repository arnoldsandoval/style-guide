'use strict';

const del = require('del');
const config = require('../config');

module.exports = function () {
  return del(config.current.dist.markup, { force: true });
};
