const logic = require('./game.logic');

module.exports = {

  run(creep) {
    if (!creep.memory.charging) {
      if (!logic.harvestSources(creep)) {
        creep.memory.charging = true;
      }
    } else if (creep.carry.energy === 0) {
      creep.memory.charging = false;
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
