const Logger = require('../../classes/Logger');
const logger = new Logger();

module.exports = (req, res, next) => {
  logger.info('incoming request at route ' + req.originalUrl);
  next();
};
