// Import the configured MySQL database connection
const db = require('../config/db');

// Retrieves a user record from the database by email.
// Used during login and registration to check if the user exists.
const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

// Inserts a new user into the database with name, email, and hashed password.
// This is called during user registration after validating the input.
const createUser = (name, email, password, callback) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], callback);
};

// Export both functions so they can be used in the auth controller
module.exports = { findUserByEmail, createUser };
