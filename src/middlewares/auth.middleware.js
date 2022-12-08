const jwt = require("jsonwebtoken");
const config = require('../../config');
const { User } = require('../models/index');
const UnauthorizedError = require('../errors/types/UnauthorizedError');

module.exports = async function (req, res, next) {
  const authorization = req.get('Authorization');
  if (authorization.split(' ').length > 1 && authorization.split(' ')[0] === 'Bearer') {
    try {
      const decoded = jwt.verify(authorization.split(' ')[1], config.jwt.secret);
      const user = await User.findOne({ where: { id: decoded.uid } });
      if (user) {
        req.user = user;
        return next();

      }
    } catch (err) {
      console.log(err);
    }
  }

  throw new UnauthorizedError();
}