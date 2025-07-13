// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // MySQL database connection config

const app = express(); // Initialize Express app

// Load environment variables from .env file
dotenv.config();

// Enable Cross-Origin Resource Sharing (CORS) so frontend (localhost:5173) can communicate with backend
app.use(cors({
  origin: 'http://localhost:5173', // React frontend origin
  credentials: true,              // Allow cookies/auth headers
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Import and mount route handlers
const authRoutes = require('./routes/authRoutes');         // User authentication (register, login, activate)
const resumeRoutes = require('./routes/resumeRoutes');     // CRUD operations for resumes
const templateRoutes = require('./routes/templateRoutes'); // CRUD operations and rendering for templates
const feedbackRoutes = require('./routes/feedbackRoutes'); // AI-generated feedback and ATS score

// Define base routes for each API section
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/feedback', feedbackRoutes);

// Basic health check route (used to confirm server is running)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the server on specified port (default to 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
