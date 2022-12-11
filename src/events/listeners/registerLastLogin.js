const types = require('../types');

const handler = function(user) {
  user.update({ last_login_at: new Date() });
}

module.exports = {
  handler,
  event: types.user.login
}