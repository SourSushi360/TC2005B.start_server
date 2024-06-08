const FeedModel = require("../models/feedbackModel");

async function getFeedById(req, res) {
    const { id } = req.params;
    try {
        const feedback = await FeedModel.getFeedById(id);
        res.status(200).json(feedback);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
async function createFeedback(req, res) {
    try {
        const { feedback } = req.body;
        const { userId } = req.params;
        const newFeedback = await FeedModel.createFeedback(feedback, userId);
        res.status(201).json(newFeedback);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = { getFeedById, createFeedback }