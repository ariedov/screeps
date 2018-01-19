const logger = require('./logger');

const maxPartsCount = 50;

module.exports = {
  createWorker(spawn, roomCapacity = 0, role = '', justEnough = false) {
    const name = role.toUpperCase() + '_' + Game.time;
    const body = getWorkerBodyparts(roomCapacity, justEnough);
    const result = spawn.spawnCreep(body, name, {
      memory: {
        name,
        role
      }
    });
    if (result === OK) {
      logger.log('creep: ' + name + ' created with body ' + body);
    }
    return result;
  }
};

function getWorkerBodyparts(capacity = 0, justEnough = false) {
  const bodyparts = [WORK, CARRY, MOVE];
  let cost = BODYPART_COST[WORK] + BODYPART_COST[CARRY] + BODYPART_COST[MOVE];
  const availableEnergy = justEnough ? cost : capacity;
  for (let i = 1, nextPart = bodyparts[0]; cost + BODYPART_COST[nextPart] < availableEnergy && i < maxPartsCount; ++i) {
    bodyparts.push(nextPart);
    cost += BODYPART_COST[nextPart];
    nextPart = bodyparts[i % 3];
  }
  return bodyparts;
}
