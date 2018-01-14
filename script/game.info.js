/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('game.info');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

  getTotalEnergy() {
    let totalEnergy = 0;

    _.each(Game.rooms, r => {
      const room = Game.rooms[r];
      totalEnergy += this.getRoomEnergy(room);
    });
    return totalEnergy;
  },

  getRoomEnergy(room) {
    return room.energyAvailable;
  },

  getHarvesters() {
    return _.filter(Game.creeps, c => {
      return c.memory.role === 'harvester';
    });
  },

  getUpgraders() {
    return _.filter(Game.creeps, c => {
      return c.memory.role === 'upgrader';
    });
  },

  getRechargers() {
    return _.filter(Game.creeps, c => {
      return c.memory.role === 'recharger';
    });
  },

  getChucks() {
    return _.filter(Game.creeps, c => {
      return c.memory.role === 'chuck';
    });
  },

  getBuilders() {
    return _.filter(Game.creeps, c => {
      return c.memory.role === 'builder';
    });
  },

  getWarriors() {
    return _.filter(Game.creeps, c => {
      return c.memory.role === 'warrior';
    });
  },

  getSourcesFeedingCreeps() {
    const sources = {};
    _.each(Game.creeps, c => {
      const feedsFrom = c.memory.feedsFrom;
      if (sources[feedsFrom] === undefined) {
        sources[feedsFrom] = {
          feedsCount: 0
        };
      }
      sources[feedsFrom].feedsCount += 1;
    });
    return sources;
  }
};
