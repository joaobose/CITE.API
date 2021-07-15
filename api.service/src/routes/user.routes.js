const express = require('express');
const router = express.Router();
const JWTMiddleware = require('../middleware/JWT.middleware');
const RoleMiddleware = require('../middleware/role.middleware');
const Controller = require('../controllers/user.controller');
const Validators = require('../validators/user');

const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.group([JWTMiddleware])([
  fun.rest(Validators.RestValidators),
  fun.get('/:id/role', 'role', new Validators.RestValidators.show()),
  fun.get('/:id/with', 'showWith', new Validators.showWith()),

  fun.subgroup([RoleMiddleware('board')])([
    fun.post('/announcement', 'announcement', new Validators.announcement())
  ])
]);

module.exports = router;
