require('dotenv').config(); 
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dv4fkqnbd',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your Cloudinary API secret
});

module.exports = cloudinary;
