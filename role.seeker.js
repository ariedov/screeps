/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.seeker');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run: function(creep) {
        var flag = Game.flags["RoomFlag"];
        var room = Game.rooms["W29N81"];
        if (room) {
            var targets = room.find(FIND_HOSTILE_CONSTRUCTION_SITES);
            if (targets.length) {
                creep.moveTo(targets[0]);
            } else {
                creep.suicide();
            }
        } else {
            creep.moveTo(flag);
        }


    }
};
