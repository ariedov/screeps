const gameInfo = require('./game.info');
const population = require('./population');
const balancer = require('./balancer');

module.exports = {

  harvest(creep) {
    const source = balancer.getSourceForCreep(creep);
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  },

  spawnCreeps() {
    population.manage();
  },

  updateMemory() {
    if (!Memory.count) {
      Memory.count = {};
    }

    if (!Memory.count.harvester) {
      Memory.count.harvester = gameInfo.getHarvesters().length;
    }

    if (!Memory.count.recharger) {
      Memory.count.recharger = gameInfo.getRechargers().length;
    }

    if (!Memory.count.upgrader) {
      Memory.count.upgrader = gameInfo.getUpgraders().length;
    }

    if (!Memory.count.builder) {
      Memory.count.builder = gameInfo.getBuilders().length;
    }

    if (!Memory.count.warrior) {
      Memory.count.warrior = gameInfo.getWarriors().length;
    }
  }
};
