const gameInfo = require('./game.info');
const logger = require('./logger');
const factory = require('./factory');

const chucks = 1;
const rechargers = 2;
const harvesters = 4;
const upgraders = 4;
const builders = 6;

module.exports = {

  manage() {
    const spawn = Game.spawns.Spawn1;
    const roomEnergy = gameInfo.getRoomEnergy(spawn.room);

    if (Memory.count.harvester === 0) {
      if (factory.createWorker(spawn, roomEnergy, 'harvester') === OK) {
        logger.log('creating harvester');
        logPopulation();
        Memory.count.harvester += 1;
      }
    } else if (Memory.count.upgrader === 0) {
      if (factory.createWorker(spawn, roomEnergy, 'upgrader') === OK) {
        logger.log('creating upgrader');
        this.logCreeps();
        Memory.count.upgrader += 1;
      }
    } else if (Memory.count.harvester < harvesters) {
      if (factory.createWorker(spawn, roomEnergy, 'harvester') === OK) {
        logger.log('creating harvester');
        logPopulation();
        Memory.count.harvester += 1;
      }
    } else if (Memory.count.recharger < rechargers) {
      if (factory.createWorker(spawn, roomEnergy, 'recharger') === OK) {
        logger.log('creating recharger');
        logPopulation();
        Memory.count.recharger += 1;
      }
    } else if (Memory.count.chuck < chucks) {
      if (factory.createWorker(spawn, roomEnergy, 'chuck') === OK) {
        logger.log('creating chuck');
        logPopulation();
        Memory.count.chuck += 1;
      }
    } else if (Memory.count.upgrader < upgraders) {
      if (factory.createWorker(spawn, roomEnergy, 'upgrader') === OK) {
        logger.log('creating upgrader');
        logPopulation();
        Memory.count.upgrader += 1;
      }
    } else if (Memory.count.builder < builders) {
      if (factory.createWorker(spawn, roomEnergy, 'builder') === OK) {
        logger.log('creating builder');
        logPopulation();
        Memory.count.builder += 1;
      }
    }
  }
};

function logPopulation() {
  logger.log(
    'upgraders: ' + Memory.count.upgrader +
    ' harvesters: ' + Memory.count.harvester +
    ' rechargers: ' + Memory.count.recharger +
    ' chucks: ' + Memory.count.chuck +
    ' warriors: ' + Memory.count.warrior +
    ' builders: ' + Memory.count.builder
  );
}

// This code is used to create warriors
// } else if (AT_WAR && Memory.count.warrior < 5) {
//   if (spawn.spawnCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK], 'WARRIOR_' + Game.time, {
//     memory: {
//       role: 'warrior',
//       class: 'melee'
//     }
//   }) === OK) {
//     logger.log('creating warrior');
//     this.logCreeps();
//     Memory.count.warrior += 1;
//   }
