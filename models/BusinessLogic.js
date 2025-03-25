const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const BusinessLogic = sequelize.define(
  "BusinessLogic",
  {
    Id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Logic: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    RejectId: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    CreationTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("GETDATE")
    }
  },
  {
    tableName: "BusinessLogic",
    indexes: [
      {
        unique: true,
        fields: ["RejectId"]
      }
    ],
    timestamps: false,
    // createdAt: "CreationTime",
    updatedAt: false
  }
);

module.exports = BusinessLogic;
