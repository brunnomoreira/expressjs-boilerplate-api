const jwt = require("jsonwebtoken");
const config = require('../../config');
const { User, AccessToken } = require('../models/index');
const UnauthorizedError = require('../errors/types/UnauthorizedError');

function getTokenFromHeader(req) {
  const authorization = req.get('Authorization');
  if (authorization.split(' ').length > 1 && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }

  return null;
}

module.exports = async function (req, res, next) {
  const token = getTokenFromHeader(req);
  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await User.findOne({ where: { id: decoded.uid } });
      if (user) {
        const accessToken = await AccessToken.findOne({ where: { token } });
        if(accessToken) {
          req.user = user;
          req.accessToken = accessToken;
          return next();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  throw new UnauthorizedError();
}