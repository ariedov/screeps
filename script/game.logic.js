const logger = require('./logger');
const factory = require('./factory');
const gameInfo = require('./game.info');
const balancer = require('./balancer');

const AT_WAR = false;

module.exports = {

  harvest(creep) {
    const source = balancer.getSourceForCreep(creep);
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  },

  spawnCreeps() {
    const spawn = Game.spawns.Spawn1;
    const roomEnergy = gameInfo.getRoomEnergy(spawn.room);

    if (Memory.count.recharger === 0) {
      if (factory.createWorker(spawn, roomEnergy, 'recharger') === OK) {
        logger.log('creating recharger');
        this.logCreeps();
        Memory.count.recharger += 1;
      }
    } else if (Memory.count.upgrader === 0) {
      if (factory.createWorker(spawn, roomEnergy, 'upgrader') === OK) {
        logger.log('creating upgrader');
        this.logCreeps();
        Memory.count.upgrader += 1;
      }
    } else if (Memory.count.harvester < 3) {
      if (factory.createWorker(spawn, roomEnergy, 'harvester') === OK) {
        logger.log('creating harvester');
        this.logCreeps();
        Memory.count.harvester += 1;
      }
    } else if (Memory.count.upgrader < 4) {
      if (factory.createWorker(spawn, roomEnergy, 'upgrader') === OK) {
        logger.log('creating upgrader');
        this.logCreeps();
        Memory.count.upgrader += 1;
      }
    } else if (AT_WAR && Memory.count.warrior < 5) {
      if (spawn.spawnCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK], 'WARRIOR_' + Game.time, {
        memory: {
          role: 'warrior',
          class: 'melee'
        }
      }) === OK) {
        logger.log('creating warrior');
        this.logCreeps();
        Memory.count.warrior += 1;
      }
    } else if (Memory.count.builder < 8) {
      if (factory.createWorker(spawn, roomEnergy, 'builder') === OK) {
        logger.log('creating builder');
        this.logCreeps();
        Memory.count.builder += 1;
      }
    }
  },

  logCreeps() {
    logger.log('upgraders: ' + Memory.count.upgrader + ' harvesters: ' + Memory.count.harvester + ' rechargers: ' + Memory.count.recharger + ' warriors: ' + Memory.count.warrior + ' builders: ' + Memory.count.builder);
  },

  updateMemory() {
    if (!Memory.count) {
      Memory.count = {};
    }

    if (!Memory.count.harvester) {
      Memory.count.harvester = gameInfo.getHarvesters().length;
    }

    if (!Memory.count.recharger) {
      Memory.count.recharger = gameInfo.getRechargers().length;
    }

    if (!Memory.count.upgrader) {
      Memory.count.upgrader = gameInfo.getUpgraders().length;
    }

    if (!Memory.count.builder) {
      Memory.count.builder = gameInfo.getBuilders().length;
    }

    if (!Memory.count.warrior) {
      Memory.count.warrior = gameInfo.getWarriors().length;
    }
  }
};
