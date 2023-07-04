import express from "express";
import path from "path";
import logger from "morgan";
import * as dotenv from "dotenv";
dotenv.config();

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["AZURE_OPENAI_KEY"];
const deploymentId = process.env["CHATGPT_MODEL"];
const prompt = ["Code for me a for loop from 1 to 5 in python"];
const app = express();

app.use(logger("dev"));
app.use(express.json());

app.get("/api", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

async function main() {
  try {
    if (azureApiKey && endpoint && deploymentId) {
      const client = new OpenAIClient(
        endpoint,
        new AzureKeyCredential(azureApiKey)
      );
      const result = await client.getCompletions(deploymentId, prompt);

      console.log(result);
      for (const choice of result.choices) {
        console.log(choice.text);
      }
    }
  } catch (err) {
    console.error("An error is encountered:", err);
  }
}

main();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`  App running in port ${PORT}`);
});
