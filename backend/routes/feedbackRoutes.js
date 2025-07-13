// Import necessary modules
const express = require('express');
const router = express.Router();

// Import controller logic that handles feedback generation using AI
const feedbackController = require('../controllers/feedbackController');

// Import middleware to verify user authentication via JWT token
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes in this file
// Ensures only logged-in users can request AI feedback
router.use(authMiddleware);

// POST /api/feedback/generate
// This route sends resume content to the AI and stores the feedback (e.g., rewritten content, ATS score)
router.post('/generate', feedbackController.generateFeedback);

// Export the router to be mounted under /api/feedback
module.exports = router;
