const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// 🔹 Use a Specific Model (Change if needed)
const GEMINI_MODEL = 'gemini-2.0-flash'; // Change to 'gemini-1.5-flash' if needed
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const API_KEY = 'AIzaSyCS5xvL5cra1oHRob5jBMlKQiy1Xnn77xk';

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, {
            contents: [{ parts: [{ text: message }] }]
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch response' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
