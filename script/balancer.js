/*
 * Chooses the available source or container to withdaw energy from
 */

const gameInfo = require('./game.info');
const memory = require('./memory');
const logger = require('./logger');

module.exports = {

  assignToSource(creep, sourceOnly = false) {
    const availableSource = findClosestAvailableSource(creep, sourceOnly);
    if (availableSource !== undefined) {
      const source = Memory.sources[availableSource.id];
      source.feedsCount += 1;
      creep.memory.feedsFrom = availableSource.id;
      logger.logCreep(creep, 'feeds from ' + availableSource.id);
      logger.log(availableSource.id + ' is now feeding ' + source.feedsCount + ' creeps');
    }
    return availableSource;
  },

  clearSource(creep) {
    memory.clearSource(creep);
  },

  getSourceForCreep(creep) {
    return Game.getObjectById(creep.memory.feedsFrom);
  }
};

function findClosestAvailableSource(creep, sourceOnly = false) {
  let sources = creep.room.find(FIND_SOURCES, {
    filter(s) {
      return s.energy > 0;
    }
  });

  if (!sourceOnly) {
    sources = sources.concat(creep.room.find(FIND_STRUCTURES, {
      filter(s) {
        return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0;
      }
    }));
  }

  sources = _.sortBy(sources, s => {
    return creep.pos.getRangeTo(s);
  });

  if (Memory.sources === undefined) {
    Memory.sources = gameInfo.getSourcesFeedingCreeps();
  }

  let result = _.find(sources, s => {
    if (Memory.sources[s.id] === undefined) {
      Memory.sources[s.id] = {
        feedsCount: 0,
        creepsForSource: getCreepsForSource(s)
      };
    }

    if (!Memory.sources[s.id].creepsForSource) {
      Memory.sources[s.id].creepsForSource = getCreepsForSource(s);
    }

    return Memory.sources[s.id].feedsCount < Memory.sources[s.id].creepsForSource;
  });

  if (result === undefined) {
    result = sources[0];
  }
  return result;
}

function getCreepsForSource(source) {
  let creepsForSource = 1;
  if (source.energy !== undefined) {
    creepsForSource = gameInfo.getWaysToSourceCount(source) + 2;
  }
  return creepsForSource;
}

// Code for harvesting from containers
//
// let sources = creep.room.find(FIND_SOURCES, {
//   filter(s) {
//     return s.energy > 0;
//   }
// });
// const containers = creep.room.find(FIND_STRUCTURES, {
//   filter(s) {
//     return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0;
//   }
// });
// sources = sources.concat(containers);
// const source = creep.pos.findClosestByPath(sources);
// if (source) {
//   if (source.energy) {
//     if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
//       creep.moveTo(source);
//     }
//   } else if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//     creep.moveTo(source);
//   }
// }
