const BaseCommand = require('./BaseCommand');
const EnvUtils = require('../../src/utils/env.util');

class GenerateJWTSecret extends BaseCommand {
  name() {
    return 'jwt-secret';
  }

  description() {
    return 'Generate new JWT secret';
  }

  execute() {
    const token = require('crypto').randomBytes(256).toString('base64');
    EnvUtils.setEnvValue('JWT_SECRET', token);
    console.info(token);
  }
}

const instance = new GenerateJWTSecret();

module.exports = instance;