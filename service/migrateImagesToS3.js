require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { uploadFile } = require('./utils/s3Service');
require('./db');

// Define Animal schema (same as in your application)
const animalSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: String,
  weight: String,
  type: String,
  imageUrl: String,
  userId: mongoose.Schema.Types.ObjectId
});

const Animal = mongoose.model('Animal', animalSchema);

console.log('Current directory:', __dirname);
console.log('Looking for images in:', path.join(__dirname, '..', 'public', '/uploads'));

async function migrateImages() {
  try {
    console.log('Starting image migration to S3...');
    
    // Get all animals with local image paths
    const animals = await Animal.find({
      imageUrl: { $regex: '^/uploads/' }
    });
    
    console.log(`Found ${animals.length} animals with local images to migrate`);
    
    for (const animal of animals) {
      try {
        const localPath = path.join(__dirname, '..', 'public', animal.imageUrl);
        console.log(`Attempting to migrate: ${animal.imageUrl}`);
        console.log(`Looking for file at: ${localPath}`);
        
        // Check if the file exists locally
        if (!fs.existsSync(localPath)) {
          console.log(`File not found locally: ${localPath}`);
          continue;
        }
        
        // Create a file object for the S3 upload function
        const file = {
          path: localPath,
          originalname: path.basename(animal.imageUrl),
          mimetype: 'image/jpeg' // Assuming JPEG, adjust if needed
        };
        
        // Upload to S3
        const s3Url = await uploadFile(file);
        console.log(`Migrated ${animal.imageUrl} to ${s3Url}`);
        
        // Update the animal record with the S3 URL
        animal.imageUrl = s3Url;
        await animal.save();
        
        console.log(`Updated animal ${animal._id} with new S3 URL`);
      } catch (error) {
        console.error(`Error migrating image for animal ${animal._id}:`, error);
      }
    }
    
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateImages(); 