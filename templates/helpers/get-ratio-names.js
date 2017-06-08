// "(16, 9)" => "16x9"
module.exports = ratios => ratios.map(pair => pair.slice(1, -1).split(', ').join('x'));
