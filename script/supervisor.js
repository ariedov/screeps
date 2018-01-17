const logger = require('./logger');
const balancer = require('./balancer');
const gameLogic = require('./game.logic');

module.exports = {
  supervise(creep, work, sourceOnly = false) {
    const working = creep.memory.working || creep.memory.working === undefined;
    if (working && creep.carry.energy === 0) {
      if (balancer.assignToSource(creep, sourceOnly)) {
        creep.memory.working = false;
        logger.logCreep(creep, 'now feeding');
      }
    }
    if (!working && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
      logger.logCreep(creep, 'now working');
      balancer.clearSource(creep);
    }

    if (creep.memory.working) {
      work(creep);
    } else {
      gameLogic.harvest(creep);
    }
  }
};
