// Este archivo contiene todas las queries a la base de datos
const { response } = require("express");
const { db } = require("../config/db");

const getUsers = async() => {
    const query = "SELECT * FROM users ORDER BY id ASC;";
    const { rows } = await db.query(query);
    return rows;
};
const getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1;';
    const { rows } = await db.query(query,[id]);
    return rows[0];
};
const createUser = async(user) => {
    try {
        const query = 'INSERT INTO users (name, email, age, sex, student_id, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
        const { rows } = await db.query(query, [user.name, user.email, user.age, user.sex, user.student_id, user.role]);
        console.log(response);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error (error);
    }
};
const updateUser = async (id, user) => {
    try {
        const query = 'UPDATE users SET name = $1, email = $2, age = $3, sex = $4, student_id = $5, role = $6 WHERE id = $7 RETURNING *;';
        const { rows } = await db.query(query, [user.name, user.email, user.age, user.sex, user.student_id, user.role, id]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser };