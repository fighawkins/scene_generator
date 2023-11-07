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
            messages: [{ role: "system", content: " in two sentences, write a concise scene idea for a dnd game. do not write out an entire plot for a campaign, only write one scene in specifics. it could be a fun scene, or a scary scene, or an epic scene, or any kind of scene. have fun with it. try not to use riddles or puzzles.  write as if you are brandon sanderson"}],
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