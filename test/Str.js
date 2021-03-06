import test from 'ava';
import { Str, str, random } from '../src';

test('it should captialize the first letter in a string', t => {
  t.is(str('foo bar baz!').ucfirst().get(), 'Foo bar baz!');
  t.is(str('foobarbaz').ucfirst().get(), 'Foobarbaz');
  t.is(str('мама мыла раму').ucfirst().get(), 'Мама мыла раму');
});

test('it should lower case the first letter in a string', t => {
  t.is(str('Foo bar baz!').lcfirst().get(), 'foo bar baz!');
  t.is(str('FooBarBaz').lcfirst().get(), 'fooBarBaz');
});

test('it should determine whether a string contains another string', t => {
  t.true(str('foobarbaz').contains('bar'));
  t.false(str('foobarbaz').contains('bob'));
  t.false(str('foobarbaz').contains('foo', 2));
});

test('it should limit a string', t => {
  t.is(str('Lorem ipsum dolor sit amet').limit(20).get(), 'Lorem ipsum dolor si…');
  t.is(str('Lorem ipsum dolor sit amet').limit(10, '***').get(), 'Lorem ipsu***');
  t.is(str('Lorem ipsum dolor sit amet').limit(100).get(), 'Lorem ipsum dolor sit amet');
});

test('it should limit a string by words', t => {
  t.is(str('Lorem ipsum dolor sit amet').words(3).get(), 'Lorem ipsum dolor…');
  t.is(str('Lorem ipsum dolor sit amet').words(10).get(), 'Lorem ipsum dolor sit amet');
  t.is(str('Lorem ipsum dolor sit amet, consectetur adipiscing elit').words(7).get(), 'Lorem ipsum dolor sit amet, consectetur adipiscing…');
});

test('it should generate a random string', t => {
  t.true(typeof Str.random().get() === 'string');
  t.is(random(16).length, 16);
  t.is(Str.random().length, 32);
});

test('it should check if a string starts with a string', t => {
  t.true(str('Lorem ipsum dolor sit amet').startsWith('Lorem'));
  t.false(str('Lorem ipsum dolor sit amet').startsWith('ipsum'));
  t.true(str('Lorem ipsum dolor sit amet').startsWith('ipsum', 6));
});

test('it should check if a string ends with a string', t => {
  t.true(str('Lorem ipsum dolor sit amet').endsWith('amet'));
  t.false(str('Lorem ipsum dolor sit amet').endsWith('ipsum'));
  t.true(str('Lorem ipsum dolor sit amet').endsWith('ipsum', 11));
});

test('it should check if a string is all lowercase', t => {
  t.false(str('Lorem ipsum dolor sit amet').isLowerCase());
  t.true(str('lorem ipsum dolor sit amet').isLowerCase());
});

test('it should check if a string is all uppercase', t => {
  t.false(str('LOREM ipsum Dolor sit amet').isUpperCase());
  t.true(str('LOREM IPSUM').isUpperCase());
});

test('it should strip all whitespace from a string', t => {
  t.is(str('Lorem ipsum dolor sit amet').strip().get(), 'Loremipsumdolorsitamet');
});

test('it should convert a string into title case', t => {
  t.is(str('foo bar baz!').title().get(), 'Foo Bar Baz!');
  t.is(str('lorem ipsum DoloR sit ameT').title().get(), 'Lorem Ipsum Dolor Sit Amet');
});

test('it should convert a string into studly case', t => {
  t.is(str('chuck_her_in_the_ute').studly().get(), 'ChuckHerInTheUte');
  t.is(str('chuck_her_in_the_u_t_e').studly().get(), 'ChuckHerInTheUTE');
  t.is(str('chuck  -_-  her  -_-  in  -_-  the  -_-  ute').studly().get(), 'ChuckHerInTheUte');
  t.is(str('tymon_designs').studly().get(), 'TymonDesigns');
  t.is(str('tymon designs').studly().get(), 'TymonDesigns');
  t.is(str('tymonDesigns').studly().get(), 'Tymondesigns');
});

test('it should convert a string into camel case', t => {
  t.is(str('chuck_her_in_the_ute').camel().get(), 'chuckHerInTheUte');
  t.is(str('chuck_her_in_the_u_t_e').camel().get(), 'chuckHerInTheUTE');
  t.is(str('chuck  -_-  her  -_-  in  -_-  the  -_-  ute').camel().get(), 'chuckHerInTheUte');
  t.is(str('tymon_designs').camel().get(), 'tymonDesigns');
  t.is(str('tymonDesigns').camel().get(), 'tymonDesigns');
});

test('it should convert a string into snake case', t => {
  t.is(str('LoremIpsumDolorSitAmet').snake().get(), 'lorem_ipsum_dolor_sit_amet');
  t.is(str('LoremIpsumDolorSitAmet').snake('__').get(), 'lorem__ipsum__dolor__sit__amet');
});

test('it should convert a string into kebab case', t => {
  t.is(str(' chuckHerInTheUte ').kebab().get(), 'chuck-her-in-the-ute');
  t.is(str('chuckHerInTheUTE').kebab().get(), 'chuck-her-in-the-u-t-e');
  t.is(str('chuckherintheute').kebab().get(), 'chuckherintheute');
});

test('it should convert a utf string into ascii', t => {
  t.is(str('@ðẻ-₀ფف').ascii().get(), 'atde-0ff');
  t.is(str('I ♥ javascript').ascii().get(), 'I love javascript');
});

test('it should slugify a string', t => {
  t.is(str('FOO bar baz').slug().get(), 'foo-bar-baz');
  t.is(str('foo-bar-baz').slug().get(), 'foo-bar-baz');
  t.is(str('foo_bar_baz').slug().get(), 'foo-bar-baz');
  t.is(str('foo_bar_baz').slug('_').get(), 'foo_bar_baz');
  t.is(str('I ♥ javascript').slug().get(), 'i-love-javascript');
});

test('it should chain methods', t => {
  const s1 = str('lorem ipsum dolor sit amet')
    .title()
    .limit(10)
    .get();

  const s2 = str('lorem ipsum dolor sit amet')
    .camel()
    .limit(13)
    .endsWith('loremIpsumDol…');

  const s3 = str('lorem ipsum dolor sit amet')
    .title()
    .pipe(s => s.toLowerCase())
    .limit(10)
    .get();

  t.is(s1, 'Lorem Ipsu…');
  t.is(s3, 'lorem ipsu…');
  t.true(s2);
});
