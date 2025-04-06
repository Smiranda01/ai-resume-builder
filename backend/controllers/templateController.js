const templateModel = require('../models/templateModel');

// GET all templates
exports.getAllTemplates = (req, res) => {
  templateModel.getAllTemplates((err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

// GET a template by ID
exports.getTemplateById = (req, res) => {
  const id = req.params.id;
  templateModel.getTemplateById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json(results[0]);
  });
};

// POST - create a new template
exports.createTemplate = (req, res) => {
  const { name, description, html_code } = req.body;
  if (!name || !html_code) {
    return res.status(400).json({ message: 'Name and HTML code are required' });
  }

  templateModel.createTemplate(name, description, html_code, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(201).json({ message: 'Template created', templateId: result.insertId });
  });
};

// PUT - update template
exports.updateTemplate = (req, res) => {
  const id = req.params.id;
  const { name, description, html_code } = req.body;

  templateModel.updateTemplate(id, name, description, html_code, (err) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json({ message: 'Template updated successfully' });
  });
};

// DELETE - delete a template
exports.deleteTemplate = (req, res) => {
  const id = req.params.id;
  templateModel.deleteTemplate(id, (err) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json({ message: 'Template deleted successfully' });
  });
};
