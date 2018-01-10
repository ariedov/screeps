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

    _.each(Game.rooms, (r => {
      const room = Game.rooms[r];
      totalEnergy += this.getRoomEnergy(room);
    });
    return totalEnergy;
  },

  getRoomEnergy(room) {
    return _.sum(room.find(FIND_MY_STRUCTURES), s => {
      let energy = 0;
      if (s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN) {
        energy = s.energy;
      }
      return energy;
    });
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

  getBuilders() {
    return _.filter(Game.creeps, c => {
      return c.memory.role === 'builder';
    });
  },

  getWarriors() {
    return _.filter(Game.creeps, c => {
      return c.memory.role === 'warrior';
    });
  }
};
