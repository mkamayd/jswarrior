const _maxHealth = 1; //_maxHealth>=0 to be always true
const _plusHealthRest = 3;
const _fireDamage = 1;

const _empty = 0; //multiple (value 0)
const _exit = _empty + 1; //only one (value 1)
const _diamond = _exit + 1; //(value 2)
const _fire = _diamond + 1; //(value 3)
const _playerMinOnEmpty = _fire + 1; //only one 4->0 24->20 //(value 4)
const _playerMaxOnEmpty = _playerMinOnEmpty + _maxHealth;
const _playerMinOnFire = _playerMaxOnEmpty + 1; //only one 25->0 45->20
const _playerMaxOnFire = _playerMinOnFire + _maxHealth;
const _numObjects = _playerMaxOnFire;

module.exports = {
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
};