const logger = require('./logger');

module.exports = {
  supervise(creep, feed, work) {
    if (creep.carry.energy === 0) {
      creep.memory.working = false;
      logger.logCreep(creep, 'now feeding');
    }
    if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
      logger.logCreep(creep, 'now working');
    }

    if (creep.memory.working) {
      work(creep);
    } else {
      feed(creep);
    }
  }
};
