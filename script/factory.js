const logger = require('./logger');

const maxPartsCount = 50;

module.exports = {
  createWorker(spawn, roomEnergy = 0, role = '') {
    const name = role.toUpperCase() + '_' + Game.time;
    const body = getWorkerBodyparts(roomEnergy);
    const result = spawn.spawnCreep(body, name, {
      memory: {
        name,
        role
      }
    });
    if (result === OK) {
      logger.log('creep: ' + name + ' created with body ' + body + '. energy:' + roomEnergy);
    }
    return result;
  }
};

function getWorkerBodyparts(totalEnergy = 0) {
  const partsToAdd = [WORK, CARRY, MOVE];
  const bodyparts = partsToAdd;
  let cost = BODYPART_COST[WORK] + BODYPART_COST[CARRY] + BODYPART_COST[MOVE];
  for (let i = 1, nextPart = partsToAdd[0]; cost + BODYPART_COST[nextPart] < totalEnergy && i < maxPartsCount; ++i) {
    bodyparts.push(nextPart);
    cost += BODYPART_COST[nextPart];
    nextPart = partsToAdd[i % partsToAdd.length];
  }
  return bodyparts;
}
