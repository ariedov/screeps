const logger = require('./logger');

module.exports = {
  createWorker(spawn, roomEnergy = 0, role = '') {
    const name = role.toUpperCase() + '_' + Game.time;
    const body = getWorkerBodyparts(roomEnergy);
    logger.log('creep: ' + name + ' created with body ' + body + '. energy:' + roomEnergy);
    return spawn.spawnCreep(body, name, {
      memory: {
        name,
        role
      }
    });
  }
};

function getWorkerBodyparts(totalEnergy = 0) {
  const partsToAdd = [WORK, CARRY, MOVE];
  const bodyparts = partsToAdd;
  let cost = BODYPART_COST[WORK] + BODYPART_COST[CARRY] + BODYPART_COST[MOVE];
  for (let i = 1, nextPart = partsToAdd[0]; cost + BODYPART_COST[nextPart] < totalEnergy; ++i) {
    bodyparts.push(nextPart);
    cost += BODYPART_COST[nextPart];
    nextPart = partsToAdd[i % partsToAdd.length];
  }
  return bodyparts;
}
