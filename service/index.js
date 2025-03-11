const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(express.static('public'));

// User model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  animals: [{
    name: String,
    species: String,
    age: Number,
    weight: Number,
    imageUrl: String
  }]
});

// In-memory store (replace with MongoDB later)
let animals = [];

// Load animals from file if exists
try {
  const data = fs.readFileSync('./data/animals.json', 'utf8');
  animals = JSON.parse(data);
} catch (err) {
  console.log('No existing animals data found');
}

// User model
const User = mongoose.model('User', userSchema);

// Authentication middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Protected animal endpoints
app.get('/api/animals', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.animals || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch animals' });
  }
});

app.post('/api/animals', authenticateUser, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const animal = JSON.parse(req.body.animal);
    const newAnimal = {
      ...animal,
      id: Date.now(),
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };
    
    if (!user.animals) {
      user.animals = [];
    }
    user.animals.push(newAnimal);
    await user.save();
    res.json(newAnimal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add animal' });
  }
});

app.delete('/api/animals/:id', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const animalId = parseInt(req.params.id);
    const animal = user.animals.find(a => a.id === animalId);
    
    if (animal && animal.imageUrl) {
      fs.unlinkSync(path.join(__dirname, '../public', animal.imageUrl));
    }
    
    user.animals = user.animals.filter(a => a.id !== animalId);
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete animal' });
  }
});

app.put('/api/animals/:id', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const animalId = parseInt(req.params.id);
    
    user.animals = user.animals.map(animal => 
      animal.id === animalId ? { ...animal, ...req.body } : animal
    );
    
    await user.save();
    res.json(user.animals.find(a => a.id === animalId));
  } catch (error) {
    res.status(500).json({ error: 'Failed to update animal' });
  }
});

// Add a random animal fact API
app.get('/api/animalfact', async (req, res) => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/animals?name=lion');
    const fact = await response.json();
    res.json(fact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch animal fact' });
  }
});

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 