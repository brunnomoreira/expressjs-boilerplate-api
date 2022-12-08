const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/index');
const controller = require('../controllers/auth.controller');


router.post('/login', [controller.login]);
router.post('/register', [controller.register]);
router.get('/me', [middlewares.auth, controller.me]);

module.exports = {
  router,
  prefix: "/auth"
};