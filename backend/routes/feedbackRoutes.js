const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.use(authMiddleware);

router.post('/generate', feedbackController.generateFeedback);

module.exports = router;
