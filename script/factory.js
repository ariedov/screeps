const logger = require('./logger');

const maxPartsCount = 50;

module.exports = {
  createWorker(spawn, roomCapacity = 0, role = '') {
    const name = role.toUpperCase() + '_' + Game.time;
    const body = getWorkerBodyparts(roomCapacity);
    const result = spawn.spawnCreep(body, {
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

function getWorkerBodyparts(capacity = 0) {
  const bodyparts = [WORK, CARRY, MOVE];
  let cost = BODYPART_COST[WORK] + BODYPART_COST[CARRY] + BODYPART_COST[MOVE];
  const availableEnergy = cost + ((capacity - cost) / 3);
  for (let i = 1, nextPart = bodyparts[0]; cost + BODYPART_COST[nextPart] < availableEnergy && i < maxPartsCount; ++i) {
    bodyparts.push(nextPart);
    cost += BODYPART_COST[nextPart];
    nextPart = bodyparts[i % 3];
  }
  return bodyparts;
}
