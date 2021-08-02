const express = require('express');
const router = express.Router();
const Controller = require('../controllers/gateway.controller');
const JWTMiddleware = require('../middleware/JWT.middleware');
const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

//---------------- Available services
const APIService = require('../services/api.service');
const IOTService = require('../services/iot.service');

const apiService = new APIService();
const iotService = new IOTService();

const services = [apiService, iotService];
const gateway = fun.gateway();

//---------------- Public routes
fun.group([])([
  fun.get('/public/devices/connected', 'publicConnected'),
  gateway(services)(['/docs/*', '/public/*'])(['get']),
  gateway([apiService])(['/auth/login'])(['post'])
]);

//---------------- Private routes
gateway(services)(['/*'])(fun.methods)([JWTMiddleware]);

module.exports = router;
