const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function getResponseChatGemini(req, res) {
    const { context, prompt } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
    const fullPrompt = `${context} ${prompt}`;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        
        return res.json({ response: text });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = { getResponseChatGemini };
