const {
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
}  = require('./constants');

const {
  translateHealth,
  canMove,
  isFinalState,
  isEnemy,
  findLivingPlayer,
  find,
  padWithZeros,
  getHasCode,
  print
} = require('./helpers');

const actionsNames = {
  moveLeft : 'moveLeft',
  moveRight : 'moveRight',
  pickDiamondLeft : 'pickDiamondLeft',
  pickDiamondRight : 'pickDiamondRight',
  health : 'health',
  attackLeft : 'attackLeft',
  attackRight : 'attackRight',
};

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
    name: actionsNames.moveLeft
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
    name: actionsNames.moveRight
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
    name: actionsNames.pickDiamondLeft
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
    name: actionsNames.pickDiamondRight
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
    name: actionsNames.health
  },
  {
    f: config => {
      const { index: playerPos } = findLivingPlayer(config);
      if (playerPos > 0 && isEnemy(config[playerPos - 1])) {
        const cloned = config.clone();
        cloned[playerPos - 1] = _empty;
        return cloned;
      }
      return undefined;
    },
    name: actionsNames.attackLeft
  },
  {
    f: config => {
      const { index: playerPos } = findLivingPlayer(config);
      if (
        playerPos >= 0 &&
          playerPos < config.length - 1 &&
          isEnemy(config[playerPos + 1])
      ) {
        const cloned = config.clone();
        cloned[playerPos + 1] = _empty;
        return cloned;
      }
      return undefined;
    },
    name: actionsNames.attackRight
  }
];

module.exports = { allPossibleMoves, actionsNames };
