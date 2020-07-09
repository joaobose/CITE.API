const BaseSchedule = require('../../../classes/src/scheduler/BaseSchedule');
const Logger = require('../../../classes/Logger');
const logger = new Logger();

class MinuteSchedule extends BaseSchedule {
  async cronCallback() {
    logger.debug('a minute has passed on the clock!');
  }
}

module.exports = MinuteSchedule;
