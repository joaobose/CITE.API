const R = require('ramda');
const autoBind = require('auto-bind');

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
      socket.on('subscribe-client', (data) => {
        this.setupBroadcaster(socket, data);
      });
    });
  }

  setupBroadcaster(socket, data) {
    R.forEach(async (channel) => {
      let evaluations = R.map((rule) => rule.eval(data), channel.rules);
      let results = await Promise.all(evaluations);
      let canJoin = R.reduce(R.and, true, results);

      if (canJoin) socket.join(channel.name);
    }, this.broadcaster.channels());
  }
}

module.exports = Socket;
