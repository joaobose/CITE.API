const express = require('express');
const router = express.Router();
const SecretMiddleware = require('../middleware/secret.middleware');
const Controller = require('../controllers/online-wifi-device.controller');

const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.group([SecretMiddleware])([fun.get('/connected', 'connected')]);

module.exports = router;
