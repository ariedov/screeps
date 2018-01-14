/*
 * Stores energy in the tower or container
 */

module.exports = {

  run(creep) {
    const containers = creep.room.find(FIND_STRUCTURES, {
      filter(s) {
        return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity;
      }
    });

    if (containers.length !== 0) {
      if (creep.transfer(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(containers[0]);
      }
    }
  },

  isBusy(creep) {
    const containers = creep.room.find(FIND_STRUCTURES, {
      filter(s) {
        return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity;
      }
    });
    return containers.length > 0;
  }
};
