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
  CELL,
  _numObjects
}  = require('../constants');

suite('helpers', () => {
  test('translateHealth(CELL.playerMinOnEmpty,true)', () => {
    expect(translateHealth(CELL.playerMinOnEmpty,true)).to.equal(CELL.playerMinOnEmpty);
  });
  test('translateHealth(CELL.playerMinOnFire,true)', () => {
    expect(translateHealth(CELL.playerMinOnFire,true)).to.equal(CELL.playerMinOnEmpty);
  });
  test('translateHealth(CELL.playerMinOnEmpty,false)', () => {
    expect(translateHealth(CELL.playerMinOnEmpty,false)).to.equal(CELL.playerMinOnFire);
  });
  test('translateHealth(CELL.playerMinOnFire,false)', () => {
    expect(translateHealth(CELL.playerMinOnFire,false)).to.equal(CELL.playerMinOnFire);
  });
});
