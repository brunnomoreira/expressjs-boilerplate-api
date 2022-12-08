const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const config = require('../../config');
const ValidationError = require('../errors/types/ValidationError');

class AuthService {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(data) {
    const user = await User.unscoped().findOne({ where: { email: data.email } });

    if (user && bcrypt.compareSync(data.password, user.password)) {
      return this.#responseWithToken(user);
    }

    throw new ValidationError("Invalid credentials");
  }

  async register(data) {
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password, parseInt(config.auth.passwordSaltRounds))
    });

    return this.#responseWithToken(user);
  }

  #responseWithToken(user) {
    const accessToken = jwt.sign({
      uid: user.id
    }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });

    delete user.dataValues.password;

    return {
      user,
      accessToken
    }
  }
}

const service = new AuthService();

module.exports = service;