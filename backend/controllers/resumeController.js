const resumeModel = require('../models/resumeModel.js');

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
