'use strict';

/**
* http://locutus.io/php/math/hexdec/
* Converts string to hex value (base 16).
*/
function hexdec(hex) {
  hex = (hex + '').replace(/[^a-f0-9]/gi, '');
  return parseInt(hex, 16);
}

/**
 * Returns the average color value of a HEX's RGB value (0-255).
 * @author Christopher Mischler
 */
function getColorBrightness(hex) {
  var r = hexdec(hex.substr(1, 2));
  var g = hexdec(hex.substr(3, 2));
  var b = hexdec(hex.substr(5, 2));

  // Simple weighted avarage.
  // This might be overly simplistic as different colors are perceived
  // differently. That is a green of 128 might be brighter than a red of 128.
  // But as long as it's just about picking a white or black text color...
  return (r + g + b) / 3;
}

/**
* Determine whether a color is "dark" or "light" to determine overlaid text color.
* @author Christopher Mischler
 */
function isDarkColor(hex) {
  return typeof hex === 'string' && getColorBrightness(hex) < 140;
}

/**
 * Determine whether a color is so dark it's close to black, and the swatch
 * needs an outline.
 * @author Christopher Mischler
 */
function isAlmostBlack(hex) {
  return typeof hex === 'string' && getColorBrightness(hex) < 30;
}

/**
 * Determine whether a color is so light it's close to white, and the swatch
 * needs an outline.
 * @author Christopher Mischler
 */
function isAlmostWhite(hex) {
  return typeof hex === 'string' && getColorBrightness(hex) >= 240;
}

module.exports.isAlmostWhite = isAlmostWhite;
module.exports.isAlmostBlack = isAlmostBlack;
module.exports.getColorBrightness = getColorBrightness;
module.exports.isDarkColor = isDarkColor;
module.exports.hexdec = hexdec;
