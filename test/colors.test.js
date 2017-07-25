import test from 'ava';
import colors from '../templates/helpers/color';

test('it can convert hex values to rgb decimal', (t) => {
  t.is(colors.hexdec('00'), 0);
  t.is(colors.hexdec('ff'), 255);
  t.is(colors.hexdec('80'), 128);
  t.is(colors.hexdec('42'), 66);
});

test('it can "average" the brightness of a color', (t) => {
  t.is(colors.getColorBrightness('#808080'), 128);

  // rgb(33, 66, 99) => #214263
  t.is(colors.getColorBrightness('#214263'), 66);
});

test('it can determine light and dark colors', (t) => {
  t.true(colors.isDarkColor('#333333'));
  t.true(colors.isDarkColor('#1a1a1a'));
  t.false(colors.isDarkColor('#f1f1f1'));

  t.false(colors.isAlmostBlack('#333333'));
  t.true(colors.isAlmostBlack('#1a1a1a'));
  t.false(colors.isAlmostBlack('#f1f1f1'));

  t.false(colors.isAlmostWhite('#333333'));
  t.false(colors.isAlmostWhite('#1a1a1a'));
  t.true(colors.isAlmostWhite('#f1f1f1'));
});
