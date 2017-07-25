import test from 'ava';
import trimSingleQuotes from '../templates/helpers/trim-single-quotes';

test('it will strip single quotes from strings', (t) => {
  t.is(trimSingleQuotes('\'foo\''), 'foo');
});

test('won\'t trim quotes that don\'t exist', (t) => {
  t.is(trimSingleQuotes('foo'), 'foo');
});
