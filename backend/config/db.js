// Load MySQL library to handle database connections
const mysql = require('mysql2');

// Load environment variables (e.g., DB credentials from .env file)
const dotenv = require('dotenv');
dotenv.config(); // This reads .env and sets process.env values

// Create a connection object to connect to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,     
  user: process.env.DB_USER,     
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME  
});

// Attempt to establish connection to the database
db.connect((err) => {
  if (err) {
    // If connection fails, log error message to console
    console.error('DB connection failed:', err.message);
  } else {
    // If connection is successful, confirm via console
    console.log('Connected to MySQL database');
  }
});

// Export this connection so it can be reused in models and controllers
module.exports = db;
