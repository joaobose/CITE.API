const BaseSchedule = require('../../../classes/src/scheduler/BaseSchedule');
const Logger = require('../../../classes/Logger');
const logger = new Logger();

class SecondsSchedule extends BaseSchedule {
  async cronCallback() {
    logger.debug('it is 30 seconds on the clock!');
  }
}

module.exports = SecondsSchedule;
