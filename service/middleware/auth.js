const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Load config from file
let dbConfig;
try {
  const configPath = path.join(__dirname, '..', 'dbconfig.json');
  const configFile = fs.readFileSync(configPath, 'utf8');
  dbConfig = JSON.parse(configFile);
} catch (error) {
  console.error('Error loading dbconfig.json:', error);
  process.exit(1);
}

function authenticateToken(req, res, next) {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, dbConfig.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
}

module.exports = { authenticateToken }; 