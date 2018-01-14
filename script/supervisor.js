const logger = require('./logger');
const balancer = require('./balancer');

module.exports = {
  supervise(creep, feed, work) {
    const working = creep.memory.working || creep.memory.working === undefined;
    if (working && creep.carry.energy === 0) {
      const sourceOnly = creep.memory.role === 'recharger' || creep.memory.role === 'chuck';
      if (balancer.assignToSource(creep, sourceOnly) !== undefined) {
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
      feed(creep);
    }
  }
};
