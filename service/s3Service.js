const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { fromEnv } = require('@aws-sdk/credential-providers');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: fromEnv()
});

// Bucket name from environment variables
const bucketName = process.env.S3_BUCKET_NAME;

// Upload file to S3
async function uploadFile(file) {
  try {
    const fileContent = fs.readFileSync(file.path);
    const fileName = Date.now() + '-' + path.basename(file.originalname || file.path);
    
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
      ContentType: file.mimetype || 'application/octet-stream'
    };
    
    await s3Client.send(new PutObjectCommand(params));
    
    // Return the URL to the uploaded file
    return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
}

// Delete file from S3
async function deleteFile(fileUrl) {
  try {
    // Extract the key from the URL
    const key = fileUrl.split('.com/')[1];
    
    const params = {
      Bucket: bucketName,
      Key: key
    };
    
    await s3Client.send(new DeleteObjectCommand(params));
    console.log(`File deleted from S3: ${key}`);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
}

// List all files in a directory
async function listFiles(prefix = 'uploads/') {
  try {
    const listParams = {
      Bucket: bucketName,
      Prefix: prefix
    };
    
    const data = await s3Client.send(new ListObjectsV2Command(listParams));
    return data.Contents || [];
  } catch (error) {
    console.error('Error listing files from S3:', error);
    throw error;
  }
}

// Get a file from S3 (returns a readable stream)
async function getFileStream(fileUrl) {
  try {
    // Extract the key from the URL
    const fileKey = fileUrl.split('.com/')[1];
    
    const getParams = {
      Bucket: bucketName,
      Key: fileKey
    };
    
    const { Body } = await s3Client.send(new GetObjectCommand(getParams));
    return Body;
  } catch (error) {
    console.error('Error getting file from S3:', error);
    throw error;
  }
}

module.exports = {
  uploadFile,
  deleteFile,
  listFiles,
  getFileStream
}; 