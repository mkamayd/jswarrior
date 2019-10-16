//TODO fire should harm you implement applyEnvironment(), if you walk over fire that should stay there,
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

const {allPossibleMoves} = require('./moves');

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
  const { index, value } = find(config, _playerMinOnFire + 1, _playerMaxOnFire);
  if (index >= 0) {
    const clone = config.clone();
    const damage = Math.max(value - _fireDamage, _playerMinOnFire);
    if (damage === _playerMinOnFire) {
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
  if (n > _playerMinOnEmpty && n <= _playerMaxOnEmpty) {
    return "👨";
  }
  if (n > _playerMinOnFire && n <= _playerMaxOnFire) {
    return "😡";
  }
  switch (n) {
    case _empty:
      return "🌲";
    case _playerMinOnEmpty:
      return "💀";
    case _playerMinOnFire:
      return "🤬";
    case _exit:
      return "⛩";
    case _diamond:
      return "💎";
    case _fire:
      return "🔥";
    default:
      return `|${n}|`;
  }
};

const drawPosition = (config, move = undefined) => {
  print(config);
  console.log(config.map(drawCell).join("  "));
  const { index: playerPos, value: playerValue } = findLivingPlayer(config);
  if (playerPos >= -1) {
    const toRemove =
      playerValue >= _playerMinOnEmpty && playerValue <= _playerMaxOnEmpty
        ? _playerMinOnEmpty
        : _playerMinOnFire;
    console.log(`❤️  : ${playerValue - toRemove}`);
    console.log(`❤️  : ${playerValue}`);
    /*
    4  0
    24 20
    25 0
    45 20
    */
  }
  if (move) {
    console.log(move);
  }
};

const wait = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

//const problem = [_exit, _empty, _empty, _diamond, _empty, _empty, _diamond, _empty, _fire, _diamond, _diamond, _playerMinOnEmpty+_maxHealth] ;
const problem = [_exit, _fire, _playerMinOnEmpty + _maxHealth];
const solution = findSolution(problem);
//print(solution);

const render = async solution => {
  for (let i = 0; i < solution.length; i++) {
    await wait();
    //console.clear();
    const { config, moveName } = solution[i];
    drawPosition(config, moveName);
  }
  if (solution.length === 0) {
    console.log("No solutions");
  }
};

render(solution);
