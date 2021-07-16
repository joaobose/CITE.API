const express = require('express');
const router = express.Router();
const SecretMiddleware = require('../middleware/secret.middleware');
const Controller = require('../controllers/auth.controller');
const Validators = require('../validators/auth');

const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.group([SecretMiddleware])([
  fun.post('/login', 'login', new Validators.LoginValidator()),
  fun.get('/token/:token', 'checkToken', new Validators.CheckTokenValidator())
]);

module.exports = router;
