const database = require('../../models/index');

module.exports = async (model, field, value) => {
  const user = await database[model].findOne({where: { [field]: value }});
  if(user === null) {
    throw new Error('Value not found');
  }

  return true;
}