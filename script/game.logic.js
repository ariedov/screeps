const balancer = require('./balancer');

module.exports = {

  harvest(creep) {
    const source = balancer.getSourceForCreep(creep);
    if (source.energy) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    } else if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }
};
