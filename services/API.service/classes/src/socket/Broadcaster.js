const Logger = require('../../Logger');
const logger = new Logger();

class Broadcaster {
  static io = null;

  set(io) {
    Broadcaster.io = io;
  }

  channels() {
    return [];
  }

  broadcast(to, data) {
    if (!Broadcaster.io)
      logger.error('Could not broadcast data, io found undefined');

    let exist = R.any((channel) => {
      return channel.name == to;
    }, this.channels());

    if (exist) Broadcaster.io.to(to).emit(data);
    else
      logger.error(
        'Could not broadcast data, channel ' + to + ' is not registered'
      );
  }
}

module.exports = Broadcaster;
