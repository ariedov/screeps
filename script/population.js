const logger = require('./logger');
const factory = require('./factory');
const memory = require('./memory');

const chucks = 1;
const rechargers = 2;
const harvesters = 4;
const upgraders = 4;
const builders = 6;

module.exports = {

  manage(spawn, roomCapacity) {
    const count = memory.getCreepsCount();

    if (count.harvesters === 0) {
      if (factory.createWorker(spawn, roomCapacity, 'harvester') === OK) {
        logger.log('creating harvester');
        logPopulation();
        memory.incrementHarvester();
      }
    } else if (count.upgraders === 0) {
      if (factory.createWorker(spawn, roomCapacity, 'upgrader') === OK) {
        logger.log('creating upgrader');
        logPopulation();
        memory.incrementUpgrader();
      }
    } else if (count.harvesters < harvesters) {
      if (factory.createWorker(spawn, roomCapacity, 'harvester') === OK) {
        logger.log('creating harvester');
        logPopulation();
        memory.incrementHarvester();
      }
    } else if (count.rechargers < rechargers) {
      if (factory.createWorker(spawn, roomCapacity, 'recharger') === OK) {
        logger.log('creating recharger');
        logPopulation();
        memory.incrementRecharger();
      }
    } else if (count.chucks < chucks) {
      if (factory.createWorker(spawn, roomCapacity, 'chuck') === OK) {
        logger.log('creating chuck');
        logPopulation();
        memory.incrementChuck();
      }
    } else if (count.upgraders < upgraders) {
      if (factory.createWorker(spawn, roomCapacity, 'upgrader') === OK) {
        logger.log('creating upgrader');
        logPopulation();
        memory.incrementUpgrader();
      }
    } else if (count.builders < builders) {
      if (factory.createWorker(spawn, roomCapacity, 'builder') === OK) {
        logger.log('creating builder');
        logPopulation();
        memory.incrementBuilder();
      }
    }
  }
};

function logPopulation() {
  const count = memory.getCreepsCount();
  logger.log(
    'upgraders: ' + count.upgraders +
    ' harvesters: ' + count.harvesters +
    ' rechargers: ' + count.rechargers +
    ' chucks: ' + count.chucks +
    ' warriors: ' + count.chucks +
    ' builders: ' + count.builders
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
