/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.seeker');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

  run(creep) {
    const flag = Game.flags.RoomFlag;

    let targets = creep.room.find(FIND_HOSTILE_CREEPS);
    let target = creep.pos.findClosestByPath(targets);
    if (target) {
      if (creep.attack(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    } else {
      targets = creep.room.find(FIND_HOSTILE_STRUCTURES, {
        filter(s) {
          return s.structureType !== STRUCTURE_CONTROLLER;
        }
      });
      target = creep.pos.findClosestByPath(targets);
      if (target) {
        if (creep.attack(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      } else if (creep.room.name === 'W29N81') {
        targets = creep.room.find(FIND_STRUCTURES, {
          filter(s) {
            return s.structureType === STRUCTURE_WALL;
          }
        });
        target = creep.pos.findClosestByPath(targets);
        if (target) {
          if (creep.attack(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      } else {
        creep.moveTo(flag);
      }
    }
  }
};
