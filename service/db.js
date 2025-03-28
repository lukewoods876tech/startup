const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Connection configuration - prioritize environment variables
const MONGODB_URI = process.env.MONGODB_URI || 
  (process.env.DB_USER && process.env.DB_PASSWORD 
    ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7e118.mongodb.net/?retryWrites=true&w=majority` 
    : null);
    
const JWT_SECRET = process.env.JWT_SECRET;

// Try loading from file as fallback
let dbConfig;
try {
  if (!MONGODB_URI || !JWT_SECRET) {
    const configPath = path.join(__dirname, 'dbconfig.json');
    const configFile = fs.readFileSync(configPath, 'utf8');
    dbConfig = JSON.parse(configFile);
    console.log('Loaded database config from file');
  }
} catch (error) {
  console.error('Error loading dbconfig.json:', error);
  if (!MONGODB_URI) {
    console.error('No MongoDB connection string available. Check environment variables or config file.');
    process.exit(1);
  }
}

// Connect to MongoDB using environment variables or config file
mongoose.connect(MONGODB_URI || dbConfig.mongodb.uri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Export both mongoose and config for other modules
module.exports = {
  mongoose,
  getJwtSecret: () => JWT_SECRET || (dbConfig && dbConfig.jwt && dbConfig.jwt.secret)
}; 