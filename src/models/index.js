"use strict";

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import Sequelize from "sequelize";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const dbconfig = config[env];

const sequelize = new Sequelize(
  dbconfig.database,
  dbconfig.username,
  dbconfig.password,
  dbconfig
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const basename = path.basename(__filename);

const modelFiles = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});

for (const file of modelFiles) {
  const fileUrl = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(fileUrl);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}
Object.values(db).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(db);
  }
});

export default db;
