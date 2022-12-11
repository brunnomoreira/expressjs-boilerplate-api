module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'access_tokens',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
};