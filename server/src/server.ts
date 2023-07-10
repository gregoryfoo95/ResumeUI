import express from "express";
import path from "path";
import logger from "morgan";
import * as dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(logger("dev"));
app.use(express.json());

app.get("/api", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`  App running in port ${PORT}`);
});
