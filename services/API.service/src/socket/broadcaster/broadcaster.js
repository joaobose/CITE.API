const Broadcaster = require('fun.framework/classes/src/socket/Broadcaster');
const fun = require('fun.framework/functions/src/socket/broadcaster.fun');

const JWTRule = require('./rules/JWT.rule');
const RoleRule = require('./rules/role.rule');

class ApplicationBroadcaster extends Broadcaster {
  channels() {
    return [
      fun.channel('public'),
      fun.channel('board', [new JWTRule(), new RoleRule('board')]),
      fun.channel('member', [new JWTRule(), new RoleRule('member')]),
      fun.channel('applicant', [new JWTRule(), new RoleRule('applicant')])
    ];
  }
}

module.exports = ApplicationBroadcaster;
