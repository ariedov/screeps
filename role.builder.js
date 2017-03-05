var logic = require('game.logic');

module.exports = {

    run: function(creep) {

        if (!creep.memory.building) {
            if (!logic.harvest(creep)) {
                creep.memory.building = true;
            }
        } else if (creep.carry.energy == 0) {
            creep.memory.building = false;
        }

        if (creep.memory.building) {
            var target = Game.getObjectById(creep.memory.target);
            if (target) {
                if (target.structureType) {
                    if (shouldBeRepaired(target)) {
                        this.repair(creep, target);
                    } else {
                        creep.memory.target = undefined;
                    }
                } else {
                    this.build(creep, target);
                }
            } else {
                creep.memory.target = undefined;
            }

            if (!creep.memory.target) {
                var targets = creep.room.find(FIND_STRUCTURES, { filter: shouldBeRepaired });
                if (targets.length) {
                    target = creep.pos.findClosestByRange(targets);
                    creep.memory.target = target.id;
                    this.repair(creep, target);
                } else {
                    targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
                    if (targets.length) {
                        target = creep.pos.findClosestByRange(targets);
                        creep.memory.target = target.id;
                        this.build(creep, target);
                    }
                }
            }
        }
    },

    isBusy: function(creep) {
        var repair = creep.room.find(FIND_STRUCTURES, { filter: shouldBeRepaired});
        var build = creep.room.find(FIND_MY_CONSTRUCTION_SITES);

        return creep.memory.target || repair.length || build.length;
    },

    build: function(creep, s) {
        if (creep.build(s) == ERR_NOT_IN_RANGE) {
            creep.moveTo(s);
        }
    },

    repair: function(creep, s) {
        if (creep.repair(s) == ERR_NOT_IN_RANGE) {
            creep.moveTo(s);
        }
    }
};

function shouldBeRepaired(s) {
    if (s.structureType == STRUCTURE_WALL) {
        return s.hits < s.hitsMax / 10000;
    } else if (s.structureType == STRUCTURE_RAMPART) {
        return s.hits < s.hitsMax / 4;
    } else {
        return s.hits < s.hitsMax / 2;
    }
}
