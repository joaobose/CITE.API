const express = require('express');
const router = express.Router();
const Controller = require('../controllers/auth/auth.controller');
const Validators = require('../controllers/auth/validators');
const fun = require('../../functions/src/routes/routes.fun')(
  router,
  new Controller()
);

fun.http.post('/login', 'login', new Validators.LoginValidator())();

module.exports = router;
