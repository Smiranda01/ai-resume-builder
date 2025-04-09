const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/generate', feedbackController.generateFeedback);

module.exports = router;
