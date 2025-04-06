const db = require('../config/db');


exports.getAllTemplates = (callback) => {
  const sql = 'SELECT * FROM templates';
  db.query(sql, callback);
};

exports.getTemplateById = (id, callback) => {
  const sql = 'SELECT * FROM templates WHERE id = ?';
  db.query(sql, [id], callback);
};

exports.createTemplate = (name, description, html_code, callback) => {
  const sql = 'INSERT INTO templates (name, description, html_code) VALUES (?, ?, ?)';
  db.query(sql, [name, description, html_code], callback);
};

exports.updateTemplate = (id, name, description, html_code, callback) => {
  const sql = `
    UPDATE templates 
    SET name = ?, description = ?, html_code = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;
  db.query(sql, [name, description, html_code, id], callback);
};

exports.deleteTemplate = (id, callback) => {
  const sql = 'DELETE FROM templates WHERE id = ?';
  db.query(sql, [id], callback);
};
