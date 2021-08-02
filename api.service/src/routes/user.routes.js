const express = require('express');
const router = express.Router();
const RoleMiddleware = require('../middleware/role.middleware');
const SecretMiddleware = require('../middleware/secret.middleware');
const Controller = require('../controllers/user.controller');
const Validators = require('../validators/user');

const fun = require('fun.framework/functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.group([SecretMiddleware])([
  fun.rest(Validators.RestValidators, ['index', 'show']),

  fun.subgroup([RoleMiddleware('board')])([
    fun.rest(Validators.RestValidators, ['destroy', 'store', 'update']),
    fun.post('/announcement', 'announcement', new Validators.announcement())
  ]),

  fun.get('/:id/role', 'role', new Validators.RestValidators.show()),
  fun.get('/:id/with', 'showWith', new Validators.showWith())
]);

module.exports = router;
