const winston = require('winston');
const timeFun = require('../functions/general/time.fun');
const env = process.env.NODE_ENV || 'development';

const colors = {
  reset: '\x1b[0m',
  fgCyan: '\x1b[36m',
  fgMagenta: '\x1b[35m',
  fgGreen: '\x1b[32m',
  fgRed: '\x1b[31m'
};

/**
 * Customized Logger.
 *
 * This class is an enhancement of @code{console.log},
 * it provides better logging and also support microservice logging
 *
 * @since      1.0
 * @access     public
 *
 * @constructs Logger
 */
class Logger {
  /**
   * The service logging name
   *
   * @since  1.0
   * @access public
   *
   * @type     {String}
   *
   * @member   {String} name
   * @memberof Logger
   */
  static name = 'server';

  /**
   * The winston logger instance.
   *
   * @since  1.0
   * @access private
   *
   * @type     {winston.Logger}
   *
   * @member   {winston.Logger} logger
   * @memberof Logger
   */
  #logger = undefined;

  /**
   * Logger constructor.
   *
   * Constructs a logger and sets the service logger name if given.
   *
   * @since      1.0
   * @access     public
   *
   * @constructs Logger
   *
   * @param {String} [name] The new service name.
   */
  constructor(name) {
    this.logger = winston.createLogger({ format: winston.format.json() });

    if (env !== 'test') {
      this.logger.add(
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error'
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

  /**
   * Writes a message into the info logging channel.
   *
   * @since      1.0
   * @access     public
   * @memberof   Logger
   *
   * @param {String} message The message to write.
   */
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
      message: message
    });
  }

  /**
   * Writes an error into the error logging channel.
   *
   * @since      1.0
   * @access     public
   * @memberof   Logger
   *
   * @param {String} error The error to write.
   */
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
      message: error
    });
  }
}

module.exports = Logger;
