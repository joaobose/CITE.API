const R = require('ramda');
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

  searchChannel(name) {
    return R.find(R.propEq('name', name))(this.channels());
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

    if (exist) {
      Broadcaster.io.to(to).emit(event, data);
      logger.info(
        colors.bgBroadcaster + 'BROADCASTER' + colors.reset + ' broadcasted:'
      );
      logger.info({
        channel: to,
        event: event,
        data: data
      });
    } else
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
