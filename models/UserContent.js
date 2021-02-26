const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserContent extends Model {}

UserContent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      references: {
        model: "user",
        key: "id",
      },
    },
    avatar_image_URI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_URI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "UserContent",
  }
);

module.exports = UserContent;
