const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load config from file
let dbConfig;
try {
  const configPath = path.join(__dirname, 'dbconfig.json');
  const configFile = fs.readFileSync(configPath, 'utf8');
  dbConfig = JSON.parse(configFile);
} catch (error) {
  console.error('Error loading dbconfig.json:', error);
  process.exit(1); // Exit with error
}

// Connect to MongoDB using config from file
mongoose.connect(dbConfig.mongodb.uri, dbConfig.mongodb.options)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = mongoose; 