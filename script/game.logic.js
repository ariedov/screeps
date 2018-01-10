const gameInfo = require('./game.info');

const AT_WAR = false;

module.exports = {

  harvest(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
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
        return true;
      }
    }
    return false;
  },

  harvestClosestSource(creep) {
    let ableToHarvest = false;
    if (creep.carry.energy < creep.carryCapacity) {
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
      ableToHarvest = true;
    }
    return ableToHarvest;
  },

  spawnCreeps() {
    const spawn = Game.spawns.Spawn1;

    console.log('upgraders: ' + Memory.count.upgrader + ' harvesters: ' + Memory.count.harvester + ' rechargers: ' + Memory.count.recharger + ' warriors: ' + Memory.count.warrior + ' builders: ' + Memory.count.builder);
    if (Memory.count.recharger === 0) {
      console.log('rechargers.length == 0');
      if (spawn.spawnCreep([WORK, CARRY, MOVE], 'RECHARGER_' + Game.time, {
        memory: {
          role: 'recharger'
        }
      }) === OK) {
        console.log('creating recharger');
        Memory.count.recharger += 1;
      }
    } else if (Memory.count.upgrader === 0) {
      console.log('upgraders.length == 0');
      if (spawn.spawnCreep([WORK, CARRY, MOVE], 'UPGRADER_' + Game.time, {
        memory: {
          role: 'upgrader'
        }
      }) === OK) {
        console.log('creating upgrader');
        Memory.count.upgrader += 1;
      }
    } else if (Memory.count.harvester < 3) {
      console.log('harvesters.length < 3');
      if (spawn.spawnCreep([WORK, CARRY, MOVE], 'HARVESTER_' + Game.time, {
        memory: {
          role: 'harvester'
        }
      }) === OK) {
        console.log('creating harvester');
        Memory.count.harvester += 1;
      } else {
        console.log('cannot create harvester');
      }
    } else if (Memory.count.upgrader < 4) {
      console.log('upgraders.length < 4');
      if (spawn.spawnCreep([WORK, CARRY, MOVE], 'UPGRADER_' + Game.time, {
        memory: {
          role: 'upgrader'
        }
      }) === OK) {
        console.log('creating upgrader');
        Memory.count.upgrader += 1;
      }
    } else if (AT_WAR && Memory.count.warrior < 5) {
      if (spawn.spawnCreep([TOUGH, MOVE, ATTACK], 'WARRIOR_' + Game.time, {
        memory: {
          role: 'warrior',
          class: 'melee'
        }
      }) === OK) {
        Memory.count.warrior += 1;
      }
    } else {
      console.log('creating builder');
      if (spawn.spawnCreep([WORK, CARRY, MOVE], 'BUILDER_' + Game.time, {
        memory: {
          role: 'builder'
        }
      }) === OK) {
        Memory.count.builder += 1;
      }
    }
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
