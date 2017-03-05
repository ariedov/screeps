var gameInfo = require('game.info');
var gameLogic = require('game.logic');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSeeker = require('role.seeker');
var roleRecharger = require('role.recharger');
var roleTower = require('role.tower');
var roleWarrior = require('role.warrior');

module.exports.loop = function() {

    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            var role = Memory.creeps[i].role;
            Memory.count[role] -= 1;
            delete Memory.creeps[i];
        }
    }

    var towers = Game.spawns["Spawn1"].room.find(
             FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    towers.forEach(tower => roleTower.run(tower));

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'warrior') {
            roleWarrior.run(creep);
        }

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }

        if (creep.memory.role == 'recharger') {
            if (roleRecharger.isBusy(creep)) {
                roleRecharger.run(creep);
            } else {
                roleHarvester.run(creep);
            }
        }

        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }

        if (creep.memory.role == 'builder') {
            if (roleBuilder.isBusy(creep)) {
                roleBuilder.run(creep);
            } else {
                roleUpgrader.run(creep);
            }
        }

        if (creep.memory.role == 'seeker') {
            roleSeeker.run(creep);
        }
    }

    gameLogic.spawnCreeps();
}
