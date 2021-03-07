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
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    avatar_image_URI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_URI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_img_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_url_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_img_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_url_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_img_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_url_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_img_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_url_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_img_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_profile_url_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolio_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolio_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolio_github_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolio_linkedin_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolio_aboutme: {
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
