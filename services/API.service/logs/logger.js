const winston = require('winston');
const timeFun = require('../src/functions/general.fun/time.fun');
const env = process.env.NODE_ENV || 'development';

const colors = {
  reset: '\x1b[0m',
  fgCyan: '\x1b[36m',
  fgMagenta: '\x1b[35m',
  fgGreen: '\x1b[32m',
  fgRed: '\x1b[31m',
};

// ------------------ logger singleton ------------------- //
class Logger {
  static name = 'server';
  #logger = undefined;

  constructor(name) {
    this.logger = winston.createLogger({ format: winston.format.json() });

    if (env !== 'test') {
      this.logger.add(
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        })
      );

      this.logger.add(
        new winston.transports.File({ filename: 'logs/combined.log' })
      );
    }

    if (name != undefined) {
      Logger.name = name;
    }
  }

  info(message) {
    if (env == 'test') return;

    console.log(
      colors.fgMagenta +
        timeFun.datetime() +
        colors.reset +
        ' - ' +
        colors.fgCyan +
        Logger.name +
        colors.reset +
        ' - ' +
        colors.fgGreen +
        'INFO' +
        colors.reset +
        ':',
      message
    );
    this.logger.info({
      timestamp: timeFun.datetime(),
      message: message,
    });
  }

  error(error) {
    if (env == 'test') return;

    console.error(
      colors.fgMagenta +
        timeFun.datetime() +
        colors.reset +
        ' - ' +
        colors.fgCyan +
        Logger.name +
        colors.reset +
        ' - ' +
        colors.fgRed +
        'ERROR' +
        colors.reset +
        ':',
      error
    );
    this.logger.error({
      timestamp: timeFun.datetime(),
      message: error,
    });
  }
}

module.exports = Logger;
