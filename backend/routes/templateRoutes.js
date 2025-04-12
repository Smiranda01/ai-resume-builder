const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

// GET all templates
router.get('/', templateController.getAllTemplates);

// GET a specific template by ID
router.get('/:id', templateController.getTemplateById);

// POST a new template
router.post('/', templateController.createTemplate);

// PUT to update a template
router.put('/:id', templateController.updateTemplate);

// DELETE a template
router.delete('/:id', templateController.deleteTemplate);

// Render AI-enhanced resume into selected template
router.get('/:id/render', templateController.renderResumeTemplate);

module.exports = router;
