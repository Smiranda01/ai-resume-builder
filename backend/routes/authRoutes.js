// Import Express to create API routes
const express = require('express');

// Create a new router object using Express
const router = express.Router();

// Import the controller that contains logic for each auth-related route
const authController = require('../controllers/authController');


// POST /api/auth/register
// Handles user registration (name, email, password). Sends an activation email.
router.post('/register', authController.register);

// POST /api/auth/login
// Authenticates user by verifying email and password. Returns a JWT token if successful.
router.post('/login', authController.login);

// GET /api/auth/activate/:token
// Activates user account using a token sent via email after registration.
router.get('/activate/:token', authController.activateAccount);

// POST /api/auth/resend-activation
// Allows users to request a new activation email if their token expired or was lost.
router.post('/resend-activation', authController.resendActivationEmail);

// Export the router so it can be mounted in index.js under /api/auth
module.exports = router;
