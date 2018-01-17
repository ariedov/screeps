module.exports = {

  run(creep) {
    let target = Game.getObjectById(creep.memory.target);
    if (target) {
      if (target.structureType) {
        build(creep, target);
      } else {
        delete creep.memory.target;
      }
    } else {
      const targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
      if (targets.length !== 0) {
        target = creep.pos.findClosestByRange(targets);
        creep.memory.target = target.id;
        build(creep, target);
      }
    }
  },

  isBusy(creep) {
    const build = creep.room.find(FIND_MY_CONSTRUCTION_SITES);

    return creep.memory.target || build.length;
  }
};

function build(creep, s) {
  if (creep.build(s) === ERR_NOT_IN_RANGE) {
    creep.moveTo(s);
  }
}
