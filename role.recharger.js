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
            var towers = creep.room.find(FIND_STRUCTURES, { filter : function (s) {
               return s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity;
            }});
            var containers = creep.room.find(FIND_STRUCTURES, { filter: function(s) {
                return s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity;
            }});

            if (towers.length) {
                if (creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0]);
                }
            } else if (containers.length) {
                if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
        }
    },

    isBusy: function(creep) {
        var towers = creep.room.find(FIND_STRUCTURES, { filter : function (s) {
               return s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity;
            }});
        var containers = creep.room.find(FIND_STRUCTURES, { filter : function (s) {
               return s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity;
            }});
        return towers.length + containers.length > 0;
    }
};
