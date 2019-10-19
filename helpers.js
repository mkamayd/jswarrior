const {
  _maxHealth,
  _staticEnemyMaxHealth,
  _plusHealthRest,
  _fireDamage,
  CELL,
  _numObjects
}  = require('./constants');

const translateHealth = (current, toWalkingToSafe = true) => {
  if (toWalkingToSafe) {
    if (current >= CELL.playerMinOnEmpty && current <= CELL.playerMaxOnEmpty){
      return current;
    }
    return current - (_maxHealth + 1);
  }
  if (current >= CELL.playerMinOnEmpty && current <= CELL.playerMaxOnEmpty){
    return current + (_maxHealth + 1);
  }
  return current;
};

const canMove = val => val === CELL.empty || val === CELL.exit || val === CELL.fire;

//we assume there is only one exit
const isFinalState = config => !config.includes(CELL.exit);

const isEnemy = val => val>=CELL.staticEnemyMin && val<=CELL.staticEnemyMax;

const findLivingPlayer = array => {
  const overEmpty = find(array, CELL.playerMinOnEmpty + 1, CELL.playerMaxOnEmpty);
  if (overEmpty.index >= 0) {
    return overEmpty;
  }
  return find(array, CELL.playerMinOnFire + 1, CELL.playerMaxOnFire);
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
  `${n}`.padStart(`${maxValue}`.length, '0');

const getHasCode = config =>
  config.map(current => padWithZeros(current, _numObjects)).join('');

const print = config => {
  console.log(JSON.stringify(config));
};


module.exports = {
  translateHealth,
  canMove,
  isFinalState,
  isEnemy,
  findLivingPlayer,
  find,
  padWithZeros,
  getHasCode,
  print
};
