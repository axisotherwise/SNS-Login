import Sequelize from "sequelize";
import { sequelize } from "./index.js";

export default class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      image1: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      image2: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      image3: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      image4: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Image",
      tableName: "images",
      charset: "utf8",
      collate: "utf8_general_ci",
    })
  }
  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
}