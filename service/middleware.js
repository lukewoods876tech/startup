const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('./db');

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
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      throw new Error('JWT secret not configured');
    }
    
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
}

module.exports = { authenticateToken }; 