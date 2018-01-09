/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('game.info');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

  getTotalEnergy: function () {
    let totalEnergy = 0;

    for (const r in Game.rooms) {
      var room = Game.rooms[r];
      totalEnergy += this.getRoomEnergy(room);
    }

    return totalEnergy;
  },

  getRoomEnergy: function(room) {
    return _.sum(room.find(FIND_MY_STRUCTURES), function(s) {
      if (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) {
        return s.energy;
      } else {
        return 0;
      }
    });
  },

  getHarvesters: function() {
    return _.filter(Game.creeps, function(c) {
      return c.memory.role == 'harvester';
    });
  },

  getUpgraders: function() {
    return _.filter(Game.creeps, function(c) {
      return c.memory.role == 'upgrader';
    });
  },

  getRechargers: function() {
    return _.filter(Game.creeps, function(c) {
      return c.memory.role == 'recharger';
    });
  },

  getBuilders: function() {
    return _.filter(Game.creeps, function(c) {
      return c.memory.role == 'builder';
    });
  },

  getWarriors: function() {
    return _.filter(Game.creeps, function(c) {
      return c.memory.role == 'warrior';
    });
  }
};
