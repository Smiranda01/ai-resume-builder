const resumeModel = require('../models/resumeModel.js');
const htmlDocx = require('html-docx-js');
const util = require('util'); 

// Create a new resume for the authenticated user
exports.createResume = (req, res) => {
  const userid = req.user.id;
  const { title, content } = req.body;
  const template_id = req.body.template_id || 1;

  const stringifiedContent = JSON.stringify(content);

  resumeModel.createResume(userid, template_id, title, stringifiedContent, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(201).json({ message: 'Resume created', resumeId: result.insertId });
  });
};

// Get all resumes belonging to the logged-in user
exports.getUserResumes = (req, res) => {
  const userId = req.user.id;

  resumeModel.getUserResumes(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    // Parse resume content from JSON
    const parsed = results.map(resume => {
      try {
        return {
          ...resume,
          content: JSON.parse(resume.content),
        };
      } catch {
        return {
          ...resume,
          content: null,
          parseError: true,
        };
      }
    });

    res.status(200).json(parsed);
  });
};

// Get a specific resume by its ID
exports.getResumeById = (req, res) => {
  const resumeId = req.params.id;
  const userId = req.user.id;

  resumeModel.getResumeById(resumeId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    const resume = results[0];
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    if (resume.user_id !== userId) return res.status(403).json({ message: 'Unauthorized access to resume' });

    try {
      resume.content = JSON.parse(resume.content);
    } catch {
      resume.content = null;
      resume.parseError = true;
    }

    res.status(200).json(resume);
  });
};

// Update an existing resume after validating ownership
exports.updateResume = (req, res) => {
  const resumeId = req.params.id;
  const { template_id, title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  const safeTemplateId = template_id || 1;
  const stringifiedContent = JSON.stringify(content);

  resumeModel.getResumeById(resumeId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    const resume = results[0];
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    if (resume.user_id !== userId) return res.status(403).json({ message: 'Unauthorized: You do not own this resume' });

    resumeModel.updateResume(resumeId, safeTemplateId, title, stringifiedContent, (err) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.status(200).json({ message: 'Resume updated successfully' });
    });
  });
};

// Delete a resume after verifying ownership
exports.deleteResume = (req, res) => {
  const resumeId = req.params.id;
  const userId = req.user.id;

  resumeModel.getResumeById(resumeId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    const resume = results[0];
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    if (resume.user_id !== userId) return res.status(403).json({ message: 'Unauthorized: You do not own this resume' });

    resumeModel.deleteResume(resumeId, (err) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.status(200).json({ message: 'Resume deleted' });
    });
  });
};



exports.downloadDocx = async (req, res) => {
  try {
    const getResumeByIdAsync = util.promisify(resumeModel.getResumeById);
    const results = await getResumeByIdAsync(req.params.id);

    const resume = results[0];
    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    // Ensure ownership 
    if (resume.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized access to resume' });
    }

    const content = typeof resume.content === 'string' ? JSON.parse(resume.content) : resume.content;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resume</title>
          <style>
            body {
              font-family: "Calibri", sans-serif;
              font-size: 12pt;
            }
            h1, h2 {
              font-family: "Georgia", serif;
            }
            ul {
              margin-top: 0;
              margin-bottom: 1em;
            }
          </style>
        </head>
        <body>
          <h1>${content.name || ''}</h1>
          <p><em>${content.title || ''}</em></p>
          <p><strong>Email:</strong> ${content.email || ''}</p>
          ${content.summary ? `<h2>Summary</h2><p>${content.summary}</p>` : ''}
          ${content.skills?.length ? `<h2>Skills</h2><ul>${content.skills.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
          ${content.experience?.length ? `
            <h2>Experience</h2>
            ${content.experience.map(e => `<p><strong>${e.role}</strong> at ${e.company}</p><p>${e.description}</p>`).join('')}
          ` : ''}
          ${content.education?.length ? `
            <h2>Education</h2>
            ${content.education.map(edu => `<p><strong>${edu.degree}</strong> ${edu.institution} (${edu.year})</p>`).join('')}
          ` : ''}
          ${content.projects?.length ? `
            <h2>Projects</h2>
            ${content.projects.map(p => `<p><strong>${p.name}</strong>: ${p.description}</p>`).join('')}
          ` : ''}
          ${content.languages?.length ? `<h2>Languages</h2><p>${content.languages.join(', ')}</p>` : ''}
        </body>
      </html>
    `;


    const blob = htmlDocx.asBlob(html);
    const arrayBuffer = await blob.arrayBuffer();
    const docxBuffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${resume.title || 'resume'}.docx"`);
    res.end(docxBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate DOCX' });
  }
};


