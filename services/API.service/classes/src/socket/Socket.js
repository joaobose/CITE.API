const R = require('ramda');
const autoBind = require('auto-bind');
const Logger = require('../../Logger');
const logger = new Logger();
const colors = {
  reset: '\x1b[0m',
  bgBroadcaster: '\u001b[44m'
};

class Socket {
  constructor(io, broadcaster, catcher) {
    autoBind(this);

    this.broadcaster = broadcaster;
    // this.catcher = catcher;
    this.io = io;

    this.setup();
    this.broadcaster.set(io);
    // this.catcher.set(io);
  }

  setup() {
    this.io.on('connection', (socket) => {
      logger.info('Socket ' + socket.id + ' has connected to server');
      socket.on('subscribe-client', (data) => {
        this.setupBroadcaster(socket, data);
      });

      socket.on('disconnect', () => {
        logger.info('Socket ' + socket.id + ' has disconnected from server');
      });
    });
  }

  setupBroadcaster(socket, data) {
    R.forEach(async (channel) => {
      let evaluations = R.map((rule) => rule.eval(data), channel.rules);
      let results = await Promise.all(evaluations);
      let canJoin = R.reduce(R.and, true, results);

      if (canJoin) {
        socket.join(channel.name);
        logger.info(
          colors.bgBroadcaster +
            'BROADCASTER' +
            colors.reset +
            ' Socket ' +
            socket.id +
            ' is joining ' +
            channel.name +
            ' channel'
        );
      }
    }, this.broadcaster.channels());
  }
}

module.exports = Socket;
