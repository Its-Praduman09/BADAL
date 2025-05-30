"use strict";

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const routes = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const initRoutes = async () => {
  const routeFiles = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  });

  for (const file of routeFiles) {
    const module = await import(`./${file}`);
    const routeObject = module?.default;
    if (routeObject && typeof routeObject === "function") {
      const RN = file.split(".")[0];
      routes.use(`/${RN}`, routeObject);
    }
  }
};

await initRoutes();

export default routes;
