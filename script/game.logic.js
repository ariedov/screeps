const logger = require('./logger');
const gameInfo = require('./game.info');

const AT_WAR = false;

module.exports = {

  harvest(creep) {
    let sources = creep.room.find(FIND_SOURCES, {
      filter(s) {
        return s.energy > 0;
      }
    });
    const containers = creep.room.find(FIND_STRUCTURES, {
      filter(s) {
        return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0;
      }
    });
    sources = sources.concat(containers);
    const source = creep.pos.findClosestByPath(sources);
    if (source) {
      if (source.energy) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      } else if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  },

  harvestClosestSource(creep) {
    const sources = creep.room.find(FIND_SOURCES, {
      filter(s) {
        return s.energy > 0;
      }
    });
    const source = creep.pos.findClosestByPath(sources);
    if (source && source.energy) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  },

  spawnCreeps() {
    const spawn = Game.spawns.Spawn1;

    if (Memory.count.recharger === 0) {
      if (spawn.spawnCreep([WORK, WORK, WORK, CARRY, MOVE], 'RECHARGER_' + Game.time, {
        memory: {
          role: 'recharger'
        }
      }) === OK) {
        logger.log('creating recharger');
        this.logCreeps();
        Memory.count.recharger += 1;
      }
    } else if (Memory.count.upgrader === 0) {
      if (spawn.spawnCreep([WORK, WORK, CARRY, MOVE], 'UPGRADER_' + Game.time, {
        memory: {
          role: 'upgrader'
        }
      }) === OK) {
        logger.log('creating upgrader');
        this.logCreeps();
        Memory.count.upgrader += 1;
      }
    } else if (Memory.count.harvester < 3) {
      if (spawn.spawnCreep([WORK, WORK, CARRY, MOVE], 'HARVESTER_' + Game.time, {
        memory: {
          role: 'harvester'
        }
      }) === OK) {
        logger.log('creating harvester');
        this.logCreeps();
        Memory.count.harvester += 1;
      }
    } else if (Memory.count.upgrader < 4) {
      if (spawn.spawnCreep([WORK, WORK, CARRY, MOVE], 'UPGRADER_' + Game.time, {
        memory: {
          role: 'upgrader'
        }
      }) === OK) {
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
    } else if (spawn.spawnCreep([WORK, CARRY, CARRY, MOVE], 'BUILDER_' + Game.time, {
      memory: {
        role: 'builder'
      }
    }) === OK) {
      logger.log('creating builder');
      this.logCreeps();
      Memory.count.builder += 1;
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
