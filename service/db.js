const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myzoo';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get JWT secret from environment or use default
function getJwtSecret() {
  return process.env.JWT_SECRET || 'your_jwt_secret_key';
}

module.exports = { getJwtSecret }; 