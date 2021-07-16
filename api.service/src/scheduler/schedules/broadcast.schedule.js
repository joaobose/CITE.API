const BaseSchedule = require('fun.framework/classes/src/scheduler/BaseSchedule');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const Broadcaster = require('../../socket/broadcaster/broadcaster');

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
