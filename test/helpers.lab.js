const Code = require('code');

const lab = (exports.lab = require('lab').script());

const expect = Code.expect;
const suite = lab.suite;
const test = lab.test;


const { translateHealth } = require('../helpers');

const {
  _maxHealth,
  _plusHealthRest,
  _fireDamage,
  _empty,
  _exit,
  _diamond,
  _fire,
  _playerMinOnEmpty,
  _playerMaxOnEmpty,
  _playerMinOnFire,
  _playerMaxOnFire,
  _numObjects
}  = require('../constants');

suite('helpers', () => {
  test('translateHealth(_playerMinOnEmpty,true)', () => {
    expect(translateHealth(_playerMinOnEmpty,true)).to.equal(_playerMinOnEmpty);
  });
  test('translateHealth(_playerMinOnFire,true)', () => {
    expect(translateHealth(_playerMinOnFire,true)).to.equal(_playerMinOnEmpty);
  });
  test('translateHealth(_playerMinOnEmpty,false)', () => {
    expect(translateHealth(_playerMinOnEmpty,false)).to.equal(_playerMinOnFire);
  });
  test('translateHealth(_playerMinOnFire,false)', () => {
    expect(translateHealth(_playerMinOnFire,false)).to.equal(_playerMinOnFire);
  });
});
