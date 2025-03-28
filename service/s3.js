const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-providers');

const s3 = new S3Client({
  credentials: fromIni(), // Ensure your AWS credentials are set up in ~/.aws/credentials
  region: 'us-east-1' // Replace with your actual S3 bucket region (e.g., 'us-east-1', 'us-west-2', etc.)
});

const bucketName = 'myzoobucket'; // Replace with your actual bucket name

async function uploadToS3(fileName, fileContent) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  });
  return s3.send(command);
}

module.exports = { uploadToS3 }; 