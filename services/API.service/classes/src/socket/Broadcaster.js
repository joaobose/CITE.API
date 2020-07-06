const Logger = require('../../Logger');
const logger = new Logger();
const colors = {
  reset: '\x1b[0m',
  bgBroadcaster: '\u001b[44m'
};

class Broadcaster {
  static io = null;

  set(io) {
    Broadcaster.io = io;
  }

  channels() {
    return [];
  }

  broadcast(to, event, data) {
    if (!Broadcaster.io)
      logger.error(
        colors.bgBroadcaster +
          'BROADCASTER' +
          colors.reset +
          ' Could not broadcast data, io found undefined'
      );

    let exist = R.any((channel) => {
      return channel.name == to;
    }, this.channels());

    if (exist) Broadcaster.io.to(to).emit(event, data);
    else
      logger.error(
        colors.bgBroadcaster +
          'BROADCASTER' +
          colors.reset +
          ' Could not broadcast data, channel ' +
          to +
          ' is not registered'
      );
  }
}

module.exports = Broadcaster;
