const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Create a reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     
    pass: process.env.EMAIL_PASS      
  },
  tls: {
    rejectUnauthorized: false         // Allows self-signed certificates
  }
});

// Sends the activation email with a link containing the verification token
const sendActivationEmail = (email, token) => {
  const url = `${process.env.CLIENT_URL}/activate/${token}`;  // Activation link

  const mailOptions = {
    from: `"AI Resume Builder" <${process.env.EMAIL_USER}>`,  // Email sender
    to: email,                                                 // Recipient
    subject: 'Activate Your Account',                          // Subject line
    html: `
      <h2>Welcome to AI Resume Builder!</h2>
      <p>Please click the button below to verify your email and activate your account:</p>
      <a href="${url}" style="display:inline-block;padding:10px 20px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:5px;">Activate Account</a>
      <p>This link will expire soon. If you did not request this, please ignore this email.</p>
    `
  };

  return transporter.sendMail(mailOptions); 
};

module.exports = { sendActivationEmail };
