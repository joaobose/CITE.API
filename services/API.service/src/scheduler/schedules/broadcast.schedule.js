const BaseSchedule = require('../../../classes/src/scheduler/BaseSchedule');
const Broadcaster = require('../../socket/broadcaster/broadcaster');
const Logger = require('../../../classes/Logger');
const logger = new Logger();

class BroadcastSchedule extends BaseSchedule {
  async timeoutCallback() {
    logger.info('staring to broadcast events periodicaly!');
  }

  async intervalCallback() {
    let broadcaster = new Broadcaster();
    broadcaster.broadcast('public', 'reminder', {
      message: 'Windows sucks as OS!'
    });
    broadcaster.broadcast('board', 'reminder', {
      message: 'Using Windows is a bad example to our applicants!'
    });
  }
}

module.exports = BroadcastSchedule;
