const logic = require('./game.logic');

module.exports = {

  run(creep) {
    if (!creep.memory.building) {
      if (!logic.harvest(creep)) {
        creep.memory.building = true;
      }
    } else if (creep.carry.energy === 0) {
      creep.memory.building = false;
    }

    if (creep.memory.building) {
      let target = Game.getObjectById(creep.memory.target);
      if (target) {
        if (target.structureType) {
          if (shouldBeRepaired(target)) {
            this.repair(creep, target);
          } else {
            creep.memory.target = undefined;
          }
        } else {
          this.build(creep, target);
        }
      } else {
        creep.memory.target = undefined;
      }

      if (!creep.memory.target) {
        let targets = creep.room.find(FIND_STRUCTURES, {
          filter: shouldBeRepaired
        });
        if (targets.length === 0) {
          targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
          if (targets.length !== 0) {
            target = creep.pos.findClosestByRange(targets);
            creep.memory.target = target.id;
            this.build(creep, target);
          }
        } else {
          target = creep.pos.findClosestByRange(targets);
          creep.memory.target = target.id;
          this.repair(creep, target);
        }
      }
    }
  },

  isBusy(creep) {
    const repair = creep.room.find(FIND_STRUCTURES, {
      filter: shouldBeRepaired
    });
    const build = creep.room.find(FIND_MY_CONSTRUCTION_SITES);

    return creep.memory.target || repair.length || build.length;
  },

  build(creep, s) {
    if (creep.build(s) === ERR_NOT_IN_RANGE) {
      creep.moveTo(s);
    }
  },

  repair(creep, s) {
    if (creep.repair(s) === ERR_NOT_IN_RANGE) {
      creep.moveTo(s);
    }
  }
};

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
