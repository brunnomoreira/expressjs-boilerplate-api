const { matchedData, validationResult } = require('express-validator');
const ValidationError = require('../errors/types/ValidationError');

module.exports = async function (req, res, next, rules) {
  for (let rule of rules) {
    await rule.run(req, res, next);
  }

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return matchedData(req, { includeOptionals: true });
  }
  else {
    throw new ValidationError("Check that the data provided is correct.", errors.array());
  }
}