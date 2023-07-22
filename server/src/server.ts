import express from "express";
import path from "path";
import logger from "morgan";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, "client/dist")));

// Handle all other routes and serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`  App running in port ${PORT}`);
});
