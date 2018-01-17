module.exports = {
  run(creep) {
    let target = Game.getObjectById(creep.memory.target);
    if (target) {
      if (shouldBeRepaired(target)) {
        repair(creep, target);
      } else {
        delete creep.memory.target;
      }
    } else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: shouldBeRepaired
      });
      target = creep.pos.findClosestByRange(targets);
      creep.memory.target = target.id;
      repair(creep, target);
    }
  },

  isBusy(creep) {
    const repair = creep.room.find(FIND_STRUCTURES, {
      filter: shouldBeRepaired
    });
    return repair.length;
  }
};

function repair(creep, s) {
  if (creep.repair(s) === ERR_NOT_IN_RANGE) {
    creep.moveTo(s);
  }
}

function shouldBeRepaired(s) {
  let shouldBeRepaired = false;
  if (s.structureType === STRUCTURE_WALL) {
    shouldBeRepaired = s.hits < s.hitsMax / 10000;
  } else if (s.structureType === STRUCTURE_RAMPART) {
    shouldBeRepaired = s.hits < s.hitsMax / 4;
  } else {
    shouldBeRepaired = s.hits < s.hitsMax / 2;
  }
  return shouldBeRepaired;
}
