// Este archivo obtiene toda la información de nuestros modelos (queries) y las funciones nos retornan el request
const UserModel = require("../models/userModel");

async function getUsers(req, res) {
    try {
        const users = await UserModel.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
}
async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await UserModel.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}
async function createUser(req, res) {
    const user = req.body;
    try {
        const newUser = await UserModel.createUser(user);
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
async function updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    try {
        const updatedUser = await UserModel.updateUser(id, user);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getUsers, getUserById, createUser, updateUser };