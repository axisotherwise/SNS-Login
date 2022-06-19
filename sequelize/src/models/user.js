import Sequelize from "sequelize";
import { sequelize } from "./index.js"; 

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(70),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      snsId: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: "local",
      },
      resetToken: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      resetTokenExpiration: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "User",
      tableName: "users",
      charset: "utf8",
      collate: "utf8_general_ci",
    })
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasOne(db.Info);
  }
}