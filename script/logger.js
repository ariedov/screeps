module.exports = {
  logCreep(creep, message = '') {
    creep.say(message);
    console.log(creep.name + ' ' + message);
  },

  log(message = '') {
    console.log(message);
  }
};
