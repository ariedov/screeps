var logic = require('game.logic');

module.exports = {

    run: function(creep) {

        if (!creep.memory.charging) {
            if (!logic.harvestSources(creep)) {
                creep.memory.charging = true;
            }
        } else if (creep.carry.energy == 0) {
            creep.memory.charging = false;
        }

        if (creep.memory.charging) {
            var targets = creep.room.find(FIND_STRUCTURES, { filter : function (s) {
               return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity;
            }}).reverse();

            var target = creep.pos.findClosestByPath(targets);
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};
