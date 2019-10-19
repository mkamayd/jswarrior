//world data
const CONSTANTS = {
  maxHealth: 20, //CELL.maxHealth>=0 to be always true
  staticEnemyMaxHealth: 19,
  plusHealthRest: 5,
  fireDamage: 1
};


//cells
const CELL = {
  empty: 0 //multiple (value 0);
};

CELL.exit = CELL.empty + 1; //only one (value 1)
CELL.diamond = CELL.exit + 1; //(value 2)
CELL.fire = CELL.diamond + 1; //(value 3)
CELL.playerMinOnEmpty = CELL.fire + 1; //only one 4->0 24->20 //(value 4)
CELL.playerMaxOnEmpty = CELL.playerMinOnEmpty + CONSTANTS.maxHealth;
CELL.playerMinOnFire = CELL.playerMaxOnEmpty + 1; //only one 25->0 45->20
CELL.playerMaxOnFire = CELL.playerMinOnFire + CONSTANTS.maxHealth;
CELL.staticEnemyMin = CELL.playerMaxOnFire + 1;//min is 1 as 0 is empty
CELL.staticEnemyMax = CELL.playerMaxOnFire + CONSTANTS.staticEnemyMaxHealth;

//cells total value
CONSTANTS.numObjects = CELL.staticEnemyMax;

module.exports = {
  CONSTANTS,
  CELL
};
