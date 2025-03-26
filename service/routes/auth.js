const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Register attempt with username:', username);
    
    // Check if required fields are present
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required'
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already in use'
      });
    }
    
    // Generate an email based on username
    const email = `${username}@myzoo.example.com`;
    
    // Create a new user with the generated email
    const user = new User({
      username,
      password,
      email
    });
    
    // Save user to database
    await user.save();
    console.log('User saved successfully with ID:', user._id);
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      dbConfig.jwt.secret,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error registering new user'
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if required fields are present
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required'
      });
    }
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password'
      });
    }
    
    // Check password
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password'
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      dbConfig.jwt.secret,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

// Debug route
router.get('/debug', async (req, res) => {
  try {
    // Get schema information
    const userSchemaKeys = Object.keys(User.schema.paths);
    console.log('User schema paths:', userSchemaKeys);
    
    // Check email required status
    const emailPath = User.schema.paths.email;
    console.log('Email required?', emailPath.isRequired);
    
    // Count existing users
    const count = await User.countDocuments();
    
    // Get sample users (limit to 5)
    const users = await User.find().limit(5).select('-password');
    
    // Generate schema info
    const schemaInfo = {};
    userSchemaKeys.forEach(key => {
      const path = User.schema.paths[key];
      schemaInfo[key] = {
        type: path.instance,
        required: !!path.isRequired
      };
    });
    
    res.json({
      count,
      schemaInfo,
      sampleUsers: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add this temporary debugging route (remove later)
router.get('/schema', (req, res) => {
  const userSchema = User.schema;
  const paths = {};
  
  // Extract schema information
  Object.keys(userSchema.paths).forEach(path => {
    const pathConfig = userSchema.paths[path];
    paths[path] = {
      type: pathConfig.instance,
      required: !!pathConfig.isRequired
    };
  });
  
  res.json({
    modelName: User.modelName,
    collection: User.collection.name,
    paths
  });
});

module.exports = router; 