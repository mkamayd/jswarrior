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

const {
    translateHealth,
    canMove,
    isFinalState,
    findLivingPlayer,
    find,
    padWithZeros,
    getHasCode,
    print
} = require('./helpers');

const _actionMoveLeft = "moveLeft";
const _actionMoveRight = "moveRight";
const _actionPickDiamondLeft = "pickDiamondLeft";
const _actionPickDiamondRight = "pickDiamondRight";
const _actionHealth = "health";

//we assume there is only one player
const allPossibleMoves = [
    {
      f: config => {
        const { index: playerPos, value: playerValue } = findLivingPlayer(config);
        if (playerPos > 0 && canMove(config[playerPos - 1])) {
          const cloned = config.clone();
          const movingToSafe =
            cloned[playerPos - 1] === _empty || cloned[playerPos - 1] === _exit;
          cloned[playerPos] =
            playerValue > _playerMinOnEmpty && playerValue <= _playerMaxOnEmpty
              ? _empty
              : _fire;
          cloned[playerPos - 1] = translateHealth(playerValue, movingToSafe);
          return cloned;
        }
        return undefined;
      },
      name: _actionMoveLeft
    },
    {
      f: config => {
        const { index: playerPos, value: playerValue } = findLivingPlayer(config);
        if (
          playerPos >= 0 &&
          playerPos < config.length - 1 &&
          canMove(config[playerPos + 1])
        ) {
          const cloned = config.clone();
          const movingToSafe =
            cloned[playerPos + 1] === _empty || cloned[playerPos + 1] === _fire;
          cloned[playerPos] =
            playerValue > _playerMinOnEmpty && playerValue <= _playerMaxOnEmpty
              ? _empty
              : _fire;
          cloned[playerPos + 1] = translateHealth(playerValue, movingToSafe);
          return cloned;
        }
        return undefined;
      },
      name: _actionMoveRight
    },
    {
      f: config => {
        const { index: playerPos } = findLivingPlayer(config);
        if (playerPos > 0 && config[playerPos - 1] === _diamond) {
          const cloned = config.clone();
          cloned[playerPos - 1] = _empty;
          return cloned;
        }
        return undefined;
      },
      name: _actionPickDiamondLeft
    },
    {
      f: config => {
        const { index: playerPos } = findLivingPlayer(config);
        if (
          playerPos >= 0 &&
          playerPos < config.length - 1 &&
          config[playerPos + 1] === _diamond
        ) {
          const cloned = config.clone();
          cloned[playerPos + 1] = _empty;
          return cloned;
        }
        return undefined;
      },
      name: _actionPickDiamondRight
    },
    {
      f: config => {
        const { index: playerPos, value: playerValue } = findLivingPlayer(config);
        if (
          playerPos > 0 &&
          (playerValue !== _playerMaxOnEmpty || playerValue !== _playerMaxOnFire)
        ) {
          const cloned = config.clone();
          const inEmpty =
            playerValue > _playerMinOnEmpty && playerValue < _playerMaxOnEmpty;
          cloned[playerPos] = Math.min(
            playerValue + _plusHealthRest,
            inEmpty ? _playerMaxOnEmpty : _playerMaxOnFire
          );
          return cloned;
        }
        return undefined;
      },
      name: _actionHealth
    }
  ];

module.exports = { allPossibleMoves };