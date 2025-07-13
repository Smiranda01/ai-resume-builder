// Import the MySQL database connection
const db = require('../config/db');


// Inserts a new resume record into the database.
// The resume is linked to a user and a template.
exports.createResume = (user_id, template_id, title, content, callback) => {
  const sql = 'INSERT INTO resumes (user_id, template_id, title, content) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, template_id, title, content], callback);
};


// Retrieves all resumes associated with a given user ID.
// Used to populate the dashboard list of resumes.
exports.getUserResumes = (userId, callback) => {
  const sql = 'SELECT * FROM resumes WHERE user_id = ?';
  db.query(sql, [userId], callback);
};


// Retrieves a single resume by its ID.
// Used for resume editing, previewing, or enhancing with AI.
exports.getResumeById = (id, callback) => {
  const sql = 'SELECT * FROM resumes WHERE id = ?';
  db.query(sql, [id], callback);
};


// Updates an existing resume’s content, title, or template.
// Automatically updates the `updated_at` timestamp.
exports.updateResume = (id, template_id, title, content, callback) => {
  const sql = `
    UPDATE resumes 
    SET template_id = ?, title = ?, content = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;
  db.query(sql, [template_id, title, content, id], callback);
};

// Permanently deletes a resume from the database.
exports.deleteResume = (id, callback) => {
  const sql = 'DELETE FROM resumes WHERE id = ?';
  db.query(sql, [id], callback);
};
