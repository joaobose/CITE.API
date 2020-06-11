const express = require('express');
const router = express.Router();
const JWTMiddleware = require('../middleware/JWT.middleware');
const Controller = require('../controllers/user/user.controller');
const Validators = require('../controllers/user/validators');
const fun = require('../../functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.group([JWTMiddleware])([fun.rest(Validators.RestValidators)]);

module.exports = router;
