const templateModel = require('../models/templateModel');
const Feedback = require('../models/feedbackModel');

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


exports.renderResumeTemplate = async (req, res) => {
  const templateId = req.params.id;
  const resumeId = req.query.resumeId;

  try {
    const template = await new Promise((resolve, reject) => {
      templateModel.getTemplateById(templateId, (err, result) => {
        if (err) reject(err);
        else if (result.length === 0) resolve(null);  // No template found
        else resolve(result[0]);
      });
    });
    
    const feedback = await new Promise((resolve, reject) => {
      Feedback.getLatestByResumeId(resumeId, (err, result) => {
        if (err) reject(err);
        else resolve(result);  // your getLatestByResumeId already returns null if not found
      });
    });
    
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    let feedbackJson;
    try {
      feedbackJson = JSON.parse(feedback.message);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to parse feedback JSON', error: err.message });
    }

    let renderedHTML = template.html_code;

    // Simple keys
    renderedHTML = renderedHTML.replace('{{name}}', feedbackJson.name || '');
    renderedHTML = renderedHTML.replace('{{title}}', feedbackJson.title || '');
    renderedHTML = renderedHTML.replace('{{summary}}', feedbackJson.summary || '');

    // Handle Experience Loop
    let experienceHTML = '';
    feedbackJson.experience?.forEach(exp => {
      experienceHTML += `
        <div>
          <h3>${exp.role} at ${exp.company}</h3>
          <p>${exp.description}</p>
        </div>
      `;
    });
    renderedHTML = renderedHTML.replace('{{experience}}', experienceHTML);

    // Handle Education Loop
    let educationHTML = '';
    feedbackJson.education?.forEach(edu => {
      educationHTML += `
        <div>
          <strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})
        </div>
      `;
    });
    renderedHTML = renderedHTML.replace('{{education}}', educationHTML);

    // Handle Skills List
    let skillsHTML = '';
    feedbackJson.skills?.forEach(skill => {
      skillsHTML += `<span>${skill}</span> `;
    });
    renderedHTML = renderedHTML.replace('{{skills}}', skillsHTML);

    // Handle Projects
    let projectsHTML = '';
    feedbackJson.projects?.forEach(proj => {
      projectsHTML += `
        <div>
          <strong>${proj.name}</strong>
          <p>${proj.description}</p>
        </div>
      `;
    });
    renderedHTML = renderedHTML.replace('{{projects}}', projectsHTML);

    res.status(200).send(renderedHTML);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

