const templateModel = require('../models/templateModel');
const Feedback = require('../models/feedbackModel');

// Get all templates
exports.getAllTemplates = (req, res) => {
  templateModel.getAllTemplates((err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

// Get a single template by ID
exports.getTemplateById = (req, res) => {
  const id = req.params.id;
  templateModel.getTemplateById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json(results[0]);
  });
};

// Create a new template
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

// Update an existing template
exports.updateTemplate = (req, res) => {
  const id = req.params.id;
  const { name, description, html_code } = req.body;

  templateModel.updateTemplate(id, name, description, html_code, (err) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json({ message: 'Template updated successfully' });
  });
};

// Delete a template
exports.deleteTemplate = (req, res) => {
  const id = req.params.id;
  templateModel.deleteTemplate(id, (err) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json({ message: 'Template deleted successfully' });
  });
};

// Render resume using the template and latest AI feedback
exports.renderResumeTemplate = async (req, res) => {
  const templateId = req.params.id;
  const resumeId = req.query.resumeId;

  try {
    const template = await new Promise((resolve, reject) => {
      templateModel.getTemplateById(templateId, (err, result) => {
        if (err) reject(err);
        else resolve(result[0] || null);
      });
    });

    const feedback = await new Promise((resolve, reject) => {
      Feedback.getLatestByResumeId(resumeId, (err, result) => {
        if (err) reject(err);
        else resolve(result || null);
      });
    });

    if (!template) return res.status(404).json({ message: 'Template not found' });
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

    let data;
    try {
      data = JSON.parse(feedback.message);
    } catch (err) {
      return res.status(500).json({ message: 'Invalid JSON in feedback', error: err.message });
    }

    // Replace placeholders with actual values
    let output = template.html_code
      .replace('{{name}}', data.name || '')
      .replace('{{title}}', data.title || '')
      .replace('{{summary}}', data.summary || '');

    let experience = '';
    data.experience?.forEach(exp => {
      experience += `<div><h3>${exp.role} at ${exp.company}</h3><p>${exp.description}</p></div>`;
    });
    output = output.replace('{{experience}}', experience);

    let education = '';
    data.education?.forEach(edu => {
      education += `<div><strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})</div>`;
    });
    output = output.replace('{{education}}', education);

    let skills = '';
    data.skills?.forEach(skill => {
      skills += `<span>${skill}</span> `;
    });
    output = output.replace('{{skills}}', skills);

    let projects = '';
    data.projects?.forEach(proj => {
      projects += `<div><strong>${proj.name}</strong><p>${proj.description}</p></div>`;
    });
    output = output.replace('{{projects}}', projects);

    res.status(200).send(output);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
