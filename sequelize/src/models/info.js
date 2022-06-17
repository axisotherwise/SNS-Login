import Sequelize from "sequelize";
import { sequelize } from "./index.js";

export default class Info extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      gender: {
        type: Sequelize.STRING(3),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "Info",
      tableName: "infos",
      charset: "utf8",
      collate: "utf8_general_ci",
    })
  }
  static associate(db) {
    db.Info.belongsTo(db.User);
  }
}
