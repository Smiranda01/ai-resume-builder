const db = require('../config/db');

exports.saveFeedback = (user_id, resume_id, message, callback) => {
  const sql = 'INSERT INTO feedback (user_id, resume_id, message) VALUES (?, ?, ?)';
  db.query(sql, [user_id, resume_id, message], callback);
};
