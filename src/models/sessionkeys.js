"use strict";

export default (sequelize, DataTypes) => {
  const SessionKeys = sequelize.define(
    "SessionKeys",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      session_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      public_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      private_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      paranoid: false,
      tableName: "sessionkeys",
    }
  );
  return SessionKeys;
};
