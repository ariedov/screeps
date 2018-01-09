module.exports = {

  run(tower) {
    const enemies = tower.room.find(FIND_HOSTILE_CREEPS);
    if (enemies.length === 0) {
      const creeps = _.filter(Game.creeps, c => {
        return c.hits < c.hitsMax;
      });
      if (creeps.length !== 0) {
        tower.heal(creeps[0]);
      }
    } else {
      tower.attack(enemies[0]);
    }
  }
};
