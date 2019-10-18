const _maxHealth = 20; //_maxHealth>=0 to be always true
const _staticEnemyMaxHealth = 19;
const _plusHealthRest = 5;
const _fireDamage = 1;

const _empty = 0; //multiple (value 0)
const _exit = _empty + 1; //only one (value 1)
const _diamond = _exit + 1; //(value 2)
const _fire = _diamond + 1; //(value 3)
const _playerMinOnEmpty = _fire + 1; //only one 4->0 24->20 //(value 4)
const _playerMaxOnEmpty = _playerMinOnEmpty + _maxHealth;
const _playerMinOnFire = _playerMaxOnEmpty + 1; //only one 25->0 45->20
const _playerMaxOnFire = _playerMinOnFire + _maxHealth;
const _staticEnemyMin = _playerMaxOnFire + 1;//min is 1 as 0 is empty
const _staticEnemyMax = _playerMaxOnFire + _staticEnemyMaxHealth;
const _numObjects = _staticEnemyMax;

module.exports = {
  _maxHealth,
  _staticEnemyMaxHealth,
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
  _staticEnemyMin,
  _staticEnemyMax,
  _numObjects
};
