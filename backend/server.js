const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
require('dotenv').config({ path: './backend/.env' });

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());


// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.get('/api/health', (req, res) => res.send('API Running'));

// Serve static assets in production
if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
  const path = require('path');
  // Set static folder
  app.use(express.static(path.join(__dirname, '../build')));

  // Explicitly serve search index to avoid SPA catch-all
  app.get('/search-index.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/search-index.json'));
  });

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
