const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/activate/:token', authController.activateAccount);  
router.post('/resend-activation', authController.resendActivationEmail); 

module.exports = router;


