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
      const towers = creep.room.find(FIND_STRUCTURES, {
        filter(s) {
          return s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity;
        }
      });
      const containers = creep.room.find(FIND_STRUCTURES, {
        filter(s) {
          return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity;
        }
      });

      if (towers.length !== 0) {
        if (creep.transfer(towers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(towers[0]);
        }
      } else if (containers.length !== 0) {
        if (creep.transfer(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(containers[0]);
        }
      }
    }
  },

  isBusy(creep) {
    const towers = creep.room.find(FIND_STRUCTURES, {
      filter(s) {
        return s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity;
      }
    });
    const containers = creep.room.find(FIND_STRUCTURES, {
      filter(s) {
        return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity;
      }
    });
    return towers.length + containers.length > 0;
  }
};
