require('dotenv').config();
const users = [];

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { users, JWT_SECRET };