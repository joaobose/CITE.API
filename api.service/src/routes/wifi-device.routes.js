const express = require('express');
const router = express.Router();
const SecretMiddleware = require('../middleware/secret.middleware');
const Controller = require('../controllers/wifi-device.controller');
const Validators = require('../validators/wifi-device');

const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.group([SecretMiddleware])([
  fun.get('/', 'index', new Validators.RestValidators.index())
]);

module.exports = router;
