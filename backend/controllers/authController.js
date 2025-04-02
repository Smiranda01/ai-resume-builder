const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');
const { sendActivationEmail } = require('../utils/emailService');
require('dotenv').config();

// REGISTER: Sends confirmation email
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  findUserByEmail(email, async (err, results) => {
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 8);

    const token = jwt.sign(
      { name, email, password: hashedPassword },
      process.env.JWT_ACTIVATE_SECRET,
      { expiresIn: '10m' }
    );

    try {
      await sendActivationEmail(email, token);
      res.status(200).json({ message: 'Confirmation email sent. Please check your inbox.' });
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      res.status(500).json({ message: 'Failed to send confirmation email' });
    }
  });
};

// LOGIN: Only for verified users
exports.login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, results) => {
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];

    if (!user.verified) {
      return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ token });
  });
};

exports.activateAccount = (req, res) => {
    const { token } = req.body;
  
    if (!token) return res.status(400).json({ message: 'Missing activation token' });
  
    jwt.verify(token, process.env.JWT_ACTIVATE_SECRET, (err, decoded) => {
      if (err) return res.status(400).json({ message: 'Invalid or expired token' });
  
      const { name, email, password } = decoded;
  
      findUserByEmail(email, (err, results) => {
        if (results.length > 0) return res.status(400).json({ message: 'User already activated' });
  
        createUser(name, email, password, (err, result) => {
          if (err) return res.status(500).json({ message: 'Account activation failed' });
          res.status(201).json({ message: 'Account activated successfully! You can now log in.' });
        });
      });
    });
  };
  