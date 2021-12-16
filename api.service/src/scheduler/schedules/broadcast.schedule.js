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
    broadcaster.broadcast('users', 'reminder', {
      message: 'Windows sucks as OS! This is a brodcast to all users'
    });
    broadcaster.broadcast('board', 'reminder', {
      message: 'Using Windows is a bad example to our applicants!'
    });
    broadcaster.broadcast(
      'users',
      'reminder',
      {
        message: 'You are Ricardo'
      },
      '2'
    );
    broadcaster.broadcast(
      'users',
      'reminder',
      {
        message: 'You are Joao'
      },
      '1'
    );
  }
}

module.exports = BroadcastSchedule;
