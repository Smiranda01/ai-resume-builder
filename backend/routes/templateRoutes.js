// Import required modules
const express = require('express');
const router = express.Router();

// Import the controller that handles logic for each template route
const templateController = require('../controllers/templateController');

// Import middleware
const authMiddleware = require('../middleware/authMiddleware');   
const requireAdmin = require('../middleware/requireAdmin');       

// GET /api/templates
// Public route: returns all templates (admin or user)
router.get('/', templateController.getAllTemplates);

// GET /api/templates/:id
// Public route: returns a specific template by ID
router.get('/:id', templateController.getTemplateById);

// POST /api/templates
// Protected route: only admins can create new templates
router.post('/', authMiddleware, requireAdmin, templateController.createTemplate);

// PUT /api/templates/:id
// Protected route: only admins can update a template
router.put('/:id', authMiddleware, requireAdmin, templateController.updateTemplate);

// DELETE /api/templates/:id
// Protected route: only admins can delete a template
router.delete('/:id', authMiddleware, requireAdmin, templateController.deleteTemplate);

// GET /api/templates/:id/render?resumeId=...
// Protected route: renders a resume using a selected template and latest AI-enhanced content
router.get('/:id/render', authMiddleware, templateController.renderResumeTemplate);

// Export the router to be mounted under /api/templates in index.js
module.exports = router;
