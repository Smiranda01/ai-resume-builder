// Import the MySQL database connection
const db = require('../config/db');

// Fetches all templates from the database.
// Used to list templates for both users and admins.
exports.getAllTemplates = (callback) => {
  const sql = 'SELECT * FROM templates';
  db.query(sql, callback);
};


// Retrieves a specific template by ID.
// Used when rendering or editing a template.
exports.getTemplateById = (id, callback) => {
  const sql = 'SELECT * FROM templates WHERE id = ?';
  db.query(sql, [id], callback);
};


// Adds a new template into the database.
// Used by admins through the Create Template page.
exports.createTemplate = (name, description, html_code, callback) => {
  const sql = 'INSERT INTO templates (name, description, html_code) VALUES (?, ?, ?)';
  db.query(sql, [name, description, html_code], callback);
};


// Updates an existing template's information.
// Automatically sets updated_at to the current timestamp.
exports.updateTemplate = (id, name, description, html_code, callback) => {
  const sql = `
    UPDATE templates 
    SET name = ?, description = ?, html_code = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;
  db.query(sql, [name, description, html_code, id], callback);
};


// Deletes a template from the database.
// Used by admins through the Template Management page.
exports.deleteTemplate = (id, callback) => {
  const sql = 'DELETE FROM templates WHERE id = ?';
  db.query(sql, [id], callback);
};
