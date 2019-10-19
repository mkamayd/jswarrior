const {
  _maxHealth,
  _staticEnemyMaxHealth,
  _plusHealthRest,
  _fireDamage,
  CELL,
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
            cloned[playerPos - 1] === CELL.empty || cloned[playerPos - 1] === CELL.exit;
        cloned[playerPos] =
            playerValue > CELL.playerMinOnEmpty && playerValue <= CELL.playerMaxOnEmpty
              ? CELL.empty
              : CELL.fire;
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
            cloned[playerPos + 1] === CELL.empty || cloned[playerPos + 1] === CELL.fire;
        cloned[playerPos] =
            playerValue > CELL.playerMinOnEmpty && playerValue <= CELL.playerMaxOnEmpty
              ? CELL.empty
              : CELL.fire;
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
      if (playerPos > 0 && config[playerPos - 1] === CELL.diamond) {
        const cloned = config.clone();
        cloned[playerPos - 1] = CELL.empty;
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
          config[playerPos + 1] === CELL.diamond
      ) {
        const cloned = config.clone();
        cloned[playerPos + 1] = CELL.empty;
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
        (playerValue !== CELL.playerMaxOnEmpty || playerValue !== CELL.playerMaxOnFire)
      ) {
        const cloned = config.clone();
        const inEmpty =
          playerValue > CELL.playerMinOnEmpty && playerValue < CELL.playerMaxOnEmpty;
        cloned[playerPos] = Math.min(
          playerValue + _plusHealthRest,
          inEmpty ? CELL.playerMaxOnEmpty : CELL.playerMaxOnFire
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
        cloned[playerPos - 1] = CELL.empty;
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
        cloned[playerPos + 1] = CELL.empty;
        return cloned;
      }
      return undefined;
    },
    name: actionsNames.attackRight
  }
];

module.exports = { allPossibleMoves, actionsNames };
