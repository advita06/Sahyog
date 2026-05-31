const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
// Serve frontend files
app.use(express.static('public'));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const ngoRoutes = require('./routes/ngo');
app.use('/api/ngo', ngoRoutes);
const collaborationRoutes = require('./routes/collaboration');
app.use('/api/collaboration', collaborationRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('SAHYOG server is running!');
});

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log('Connection error:', err);
  });