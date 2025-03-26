const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
require('./db'); // Connect to MongoDB

const app = express();
const authRoutes = require('./routes/auth');
const animalRoutes = require('./routes/animals');
const { authenticateToken } = require('./middleware/auth');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Add this before the static middleware setup
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
  console.log('Created public directory');
}

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created uploads directory at:', uploadDir);
}

// Make sure permissions are set correctly
fs.chmodSync(uploadDir, 0o755);

// Set up static file serving with explicit logging
app.use('/uploads', (req, res, next) => {
  console.log('Static file request:', req.url);
  next();
}, express.static(path.join(__dirname, 'public', 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './public/uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Create data directory if it doesn't exist
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data');
}

// Create users.json if it doesn't exist
if (!fs.existsSync('./data/users.json')) {
  fs.writeFileSync('./data/users.json', '[]');
}

// Load users from file
let users = [];
try {
  const data = fs.readFileSync('./data/users.json', 'utf8');
  users = JSON.parse(data);
} catch (err) {
  console.log('No existing users data found, creating empty array');
  users = [];
}

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Authentication middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = users.find(user => user.id === decoded.id);
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/animals', authenticateToken, animalRoutes); // Protected route

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      password: hashedPassword,
      animals: []
    };
    
    // Add user to array
    users.push(newUser);
    
    // Save users to file
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    
    // Create token
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1d' });
    
    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Create token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get animals endpoint
app.get('/api/animals', authenticateUser, (req, res) => {
  res.json(req.user.animals || []);
});

// Add animal endpoint
app.post('/api/animals', authenticateUser, upload.single('image'), (req, res) => {
  try {
    let animal;
    
    if (req.file) {
      // Handle file upload
      const animalData = JSON.parse(req.body.animal);
      animal = {
        ...animalData,
        imageUrl: `/uploads/${req.file.filename}`
      };
    } else {
      // Handle JSON data
      animal = req.body;
    }
    
    const newAnimal = {
      ...animal,
      id: Date.now(),
      dateAdded: new Date().toISOString()
    };
    
    req.user.animals = req.user.animals || [];
    req.user.animals.push(newAnimal);
    
    // Save users to file
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    
    res.json(newAnimal);
  } catch (error) {
    console.error('Add animal error:', error);
    res.status(500).json({ error: 'Failed to add animal' });
  }
});

// Delete animal endpoint
app.delete('/api/animals/:id', authenticateUser, (req, res) => {
  try {
    const animalId = parseInt(req.params.id);
    
    req.user.animals = req.user.animals.filter(animal => animal.id !== animalId);
    
    // Save users to file
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    
    res.json({ success: true });
  } catch (error) {
    console.error('Delete animal error:', error);
    res.status(500).json({ error: 'Failed to delete animal' });
  }
});

// Update animal endpoint
app.put('/api/animals/:id', authenticateUser, (req, res) => {
  try {
    const animalId = parseInt(req.params.id);
    
    req.user.animals = req.user.animals.map(animal => 
      animal.id === animalId ? { ...animal, ...req.body } : animal
    );
    
    // Save users to file
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    
    res.json(req.user.animals.find(a => a.id === animalId));
  } catch (error) {
    res.status(500).json({ error: 'Failed to update animal' });
  }
});

// Add a random animal fact API
app.get('/api/animalfact', async (req, res) => {
  try {
    // Since we're not using a real API for now, return a hardcoded fact
    const facts = [
      "Lions can sleep up to 20 hours a day.",
      "Elephants can recognize themselves in a mirror.",
      "Giraffes have the same number of neck vertebrae as humans: seven.",
      "Penguins can jump as high as 6 feet in the air.",
      "A group of flamingos is called a flamboyance.",
      "Otters hold hands while sleeping so they don't drift apart.",
      "Hippos secrete a red oily substance that acts as sunscreen.",
      "Koalas sleep up to 22 hours a day.",
      "Sloths can rotate their heads nearly 180 degrees.",
      "Dolphins have names for each other.",
      // 20 new animal facts
      "Crows can recognize human faces and hold grudges against those who wrong them.",
      "A rhinoceros's horn is made of keratin, the same material as human fingernails.",
      "Octopuses have three hearts and blue blood.",
      "Honeybees can recognize human faces.",
      "Sharks have been around longer than trees, existing for over 400 million years.",
      "Polar bears have black skin underneath their white fur.",
      "Platypuses glow blue-green under UV light.",
      "Mantis shrimp can see colors humans can't even imagine.",
      "Tigers have striped skin, not just striped fur.",
      "Wombats are the only animals that produce cube-shaped poop.",
      "An ostrich's eye is bigger than its brain.",
      "Cats can't taste sweetness due to a genetic mutation.",
      "Tardigrades (water bears) can survive in space.",
      "Butterflies taste with their feet.",
      "A group of owls is called a parliament.",
      "Sea otters have the densest fur of any animal, with up to 1 million hairs per square inch.",
      "Reindeer eyes turn blue in winter to help them see better in dark Arctic conditions.",
      "Goats have rectangular pupils that allow them to see 320-340 degrees around them.",
      "Hummingbirds can fly backwards and are the only birds able to do so.",
      "A cockroach can live for several weeks without its head."
    ];
    
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    res.json({ fact: randomFact });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch animal fact',
      fact: 'Did you know? Animals are fascinating creatures!' 
    });
  }
});

// Add this near the top of your routes
app.get('/api/test', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 