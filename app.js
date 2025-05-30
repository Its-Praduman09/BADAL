import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import db from "./src/models/index.js";
import routes from "./src/routes/index.js";
app.use(express.json());
app.use("/api", routes);
app.listen(process.env.DB_PORT, () => {
  console.log(`Server is running on port ${process.env.DB_PORT}`);
});
