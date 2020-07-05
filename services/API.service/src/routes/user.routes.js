const express = require('express');
const router = express.Router();
const JWTMiddleware = require('../middleware/JWT.middleware');
const Controller = require('../controllers/user.controller');
const Validators = require('../validators/user');
const fun = require('../../functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.group([JWTMiddleware])([
  fun.rest(Validators.RestValidators),
  fun.get('/:id/role', 'role', new Validators.RestValidators.show())
]);

module.exports = router;
