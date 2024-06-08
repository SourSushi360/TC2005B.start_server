require('dotenv').config();

async function getResponseNearbyy(req, res) {
    const { context, prompt } = req.body;
    const fullPrompt = `${context} ${prompt}`;
    try {
        const { NearbyyClient } = await import("@nearbyy/core");
        const client = new NearbyyClient({
            API_KEY: process.env.NEARBYY_API_KEY,
        });

        const files = await client.semanticSearch({
            query: fullPrompt, // Replace with your query
            limit: 5,
        });
        
        return res.json({ response: files.data.items });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = { getResponseNearbyy };