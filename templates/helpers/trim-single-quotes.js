/**
 * In order to get complex strings through from json to the scss, it needs to be
 * in quotes. Json needs double-quotes around everything, and the json importer
 * strips off double quotes, but leaves behind the single quotes. This function
 * strips them off the front & back of a string, if they exist there.
 * @param {string} str String to trim.
 * @return {string} Trimmed string.
 */
module.exports = function trimSingleQuotes(str) {
  return str && str.replace(/^'|'$/g, '');
};
