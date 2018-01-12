/*
 * Chooses the available source or container to withdaw energy from
 * TODO: implement container withdrawal
 */

const logger = require('./logger');

module.exports = {

  assignToSource(creep) {
    const availableSource = findClosestAvailableSource(creep);
    const source = Memory.sources[availableSource.id];
    source.feedsCount += 1;
    creep.memory.feedsFrom = availableSource.id;
    logger.logCreep(creep, 'feeds from ' + availableSource.id);
    logger.log(availableSource.id + ' is now feeding ' + source.feedsCount + ' creeps');
    return availableSource;
  },

  clearSource(creep) {
    const feedsFrom = creep.memory.feedsFrom;
    Memory.sources[feedsFrom].feedsCount -= 1;
    logger.log(feedsFrom + ' is now feeding ' + Memory.sources[feedsFrom].feedsCount + ' creeps');
  },

  getSourceForCreep(creep) {
    return Game.getObjectById(creep.memory.feedsFrom);
  }
};

const creepsForSource = 4;

function findClosestAvailableSource(creep) {
  const sources = creep.room.find(FIND_SOURCES, {
    filter(s) {
      return s.energy > 0;
    }
  });

  let distance = 10000;
  let result;
  _.each(sources, s => {
    if (Memory.sources === undefined) {
      Memory.sources = {};
    }
    if (Memory.sources[s.id] === undefined) {
      Memory.sources[s.id] = {
        feedsCount: 0
      };
    }

    const rangeTo = creep.pos.getRangeTo(s);
    if (Memory.sources[s.id].feedsCount < creepsForSource && rangeTo < distance) {
      distance = rangeTo;
      result = s;
    }
  });
  return result;
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
