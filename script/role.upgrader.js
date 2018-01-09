const logic = require('./game.logic');

module.exports = {

  run(creep) {

    if (!creep.memory.upgrading) {
      if (!logic.harvest(creep)) {
        creep.memory.upgrading = true;
      }
    } else if (creep.carry.energy == 0) {
      creep.memory.upgrading = false;
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  }
};
