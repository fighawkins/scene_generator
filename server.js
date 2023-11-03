require('dotenv').config(); // Make sure to install the dotenv package
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Use the .env file for your API key
const API_KEY = process.env.OPENAI_API_KEY;

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve your static files
app.use(express.static('.'));

app.post('/generate-scene', async (req, res) => {
    const prompt = "Make an awesome DnD scene idea in two sentences";
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 60
        })
    });

    if (response.ok) { // Check if the HTTP response is successful
        const data = await response.json();
        if (data.choices && data.choices.length > 0 && data.choices[0].text) {
            res.json({ scene: data.choices[0].text.trim() });
        } else {
            res.status(500).json({ error: 'Failed to generate scene' });
        }
    } else {
        // Handle the case where the OpenAI API call wasn't successful
        res.status(500).json({ error: 'Failed to communicate with OpenAI API' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});