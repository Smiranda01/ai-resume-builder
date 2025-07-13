// Import necessary modules
const express = require('express');
const router = express.Router();

// Import the controller containing logic for resume operations
const resumeController = require('../controllers/resumeController');

// Import authentication middleware to secure all resume routes
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/resumes
// Create a new resume for the authenticated user
router.post('/', authMiddleware, resumeController.createResume);

// GET /api/resumes
// Retrieve all resumes created by the authenticated user
router.get('/', authMiddleware, resumeController.getUserResumes);

// GET /api/resumes/:id
// Get a single resume by its ID (must belong to the user)
router.get('/:id', authMiddleware, resumeController.getResumeById);

// PUT /api/resumes/:id
// Update a specific resume's content
router.put('/:id', authMiddleware, resumeController.updateResume);

// DELETE /api/resumes/:id
// Delete a specific resume
router.delete('/:id', authMiddleware, resumeController.deleteResume);

// Export the router so it can be used in index.js
module.exports = router;
