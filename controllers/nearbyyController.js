require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function initializeNearbyyClient() {
    const module = await import('@nearbyy/core');
    return new module.NearbyyClient({
        API_KEY: process.env.NEARBYY_API_KEY,
    });
}

const nearbyyPromise = initializeNearbyyClient();

async function getContextResponse(req, res) {
    const { prompt } = req.body;
    try {
        const nearbyy = await nearbyyPromise;
        const context = await nearbyy.semanticSearch({
            limit: 3,
            query: prompt,
        });

        if (!context.success) {
            console.error(context.error);
            return res.send("Lo lamento, no entiendo.");
        }

        const ctxMsg = context.data.items.map((item) => item.text).join('\n\n');

        // Define additional context that Gemini can handle
        const additionalContext = "You are a knowledgeable assistant capable of answering questions about various topics.";

        // Create the full prompt with context and user query
        const fullPrompt = `${additionalContext}\n\nContext:\n${ctxMsg}\n\nUser Query: ${prompt}`;

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = await response.text();

        return res.json({ response: text });
    } catch (error) {
        console.error('Error en la comunicación con la API', error);
        res.status(500).send(error);
    }
}

module.exports = { getContextResponse };
