require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.post("/api/ask", async (req, res) => {
  const userQuestion = req.body.question;

  if (!userQuestion) {
    return res.status(400).json({ error: "No question provided." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: `You are a helpful legal assistant specializing in Indian law. 
Your job is to explain legal concepts, rights, and procedures in simple, 
plain language that any ordinary person in India can understand.

Rules:
- Always use simple, clear language. Avoid heavy legal jargon.
- Focus on Indian laws, courts, and procedures.
- If a question is outside your scope or needs a real lawyer, say so clearly.
- Always end your response with: "Note: This is general legal information, not legal advice. Please consult a qualified lawyer for your specific situation."`,
        messages: [
          { role: "user", content: userQuestion }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.json({ answer: data.content[0].text });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

app.listen(3000, () => {
  console.log("Legal-Ease server running at http://localhost:3000");
});