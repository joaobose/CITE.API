const Logger = require('../Logger');
const logger = new Logger();

class BaseRule {
  name = 'BaseRule';

  async eval(data) {
    try {
      let body = await this.body(data);
      if (await this.debug()) {
        logger.debug(this.name + ' body evaluation returned: ');
        logger.debug(body);
      }

      let result = await this.predicate(body);
      if (await this.debug())
        logger.debug(this.name + ' evaluation returned ' + result);

      return result;
    } catch (e) {
      if (await this.debug()) {
        logger.debug('Exeption raised while evaluating ' + this.name);
        logger.debug(e);
        logger.debug(this.name + ' evaluation returned false');
      }
      return false;
    }
  }

  async body(data) {
    return data;
  }

  async predicate(body) {
    return true;
  }

  async debug() {
    return false;
  }
}

module.exports = BaseRule;
