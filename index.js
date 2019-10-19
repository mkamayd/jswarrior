const {
  CONSTANTS,
  CELL
}  = require('./constants');

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

print({ CONSTANTS,
  CELL} );

const { allPossibleMoves, actionsNames } = require('./moves');

Array.prototype.clone = function() {
  return this.slice(0);
};

const getHistory = (backMap, winnerConfig) => {
  const solution = [];
  solution.unshift({ moveName: undefined, config: winnerConfig });
  let currentConfig = winnerConfig;
  do {
    const { previousConfig, moveName } = backMap[getHasCode(currentConfig)];
    currentConfig = previousConfig;
    if (moveName) {
      solution.unshift({ moveName, config: currentConfig });
    }
  } while (currentConfig);

  return solution;
};

const applyEnvironment = config => {
  const { index, value } = find(config, CELL.playerMinOnFire + 1, CELL.playerMaxOnFire);
  if (index >= 0) {
    const clone = config.clone();
    const damage = Math.max(value - CONSTANTS.fireDamage, CELL.playerMinOnFire);
    if (damage === CELL.playerMinOnFire) {
      return undefined;
    }
    clone[index] = damage;
    return clone;
  }
  return config;
};

const getMoves = config =>
  allPossibleMoves
    .map(m => ({ config: m.f(config), moveName: m.name }))
    .filter(x => x.config)
    .map(x => ({ config: applyEnvironment(x.config), moveName: x.moveName }))
    .filter(x => x.config);

const findSolution = initialConfig => {
  const queue = [initialConfig];
  const initialHash = getHasCode(initialConfig);
  const backMap = {};
  backMap[initialHash] = {
    previousConfig: undefined,
    moveName: undefined
  };

  while (queue.length) {
    const currentConfig = queue.shift();
    if (isFinalState(currentConfig)) {
      return getHistory(backMap, currentConfig);
    }
    getMoves(currentConfig).forEach(m => {
      const newConfig = m.config;
      const newConfigHasCode = getHasCode(newConfig);
      if (!backMap[newConfigHasCode]) {
        backMap[newConfigHasCode] = {
          previousConfig: currentConfig,
          moveName: m.moveName
        };
        queue.push(newConfig);
      }
    });
  }
  return [];
};

const drawCell = n => {
  if (n > CELL.playerMinOnEmpty && n <= CELL.playerMaxOnEmpty) {
    return '👨‍💼';
  }
  if (n > CELL.playerMinOnFire && n <= CELL.playerMaxOnFire) {
    return '👨‍🚒';
  }
  if (n >= CELL.staticEnemyMin && n <= CELL.staticEnemyMax) {
    return '🧟‍';
  }
  switch (n) {
    case CELL.empty:
      return '🌲';
    case CELL.playerMinOnEmpty:
      return '💀';
    case CELL.playerMinOnFire:
      return '🤬';
    case CELL.exit:
      return '⛩';
    case CELL.diamond:
      return '💎';
    case CELL.fire:
      return '🔥';
    default:
      return `|${n}|`;
  }
};

const drawMove = a => {
  switch (a) {
    case actionsNames.moveLeft:
      return '👈';
    case actionsNames.moveRight:
      return '👉';
    case actionsNames.pickDiamondLeft:
      return '💎👊';
    case actionsNames.pickDiamondRight:
      return '👊💎';
    case actionsNames.health:
      return '🍗';
    case actionsNames.attackLeft:
      return '🤛';
    case actionsNames.attackRight:
      return '🤜';
    default:
      return `move: ${a}`;
  }
};

const drawPosition = (config, move = undefined) => {
  console.log(config.map(drawCell).join('  '));
  const { index: playerPos, value: playerValue } = findLivingPlayer(config);
  if (playerPos >= -1) {
    const toRemove =
      playerValue >= CELL.playerMinOnEmpty && playerValue <= CELL.playerMaxOnEmpty
        ? CELL.playerMinOnEmpty
        : CELL.playerMinOnFire;
    console.log(`❤️  : ${playerValue - toRemove}`);
  }
  if (move) {
    console.log(`move: ${drawMove(move)}`);
  }
};

const wait = (time=1000) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

const problem = [CELL.exit, CELL.diamond, CELL.staticEnemyMax, CELL.playerMinOnEmpty+CONSTANTS.maxHealth] ;
const solution = findSolution(problem);

const render = async solution => {
  for (let i = 0; i < solution.length; i++) {
    await wait();
    //console.clear();
    const { config, moveName } = solution[i];
    drawPosition(config, moveName);
  }
  if (solution.length === 0) {
    console.log('No solutions');
  }
};

render(solution);
