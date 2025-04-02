const express = require('express');
const router = express.Router();
const { register, login, activateAccount } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/activate', activateAccount);

module.exports = router;
