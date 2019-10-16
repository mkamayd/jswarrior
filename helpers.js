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
  }  = require('./constants') ;

const translateHealth = (current, toWalkingToSafe = true) => {
    if (toWalkingToSafe) {
      if (current >= _playerMinOnEmpty && current <= _playerMaxOnEmpty)
        return current;
      return current - _maxHealth;
    }
    if (current >= _playerMinOnEmpty && current <= _playerMaxOnEmpty)
      return current + _maxHealth;
    return current;
  };

const canMove = val => val === _empty || val === _exit || val === _fire;

//we assume there is only one exit
const isFinalState = config => !config.includes(_exit);

const findLivingPlayer = array => {
  const overEmpty = find(array, _playerMinOnEmpty + 1, _playerMaxOnEmpty);
  if (overEmpty.index >= 0) {
    return overEmpty;
  }
  return find(array, _playerMinOnFire + 1, _playerMaxOnFire);
};

const find = (array, objectId, objectIdMaxRange = objectId) => {
  let index = -1;
  let value = undefined;
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= objectId && array[i] <= objectIdMaxRange) {
      index = i;
      value = array[i];
      break;
    }
  }
  return { index, value };
};


const padWithZeros = (n, maxValue) =>
  `${n}`.padStart(`${maxValue}`.length, "0");

const getHasCode = config =>
  config.map(current => padWithZeros(current, _numObjects)).join("");

const print = config => {
  console.log(JSON.stringify(config));
};


module.exports = {
    translateHealth,
    canMove,
    isFinalState,
    findLivingPlayer,
    find,
    padWithZeros,
    getHasCode,
    print
};