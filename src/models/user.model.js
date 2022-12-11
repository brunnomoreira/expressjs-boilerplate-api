module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email_verified_at: {
        type: DataTypes.DATE,
      },
      last_login_at: {
        type: DataTypes.DATE,
      },
      password: {
        type: DataTypes.STRING,
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

  User.associate = function(models) {
    User.hasMany(models.AccessToken, {
      foreignKey: 'user_id',
      as: 'accessTokens'
    });
  }

  return User;
};