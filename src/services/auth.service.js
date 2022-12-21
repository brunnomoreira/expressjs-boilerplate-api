const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const config = require('../../config');
const events = require('../events');
const ValidationError = require('../errors/types/ValidationError');

class AuthService {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(data) {
    const user = await User.unscoped().findOne({ where: { email: data.email } });

    if (user && bcrypt.compareSync(data.password, user.password)) {
      return await this.#responseWithToken(user);
    }

    throw new ValidationError("Invalid credentials");
  }

  async register(data) {
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password, parseInt(config.auth.passwordSaltRounds))
    });
    
    events.emitter.emit(events.types.user.registered, user);

    return await this.#responseWithToken(user);
  }

  async #responseWithToken(user) {
    const accessToken = jwt.sign({
      uid: user.id
    }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });

    await user.createAccessToken({ token: accessToken });

    delete user.dataValues.password;
    
    events.emitter.emit(events.types.user.login, user);

    return {
      user,
      accessToken
    }
  }
}

const service = new AuthService();

module.exports = service;