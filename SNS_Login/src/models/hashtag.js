import Sequelize from "sequelize";
import { sequelize } from "./index.js";

export default class Hashtag extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Hashtag",
      tableName: "hashtags",
      charset: "utf8",
      collate: "utf8_general_ci"
    })
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag"});
  }
}