/*
 * Delivers ammo to the tower
 */

 module.exports = {
   run(creep) {
     const towers = creep.room.find(FIND_STRUCTURES, {
       filter(s) {
         return s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity;
       }
     });

     if (towers.length !== 0) {
       if (creep.transfer(towers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
         creep.moveTo(towers[0]);
       }
     }
   },

   isBusy(creep) {
     const towers = creep.room.find(FIND_STRUCTURES, {
       filter(s) {
         return s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity;
       }
     });
     return towers.length > 0;
   }
 };
