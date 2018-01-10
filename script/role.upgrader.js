const logger = require('./logger');
const logic = require('./game.logic');

module.exports = {
  run(creep) {
    const upgrading = creep.memory.upgrading;
    if (!upgrading) {
      if (!logic.harvest(creep)) {
        creep.memory.upgrading = true;
      }
    } else if (creep.carry.energy === 0) {
      creep.memory.upgrading = false;
    }
    if (upgrading !== creep.memory.upgrading) {
      const message = creep.memory.upgrading ? 'now upgrading' : 'now feeding';
      logger.logCreep(message);
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  }
};
