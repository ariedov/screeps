const EXTENSION = 'EXT';

module.exports = {
  placeConstructionSites() {
    const flags = Game.flags;
    _.each(flags, f => {
      if (f.name.startsWith(EXTENSION)) {
        if (f.pos.createConstructionSite(STRUCTURE_EXTENSION) === OK) {
          f.remove();
        }
      }
    });
  }
};
