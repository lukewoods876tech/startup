const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create unique filename with original extension
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  }
});

// Configure upload middleware
const upload = multer({ storage: storage });

// Define Animal schema
const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['mammal', 'bird', 'reptile', 'amphibian', 'fish', 'invertebrate'],
    default: 'mammal'
  },
  imageUrl: {
    type: String,
    default: '/images/default-animal.jpg'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model
const Animal = mongoose.model('Animal', animalSchema);

// GET all animals for the authenticated user
router.get('/', async (req, res) => {
  try {
    // req.user contains the authenticated user info from the JWT
    const animals = await Animal.find({ userId: req.user.userId });
    res.json(animals);
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({ success: false, message: 'Error fetching animals' });
  }
});

// POST a new animal
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let animalData;
    
    console.log('Animal creation request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    if (req.body.animal) {
      // Handle form data with image
      animalData = JSON.parse(req.body.animal);
      if (req.file) {
        // Create full URL for image
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        animalData.imageUrl = `${serverUrl}/uploads/${req.file.filename}`;
        console.log('Image saved at:', animalData.imageUrl);
        
        // Verify the file exists
        const filePath = path.join(__dirname, '..', 'public', 'uploads', req.file.filename);
        if (fs.existsSync(filePath)) {
          console.log('Verified: File exists at', filePath);
        } else {
          console.error('Error: File does not exist at', filePath);
        }
      }
    } else {
      // Handle JSON data
      animalData = req.body;
    }
    
    // Add the user ID from the JWT
    animalData.userId = req.user.userId;
    
    // Save to database and log result
    const newAnimal = new Animal(animalData);
    const savedAnimal = await newAnimal.save();
    console.log('Animal saved to database:', savedAnimal);
    
    res.status(201).json(savedAnimal);
  } catch (error) {
    console.error('Error adding animal:', error);
    res.status(500).json({ success: false, message: 'Error adding animal: ' + error.message });
  }
});

// GET a specific animal
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!animal) {
      return res.status(404).json({ success: false, message: 'Animal not found' });
    }
    
    res.json(animal);
  } catch (error) {
    console.error('Error fetching animal:', error);
    res.status(500).json({ success: false, message: 'Error fetching animal' });
  }
});

// DELETE an animal
router.delete('/:id', async (req, res) => {
  try {
    const result = await Animal.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!result) {
      return res.status(404).json({ success: false, message: 'Animal not found' });
    }
    
    res.json({ success: true, message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ success: false, message: 'Error deleting animal' });
  }
});

module.exports = router; 