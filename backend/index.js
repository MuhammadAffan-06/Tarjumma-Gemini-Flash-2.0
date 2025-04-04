const express = require("express");
const app = express();
require("dotenv").config();
const genAI = require("./gemini");
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "https://tarjumma.vercel.app/"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.listen(process.env.PORT, () => {
  console.log(`server is up and running at localhost:${process.env.PORT}`);
});
// CORS configuration

app.get("/health-check", (req, res) => {
  res.json("working");
});
app.post("/api/translate", async (req, res) => {
  try {
    const { sourceLang, targetLang, transcript } = req.body;
    console.log("Request Body:", req.body);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Translate the following word or a sentence from the source language ${sourceLang} to target language ${targetLang}:
    The sentence or word which needs to be translated is ${transcript}. I don't want any explanation at all, just the translation `;
    const result = await model.generateContent(prompt);
    console.log(
      "Result:",
      result.response.candidates[0].content.parts[0].text.replace("\n", "")
    );
    res
      .status(200)
      .json(
        result.response.candidates[0].content.parts[0].text.replace("\n", "")
      );
  } catch (error) {
    res.status(500).json({ error: "Network Error", details: error.message });
    console.error(error);
  }
});
