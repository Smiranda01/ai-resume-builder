const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const authMiddleware = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');

router.get('/', templateController.getAllTemplates);
router.get('/:id', templateController.getTemplateById);

// Protect with both middlewares
router.post('/', authMiddleware, requireAdmin, templateController.createTemplate);
router.put('/:id', authMiddleware, requireAdmin, templateController.updateTemplate);
router.delete('/:id', authMiddleware, requireAdmin, templateController.deleteTemplate);

// Stay user-protected only:
router.get('/:id/render', authMiddleware, templateController.renderResumeTemplate);

module.exports = router;

