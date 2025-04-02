const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');
const { sendActivationEmail } = require('../utils/emailService');
const db = require('../config/db');


exports.register = (req, res) => {
  const { name, email, password } = req.body;

  findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err });
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 8);

    // 1. Create user first
    createUser(name, email, hashedPassword, async (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to create user', error: err });

      // 2. Create token for email confirmation
      const token = jwt.sign(
        { email },
        process.env.JWT_ACTIVATE_SECRET,
        { expiresIn: '10m' }
      );

      // 3. Send confirmation email
      try {
        await sendActivationEmail(email, token);
        res.status(201).json({ message: 'User registered. Confirmation email sent.' });
      } catch (emailErr) {
        console.error('Email send failed:', emailErr.message);
        res.status(201).json({ 
          message: 'User registered, but failed to send confirmation email.', 
          warning: emailErr.message 
        });
      }
    });
  });
};

exports.resendActivationEmail = (req, res) => {
    const { email } = req.body;
  
    if (!email) return res.status(400).json({ message: 'Email is required' });
  
    findUserByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = results[0];
      if (user.verified) {
        return res.status(400).json({ message: 'Account is already verified' });
      }
  
      const token = jwt.sign(
        { name: user.name, email: user.email, password: user.password },
        process.env.JWT_ACTIVATE_SECRET,
        { expiresIn: '10m' }
      );

      console.log("Sending email to:", user.email);
  
      sendActivationEmail(user.email, token)
        .then(() => {
          res.status(200).json({ message: 'Activation email resent' });
        })
        .catch((error) => {
          console.error('Resend email failed:', error);
          res.status(500).json({ message: 'Failed to resend activation email' });
        });
    });
  };

  
exports.activateAccount = (req, res) => {
    const token = req.params.token;
  
    jwt.verify(token, process.env.JWT_ACTIVATE_SECRET, (err, decoded) => {
      if (err) return res.status(400).json({ message: 'Invalid or expired token' });
  
      const { email } = decoded;
  
      // Now update the user as verified
      const sql = 'UPDATE users SET verified = 1 WHERE email = ?';
      db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json({ message: 'Failed to activate account' });
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json({ message: 'Account successfully activated!' });
      });
    });
  };

  exports.login = (req, res) => {
    const { email, password } = req.body;
  
    findUserByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error', error: err });
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
  
  