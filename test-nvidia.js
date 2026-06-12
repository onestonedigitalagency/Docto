  const { OpenAI } = require("openai");

const apiKey = "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";
const baseURL = "https://integrate.api.nvidia.com/v1";
const model = "google/gemma-2-9b-it";

async function run() {
  try {
    const openai = new OpenAI({ apiKey, baseURL });
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: "Hello!" }],
      temperature: 0.2,
      max_tokens: 100
    });
    console.log("Success:", response.choices[0].message.content);
  } catch (err) {
    console.error("Error calling Nvidia API:", err);
  }
}

run();
