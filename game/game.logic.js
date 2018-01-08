/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('game.logic');
 * mod.thing == 'a thing'; // true
 */

const gameInfo = require('game.info');

const AT_WAR = false;

module.exports = {

  harvest: function(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES, {
        filter: function(s) {
          return s.energy > 0;
        }
      });
      var containers = creep.room.find(FIND_STRUCTURES, {
        filter: function(s) {
          return s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
        }
      });
      sources = sources.concat(containers);
      var source = creep.pos.findClosestByPath(sources);
      if (source) {
        if (source.energy) {
          if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
          }
        } else {
          if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
          }
        }
        return true;
      }
    }
    return false;
  },

  harvestSources: function(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES, {
        filter: function(s) {
          return s.energy > 0;
        }
      });
      var source = creep.pos.findClosestByPath(sources);
      if (source && source.energy) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
      return true;
    } else {
      return false;
    }
  },

  spawnCreeps: function() {
    var spawn = Game.spawns["Spawn1"];

    console.log("upgraders: " + Memory.count.upgrader + " harvesters: " + Memory.count.harvester + " rechargers: " + Memory.count.recharger + " warriors: " + Memory.count.warrior + " builders: " + Memory.count.builder);
    if (Memory.count.upgrader == 0) {
      console.log("upgraders.length == 0");
      console.log("creating upgrader");
      if (spawn.createCreep([WORK, CARRY, MOVE], undefined, {
          role: 'upgrader'
        })) {
        Memory.count['upgrader'] += 1;
      }
    } else if (Memory.count.recharger == 0) {
      console.log("rechargers.length == 0");
      console.log("creating recharger");
      if (spawn.createCreep([WORK, CARRY, MOVE], undefined, {
          role: 'recharger'
        })) {
        Memory.count['recharger'] += 1;
      }
    } else if (Memory.count.harvester < 3) {
      console.log("harvesters.length < 3");
      console.log("creating harvester");
      if (spawn.createCreep([WORK, CARRY, MOVE], undefined, {
          role: 'harvester'
        })) {
        Memory.count['harvester'] += 1;
      }
    } else if (Memory.count.upgrader < 4) {
      console.log("upgraders.length < 4");
      console.log("creating upgrader");
      if (spawn.createCreep([WORK, CARRY, MOVE], undefined, {
          role: 'upgrader'
        })) {
        Memory.count['upgrader'] += 1;
      }
    } else if (AT_WAR && Memory.count.warrior < 5) {
      if (spawn.createCreep([TOUGH, MOVE, ATTACK], undefined, {
          role: 'warrior',
          class: 'melee'
        })) {
        Memory.count['warrior'] += 1;
      }
    } else {
      console.log("creating builder");
      if (spawn.createCreep([WORK, CARRY, MOVE], undefined, {
          role: 'builder'
        })) {
        Memory.count['builder'] += 1;
      }
    }
  },

  updateMemory() {
    if (!Memory.count) {
      Memory.count = {};
    }

    if (!Memory.count.harvester) {
      Memory.count['harvester'] = gameInfo.getHarvesters().length;
    }

    if (!Memory.count.recharger) {
      Memory.count['recharger'] = gameInfo.getRechargers().length;
    }

    if (!Memory.count.upgrader) {
      Memory.count['upgrader'] = gameInfo.getUpgraders().length;
    }

    if (!Memory.count.builder) {
      Memory.count['builder'] = gameInfo.getBuilders().length;
    }

    if (!Memory.count.warrior) {
      Memory.count['warrior'] = gameInfo.getWarriors().length;
    }
  }
};
