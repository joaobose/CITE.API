const R = require('ramda');
const CronJob = require('cron').CronJob;
const Logger = require('../../Logger');
const logger = new Logger();
const colors = {
  reset: '\x1b[0m',
  bfScheduler: '\u001b[34;1m',
  bfSchedule: '\u001b[36;1m',
  bfMethod: '\u001b[35;1m'
};

class Scheduler {
  schedules() {
    return [];
  }

  start() {
    R.forEach((schedule) => {
      this.scheduleTimeout(schedule);
      this.scheduleInterval(schedule);
      this.scheduleCron(schedule);
    }, this.schedules());
  }

  scheduleInterval(schedule) {
    if (!schedule.interval) return;

    setInterval(() => {
      logger.info(
        colors.bfScheduler +
          'SCHEDULER' +
          colors.reset +
          ' Executing ' +
          colors.bfSchedule +
          schedule.name +
          colors.reset +
          ' scheduled' +
          colors.bfMethod +
          ' interval' +
          colors.reset +
          ' callback'
      );
      schedule.intervalCallback();
    }, schedule.interval);
  }

  scheduleCron(schedule) {
    if (!schedule.cron) return;

    let job = new CronJob(schedule.cron, () => {
      logger.info(
        colors.bfScheduler +
          'SCHEDULER' +
          colors.reset +
          ' Executing ' +
          colors.bfSchedule +
          schedule.name +
          colors.reset +
          ' scheduled' +
          colors.bfMethod +
          ' cronjob' +
          colors.reset +
          ' callback'
      );
      schedule.cronCallback();
    });
    job.start();
  }

  scheduleTimeout(schedule) {
    if (!schedule.timeout) return;

    setTimeout(() => {
      logger.info(
        colors.bfScheduler +
          'SCHEDULER' +
          colors.reset +
          ' Executing ' +
          colors.bfSchedule +
          schedule.name +
          colors.reset +
          ' scheduled' +
          colors.bfMethod +
          ' timeout' +
          colors.reset +
          ' callback'
      );
      schedule.timeoutCallback();
    }, schedule.timeout);
  }
}

module.exports = Scheduler;
