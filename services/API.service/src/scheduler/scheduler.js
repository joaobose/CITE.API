const Scheduler = require('../../classes/src/scheduler/Scheduler');
const fun = require('../../functions/src/scheduler/scheduler.fun');
const BroadcastSchedule = require('./schedules/broadcast.schedule');
const MinuteSchedule = require('./schedules/minute.schedule');
const SecondsSchedule = require('./schedules/seconds.schedule');

class ApplicationScheduler extends Scheduler {
  schedules() {
    return [
      fun.schedule(BroadcastSchedule, 'broadcast', {
        timeout: 500,
        interval: 15000
      }),
      fun.schedule(MinuteSchedule, 'minuteCron', {
        cron: '*/1 * * * *'
      }),
      fun.schedule(SecondsSchedule, 'secondsCron', {
        cron: '30 * * * * *'
      })
    ];
  }
}

module.exports = ApplicationScheduler;
