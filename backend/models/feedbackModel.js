// Import the MySQL database connection
const db = require('../config/db');


// Inserts a new feedback record linked to a user and a resume.
// The `message` field typically stores AI-enhanced resume content (JSON string).
exports.saveFeedback = (user_id, resume_id, message, callback) => {
  const sql = 'INSERT INTO feedback (user_id, resume_id, message) VALUES (?, ?, ?)';
  db.query(sql, [user_id, resume_id, message], callback);
};

// Retrieves the most recent feedback for a given resume.
// Ordered by ID in descending order to get the latest entry.
exports.getLatestByResumeId = (resume_id, callback) => {
  const sql = 'SELECT * FROM feedback WHERE resume_id = ? ORDER BY id DESC LIMIT 1';
  db.query(sql, [resume_id], (err, result) => {
    if (err) return callback(err, null);           
    if (result.length === 0) return callback(null, null);  
    return callback(null, result[0]);              
  });
};
