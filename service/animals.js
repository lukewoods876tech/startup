const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const { uploadFile, deleteFile } = require('./s3Service');

// Set up multer for temporary file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'temp');
    
    // Create the temp directory if it doesn't exist
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
        try {
          // Upload file to S3
          const s3FileUrl = await uploadFile(req.file);
          animalData.imageUrl = s3FileUrl;
          console.log('Image uploaded to S3:', s3FileUrl);
          
          // Delete the temporary file
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          console.error('S3 upload error:', uploadError);
          // Fallback to default image if S3 upload fails
          animalData.imageUrl = '/images/default-animal.jpg';
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
    // First find the animal to get its image URL
    const animal = await Animal.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!animal) {
      return res.status(404).json({ success: false, message: 'Animal not found' });
    }
    
    // Delete the image from S3 if it exists and isn't the default image
    if (animal.imageUrl && !animal.imageUrl.includes('/images/default-animal.jpg') && animal.imageUrl.includes('amazonaws.com')) {
      try {
        await deleteFile(animal.imageUrl);
        console.log('Deleted image from S3:', animal.imageUrl);
      } catch (deleteError) {
        console.error('Error deleting image from S3:', deleteError);
        // Continue with animal deletion even if image deletion fails
      }
    }
    
    // Now delete the animal from the database
    const result = await Animal.findByIdAndDelete(animal._id);
    
    res.json({ success: true, message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ success: false, message: 'Error deleting animal' });
  }
});

// UPDATE an animal
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    
    const animal = await Animal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      updates,
      { new: true }
    );
    
    if (!animal) {
      return res.status(404).json({ success: false, message: 'Animal not found' });
    }
    
    res.json(animal);
  } catch (error) {
    console.error('Error updating animal:', error);
    res.status(500).json({ success: false, message: 'Error updating animal' });
  }
});

module.exports = router; 