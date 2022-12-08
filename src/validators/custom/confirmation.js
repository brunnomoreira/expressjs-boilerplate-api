module.exports = async (field, value, req) => {
  if (!req.body[field + '_confirmation']) {
    throw new Error(`Required ${field} confirmation`);
  }

  if (value !== req.body[field + '_confirmation']) {
    throw new Error(`Invalid ${field} confirmation`);
  }

  return true;
}