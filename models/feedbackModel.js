// importamos la base de datos
const { db } = require("../config/db");

const getFeedById = async(id) => {
    try {
        const query = "SELECT U.name, f.feedback FROM users U JOIN feedback f ON U.id = f.user_id WHERE U.id = $1;";
        const { rows } = await db.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
const createFeedback = async(feedback, userId) => {
    try {
        const query = "INSERT INTO feedback (feedback, user_id) VALUES ($1, $2) RETURNING *;";
        const { rows } = await db.query(query, [feedback, userId]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = { getFeedById, createFeedback };