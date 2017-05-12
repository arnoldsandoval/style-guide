const del = require('del');
const config = require('../config');

module.exports = function clean() {
  return del(config.current.dist.markup, { force: true });
};
