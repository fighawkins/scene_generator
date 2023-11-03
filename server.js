require('dotenv').config();
const express = require('express');

const app = express();
const port = 3000;

const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static('.'));

app.post('/generate-scene', async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: "you are a wise old storyteller. in two sentences, write a specific and creative, fun, scene idea for a role playing game"}],
        });

        if (response.choices && response.choices.length > 0) {
            res.json({ scene: response.choices[0].message.content.trim() });
        } else {
            res.status(500).json({ error: 'Failed to generate scene' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to communicate with OpenAI API' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});