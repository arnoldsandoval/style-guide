import test from 'ava';
import getRatioNames from '../templates/helpers/get-ratio-names';

test('it can transform sass list syntax to class name style', (t) => {
  t.deepEqual(getRatioNames([
    '(16, 9)',
    '(4, 3)',
    '(2, 1)',
    '(1, 2)',
    '(1, 1)',
  ]), [
    '16x9',
    '4x3',
    '2x1',
    '1x2',
    '1x1',
  ]);
});
