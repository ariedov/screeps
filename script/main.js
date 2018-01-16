const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const roleSeeker = require('./role.seeker');
const roleRecharger = require('./role.recharger');
const roleChuck = require('./role.chuck');
const roleTower = require('./role.tower');
const roleWarrior = require('./role.warrior');
const supervisor = require('./supervisor');
const planner = require('./planner');
const population = require('./population');
const memory = require('./memory');

function deleteIfExpired(creep) {
  if (!Game.creeps[creep.name]) {
    memory.clearCreepData(creep);
  }
}

module.exports.loop = function () {
  _.each(Memory.creeps, deleteIfExpired);
  planner.placeConstructionSites();

  const spawn = Game.spawns.Spawn1;
  const room = spawn.room;
  const towers = room.find(
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
      if (roleHarvester.isBusy(creep)) {
        supervisor.supervise(creep, roleHarvester.run);
      } else if (roleRecharger.isBusy(creep)) {
        supervisor.supervise(creep, roleRecharger.run, true);
      } else {
        supervisor.supervise(creep, roleUpgrader.run);
      }
    }

    if (creep.memory.role === 'recharger') {
      if (roleRecharger.isBusy(creep)) {
        supervisor.supervise(creep, roleRecharger.run, true);
      } else {
        supervisor.supervise(creep, roleHarvester.run);
      }
    }

    if (creep.memory.role === 'chuck') {
      if (roleChuck.isBusy(creep)) {
        supervisor.supervise(creep, roleChuck.run);
      } else if (roleRecharger.isBusy(creep)) {
        supervisor.supervise(creep, roleRecharger.run, true);
      } else {
        supervisor.supervise(creep, roleHarvester.run);
      }
    }

    if (creep.memory.role === 'upgrader') {
      supervisor.supervise(creep, roleUpgrader.run);
    }

    if (creep.memory.role === 'builder') {
      if (roleBuilder.isBusy(creep)) {
        supervisor.supervise(creep, roleBuilder.run);
      } else {
        supervisor.supervise(creep, roleUpgrader.run);
      }
    }

    if (creep.memory.role === 'seeker') {
      roleSeeker.run(creep);
    }
  });

  population.manage(spawn, room.energyCapacityAvailable);
};
