const gameLogic = require('./game.logic');
const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const roleSeeker = require('./role.seeker');
const roleRecharger = require('./role.recharger');
const roleChuck = require('./role.chuck');
const roleTower = require('./role.tower');
const roleWarrior = require('./role.warrior');
const supervisor = require('./supervisor');
const balancer = require('./balancer');
const planner = require('./planner');

function deleteIfExpired(creep) {
  if (!Game.creeps[creep.name]) {
    balancer.clearSource(creep);
    const role = Memory.creeps[creep.name].role;
    Memory.count[role] -= 1;
    delete Memory.creeps[creep.name];
  }
}

module.exports.loop = function () {
  _.each(Memory.creeps, deleteIfExpired);
  planner.placeConstructionSites();

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
      supervisor.supervise(creep, gameLogic.harvest, roleHarvester.run);
    }

    if (creep.memory.role === 'recharger') {
      if (roleRecharger.isBusy(creep)) {
        supervisor.supervise(creep, gameLogic.harvest, roleRecharger.run);
      } else {
        supervisor.supervise(creep, gameLogic.harvest, roleHarvester.run);
      }
    }

    if (creep.memory.role === 'chuck') {
      if (roleChuck.isBusy(creep)) {
        supervisor.supervise(creep, gameLogic.harvest, roleChuck.run);
      } else if (roleRecharger.isBusy(creep)) {
        supervisor.supervise(creep, gameLogic.harvest, roleRecharger.run);
      } else {
        supervisor.supervise(creep, gameLogic.harvest, roleHarvester.run);
      }
    }

    if (creep.memory.role === 'upgrader') {
      supervisor.supervise(creep, gameLogic.harvest, roleUpgrader.run);
    }

    if (creep.memory.role === 'builder') {
      if (roleBuilder.isBusy(creep)) {
        supervisor.supervise(creep, gameLogic.harvest, roleBuilder.run);
      } else {
        supervisor.supervise(creep, gameLogic.harvest, roleUpgrader.run);
      }
    }

    if (creep.memory.role === 'seeker') {
      roleSeeker.run(creep);
    }
  });

  gameLogic.updateMemory();
  gameLogic.spawnCreeps();
};
