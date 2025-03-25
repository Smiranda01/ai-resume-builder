const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🟢 Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

