const express = require('express');
const router = express.Router();
const { register, login, activateAccount, resendActivationEmail } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/activate/:token', activateAccount);  
router.post('/resend-activation', resendActivationEmail); 

module.exports = router;


