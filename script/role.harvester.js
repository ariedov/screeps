/*
 * Gets energy from closest source
 * Then stores it in the closest spawn or extension in the room
 */

const logger = require('./logger');
const logic = require('./game.logic');

module.exports = {

  run(creep) {
    const charging = creep.memory.charging;
    if (!charging) {
      if (!logic.harvestClosestSource(creep)) {
        creep.memory.charging = true;
      }
    } else if (creep.carry.energy === 0) {
      creep.memory.charging = false;
    }
    if (charging !== creep.memory.charging) {
      const message = creep.memory.charging ? 'now charging' : 'now feeding';
      logger.logCreep(creep, message);
    }

    if (creep.memory.charging) {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter(s) {
          return (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) && s.energy < s.energyCapacity;
        }
      }).reverse();

      const target = creep.pos.findClosestByPath(targets);
      if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
  }
};
