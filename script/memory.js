const gameInfo = require('./game.info');
const logger = require('./logger');

module.exports = {

  incrementHarvester() {
    initCount();

    if (Memory.count.harvester) {
      Memory.count.harvester += 1;
    } else {
      Memory.count.harvester = gameInfo.getHarvesters().length;
    }
  },

  incrementRecharger() {
    initCount();

    if (Memory.count.recharger) {
      Memory.count.recharger += 1;
    } else {
      Memory.count.recharger = gameInfo.getRechargers().length;
    }
  },

  incrementChuck() {
    initCount();

    if (Memory.count.chuck) {
      Memory.count.recharger += 1;
    } else {
      Memory.count.chuck = gameInfo.getChucks().length;
    }
  },

  incrementUpgrader() {
    initCount();

    if (Memory.count.upgrader) {
      Memory.count.upgrader += 1;
    } else {
      Memory.count.upgrader = gameInfo.getUpgraders().length;
    }
  },

  incrementBuilder() {
    initCount();

    if (Memory.count.builder) {
      Memory.count.builder += 1;
    } else {
      Memory.count.builder = gameInfo.getBuilders().length;
    }
  },

  incrementFixer() {
    initCount();

    if (Memory.count.fixer) {
      Memory.count.fixer += 1;
    } else {
      Memory.count.fixer = gameInfo.getFixers().length;
    }
  },

  incrementWarrior() {
    initCount();

    if (Memory.count.warrior) {
      Memory.count.warrior += 1;
    } else {
      Memory.count.warrior = gameInfo.getWarriors().length;
    }
  },

  getCreepsCount() {
    var count = Memory.count;
    if (count === undefined) {
     count = {};
    }
    
    return {
      harvesters: count.harvester || 0,
      rechargers: count.recharger || 0,
      upgraders: count.upgrader || 0,
      chucks: count.chuck || 0,
      builders: count.builder || 0,
      fixers: count.fixer || 0,
      warrior: count.warrior || 0
    };
  },

  clearSource(creep) {
    const feedsFrom = Memory.creeps[creep.name].feedsFrom;
    if (feedsFrom) {
      Memory.sources[feedsFrom].feedsCount -= 1;
      logger.log(feedsFrom + ' is now feeding ' + Memory.sources[feedsFrom].feedsCount + ' creeps');
      delete Memory.creeps[creep.name].feedsFrom;
    }
  },

  clearCreepData(creep) {
    if (creep.name) {
      this.clearSource(creep);

      const role = Memory.creeps[creep.name].role;
      Memory.count[role] -= 1;
      delete Memory.creeps[creep.name];
    }
  }
};

function initCount() {
  if (!Memory.count) {
    Memory.count = {};
  }
}
