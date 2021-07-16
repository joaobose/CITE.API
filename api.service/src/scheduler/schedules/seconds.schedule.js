const BaseSchedule = require('fun.framework/classes/src/scheduler/BaseSchedule');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

class SecondsSchedule extends BaseSchedule {
  async cronCallback() {
    logger.debug('it is 30 seconds on the clock!');
  }
}

module.exports = SecondsSchedule;
