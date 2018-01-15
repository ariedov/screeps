/*
 * Stores energy in the closest spawn or extension in the room
 */
module.exports = {

  run(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter(s) {
        return (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) && s.energy < s.energyCapacity;
      }
    });

    const target = creep.pos.findClosestByPath(targets);
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  },

  isBusy(creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter(s) {
        return (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) && s.energy < s.energyCapacity;
      }
    });

    return targets.length > 0;
  }
};
