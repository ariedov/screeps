const logger = require('./logger');
const balancer = require('./balancer');

module.exports = {
  supervise(creep, feed, work) {
    const working = creep.memory.working || creep.memory.working === undefined;
    if (working && creep.carry.energy === 0) {
      if (balancer.assignToSource(creep) !== undefined) {
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
      feed(creep, creep.memory.role === 'recharger');
    }
  }
};
