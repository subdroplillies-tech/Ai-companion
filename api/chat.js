import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Initialize OpenAI API client
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,  // Make sure your API key is set in the environment variables
    });

    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",  // Choose the OpenAI model
        prompt: message,
        max_tokens: 150,
        temperature: 0.7,
      });

      const reply = response.data.choices[0].text.trim();

      // Send back the generated response
      res.status(200).json({ reply });
    } catch (error) {
      console.error("Error from OpenAI:", error);
      res.status(500).json({ error: "Failed to fetch response from OpenAI" });
    }
  } else {
    // Handle non-POST requests
    res.status(405).json({ error: "Method not allowed" });
  }
}
