const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI;
console.log('MongoDB URI:', url); // Debugging line
const client = new MongoClient(url);
const dbName = 'myZooDataBase'; // Updated to your new database name

async function connectDB() {
  try {
    await client.connect();
    console.log(`Connected to database: ${dbName}`);
    return client.db(dbName);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };