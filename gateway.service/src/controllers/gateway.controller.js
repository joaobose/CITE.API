const BaseController = require('fun.framework/classes/src/BaseController');
const Logger = require('fun.framework/classes/Logger');
const logger = new Logger();

const Errors = require('../errors');

const env = process.env.NODE_ENV || 'development';
const gatewayConfig = require('../../config/services.config.json')[env];

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

class GatewayController extends BaseController {
  constructor() {
    super();

    proxy.on('error', (error, req, res) => {
      if (!req.originalUrl.includes('socket.io')) {
        logger.error(`API gateway disconnected on URL ${req.originalUrl}`);
        logger.error(error);
      }
    });
  }

  async gateway(req, res, validated) {
    // ----------- Get the microservice name
    let [, , microService, ...rest] = req.originalUrl.split('/');

    // ----------- Get the microservice URL
    let redirectUrl = `${gatewayConfig[microService]}/${rest.join('/')}`;

    // ----------- Set secret headers
    req.headers['x-gateway-secret'] = gatewayConfig.authSecret;

    // ----------- Redirect
    if (redirectUrl)
      proxy.web(req, res, {
        target: redirectUrl,
        changeOrigin: true,
        ignorePath: true
      });
    else this.throw(req, res, new Errors.ResourceNotFoundError());
  }
}

module.exports = GatewayController;
