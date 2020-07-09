const cronValidator = require('cron-validator');
const Logger = require('../../Logger');
const logger = new Logger();

class BaseSchedule {
  constructor(name, { cron, timeout, interval }) {
    this.name = name ? name : 'BaseSchedule';
    this.cron = this.validateCronPattern(cron);
    this.timeout = this.validateTimeout(timeout);
    this.interval = this.validateInterval(interval);
  }

  async cronCallback() {}

  async intervalCallback() {}

  async timeoutCallback() {}

  validateCronPattern(cron) {
    if (!cron) return null;

    // warn if invalid
    if (!cronValidator.isValidCron(cron, { seconds: true })) {
      logger.error(
        'Found invalid cron value for ' +
          this.name +
          ', cronjob will never be executed'
      );
      return null;
    }
    return cron;
  }

  validateTimeout(timeout) {
    if (!timeout) return null;

    // warn if invalid
    if (isNaN(timeout)) {
      logger.error(
        'Found NaN timeout for ' +
          this.name +
          ', timeout will never be executed'
      );
      return null;
    }
    return timeout;
  }

  validateInterval(interval) {
    if (!interval) return null;

    // warn if invalid
    if (isNaN(interval)) {
      logger.error(
        'Found NaN interval for ' +
          this.name +
          ', interval will never be executed'
      );
      return null;
    }
    return interval;
  }
}

module.exports = BaseSchedule;
