const express = require('express');
const router = express.Router();
const Controller = require('../controllers/auth.controller');
const Validators = require('../validators/auth');
const fun = require('../../functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.post('/login', 'login', new Validators.LoginValidator())();

module.exports = router;
