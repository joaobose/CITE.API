const express = require('express');
const router = express.Router();
const Controller = require('../controllers/gateway.controller');
const JWTMiddleware = require('../middleware/JWT.middleware');
const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

// ---------------- Public routes
fun.group([])([
  // ---------------- IoT service
  fun.get('/iot.service/docs/*', 'gateway'),
  fun.get('/iot.service/public/*', 'gateway'),

  // ---------------- API service
  fun.post('/api.service/auth/login/', 'gateway'),
  fun.get('/api.service/docs/*', 'gateway'),
  fun.get('/api.service/public/*', 'gateway')
]);

// ---------------- Private routes
fun.group([JWTMiddleware])([
  fun.post('/*', 'gateway'),
  fun.get('/*', 'gateway'),
  fun.put('/*', 'gateway'),
  fun.delete('/*', 'gateway')
]);

module.exports = router;
