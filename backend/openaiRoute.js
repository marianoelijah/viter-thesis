import express from 'express';
import OpenAI from 'openai';

console.log("API KEY:", process.env.OPENAI_API_KEY); // remove this later!


const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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', // Just for testing
});

router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant who knows everything about a web platform called Worldpeas. Worldpeas connects local farmers with customers to promote sustainable and healthy food access.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });
  
    if (response.status !== 200) {
      throw new Error(`Failed to get response: ${response.statusText}`);
    }
  
    console.log("OpenAI response:", response);
    const aiMessage = response.choices[0].message.content;
    res.json({ reply: aiMessage });
  } catch (err) {
    console.error("OpenAI API error:", err); // Log the full error object
    res.status(500).json({ error: "Something went wrong", details: err }); // Send the full error details in the response
  }
}
);  

export default router;
console.log("API KEY:", process.env.OPENAI_API_KEY); // remove this later!
