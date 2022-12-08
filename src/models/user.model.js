module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'User',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email_verified_at: {
        type: Sequelize.DATE,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      hooks: {
        afterCreate: (user, options) => {
          //defaultScope not working in model creation :(
          delete user.dataValues.password;
        }
      }
    }
  );
};