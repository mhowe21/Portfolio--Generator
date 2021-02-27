const User = require("./User");
const UserContent = require("./UserContent");

User.hasMany(UserContent, {
  foreignKey: "user_id",
});

UserContent.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

module.exports = { User, UserContent };
