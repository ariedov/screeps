const gameLogic = require('./game.logic');
const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const roleSeeker = require('./role.seeker');
const roleRecharger = require('./role.recharger');
const roleTower = require('./role.tower');
const roleWarrior = require('./role.warrior');

function clearExpiredCreeps(creep) {
  if (!creep) {
    const role = creep.memory.role;
    Memory.count[role] -= 1;
    delete Memory.creeps[creep.name];
  }
}

module.exports.loop = function () {
  _.each(Memory.creeps, clearExpiredCreeps);

  const towers = Game.spawns.Spawn1.room.find(
    FIND_MY_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_TOWER
      }
    });
  _.each(towers, tower => roleTower.run(tower));

  _.each(Game.creeps, creep => {
    if (creep.memory.role === 'warrior') {
      roleWarrior.run(creep);
    }

    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }

    if (creep.memory.role === 'recharger') {
      if (roleRecharger.isBusy(creep)) {
        roleRecharger.run(creep);
      } else {
        roleHarvester.run(creep);
      }
    }

    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep);
    }

    if (creep.memory.role === 'builder') {
      if (roleBuilder.isBusy(creep)) {
        roleBuilder.run(creep);
      } else {
        roleUpgrader.run(creep);
      }
    }

    if (creep.memory.role === 'seeker') {
      roleSeeker.run(creep);
    }
  });

  gameLogic.updateMemory();
  gameLogic.spawnCreeps();
};
