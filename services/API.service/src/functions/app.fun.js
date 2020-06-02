/**
 * Parses the main process arguments to obtain app related parameter.
 *
 * @param {NodeJS.Process} process The application main process.
 *
 * @returns {Object} The application arguments.
 */
let parseArgs = (process) => {
  let args = process.argv.slice(2);
  return { name: args[0], port: args[1] };
};

/**
 * Starts the given server.
 *
 * @param {NodeJS.http.Server} server    The http server to start.
 * @param {String}             name      The server name.
 * @param {String}             port      The server port.
 * @param {Logger}             [logger]  The application logging object.
 */
let start = (server, name, port, logger) => {
  if (port != undefined) {
    server.listen(port, () => {
      if (logger != undefined) {
        logger.info(name + ' service started in port ' + port);
      } else {
        console.info(name + ' service started in port ' + port);
      }
    });
  }
};

module.exports.parseArgs = parseArgs;
module.exports.start = start;
