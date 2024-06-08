const DescModel = require("../models/descriptionModel");

async function getDescById(req, res) {
    const { id } = req.params;
    try {
        const description = await DescModel.getDescById(id);
        res.status(200).json(description);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
async function createDescription(req, res) {
    try {
        const { userId } = req.params;
        const { description, prescription } = req.body;
        const newDescription = await DescModel.createDescription(description, prescription, userId);
        res.status(201).json(newDescription);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = { getDescById, createDescription }