const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { connectDB } = require('./db');
const { uploadToS3 } = require('./s3');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
      const filetype = file.originalname.split('.').pop();
      const id = Math.round(Math.random() * 1e9);
      const filename = `${id}.${filetype}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 64000 },
});

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
    
    res.status(201).json({ message: 'User registered successfully' });
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
    
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get animals endpoint
app.get('/api/animals', (req, res) => {
  res.json(req.user.animals || []);
});

// Add animal endpoint
app.post('/api/animals', upload.single('file'), (req, res) => {
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
    
    // Assuming req.user is set by some other means
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
app.delete('/api/animals/:id', (req, res) => {
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
app.put('/api/animals/:id', (req, res) => {
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
      "Dolphins have names for each other."
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// New endpoint for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  if (req.file) {
    try {
      await uploadToS3(req.file.filename, req.file.buffer);
      res.send({
        message: 'Upload succeeded',
        file: req.file.filename,
      });
    } catch (error) {
      res.status(500).send({ message: 'S3 upload failed', error: error.message });
    }
  } else {
    res.status(400).send({ message: 'Upload failed' });
  }
});

(async () => {
  const db = await connectDB();
  // Start your server here
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})(); 