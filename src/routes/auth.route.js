const express = require('express');
const middlewares = require('../middlewares/index');
const controller = require('../controllers/auth.controller');


const router = express.Router();

router.post('/login', [controller.login]);
router.post('/register', [controller.register]);
router.get('/me', [middlewares.auth, controller.me]);
router.get('/logout', [middlewares.auth, controller.logout]);

module.exports = {
  router,
  prefix: "/auth"
};