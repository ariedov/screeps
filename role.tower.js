
module.exports = {

    run: function(tower) {
        var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length) {
            tower.attack(enemies[0]);
        } else {
            var creeps = _.filter(Game.creeps, function(c) { return c.hits < c.hitsMax });
            if (creeps.length) {
                tower.heal(creeps[0]);
            }
        }
    }
};
