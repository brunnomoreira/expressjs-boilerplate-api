const service = require('../services/auth.service');
const { validate, auth: validator } = require('../validators/index');

class AuthController {
  constructor(service) {
    this.service = service;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.me = this.me.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req, res, next) {
    const data = await validate(req, res, next, validator.login);
    const response = await this.service.login(data);
    res.send(response);
  }

  async register(req, res, next) {
    const data = await validate(req, res, next, validator.register);
    const response = await this.service.register(data);
    res.send(response);
  }

  async me(req, res, next) {
    res.send(req.user);
  }

  async logout(req, res, next) {
    await req.accessToken.destroy();
    res.send();
  }
}

const controller = new AuthController(service);

module.exports = controller;