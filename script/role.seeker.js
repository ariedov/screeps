
module.exports = {

  run(creep) {
    const flag = Game.flags.RoomFlag;
    const room = Game.rooms.W29N81;
    if (room) {
      const targets = room.find(FIND_HOSTILE_CONSTRUCTION_SITES);
      if (targets.length === 0) {
        creep.suicide();
      } else {
        creep.moveTo(targets[0]);
      }
    } else {
      creep.moveTo(flag);
    }
  }
};
