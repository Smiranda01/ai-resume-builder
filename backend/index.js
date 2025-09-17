// index.js

const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // your mysql2 pool

dotenv.config();

const app = express();

// If you use cookies or proxies later, this helps behind Azure's LB
app.set('trust proxy', 1);

// ----- CORS -----
// Allow local dev and (optionally) your production URL via env var CLIENT_ORIGIN
const allowedOrigins = [
  'http://localhost:5173',
  'https://resumebuilder.santiagocloudlab.com',
  'https://santiago-airesumebuilder-wa01.azurewebsites.net',
  'santiago-airesumebuilde-staging-ckc4dfbtb4apahba.australiaeast-01.azurewebsites.net'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: false, 
}));


// ----- Body parsing -----
app.use(express.json());

// ----- Routes -----
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const templateRoutes = require('./routes/templateRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check (useful for debugging)
app.get('/healthz', (req, res) => res.send('Backend is running!'));

// ----- Static hosting for the React app (production) -----
if (process.env.NODE_ENV === 'production') {
  // We will copy frontend/dist -> backend/public in CI
  const staticDir = path.join(__dirname, 'public');
  app.use(express.static(staticDir));

  // SPA fallback (AFTER API routes)
  app.get('*', (_req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
