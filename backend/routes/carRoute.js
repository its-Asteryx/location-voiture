// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const Car = require('../models/CarModel');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary file storage for multer




////recherche
router.get('/search', async (req, res) => {
  try {
    const q = req.query.q || '';
    const cars = await Car.find({
      name: { $regex: q, $options: 'i' }, // case-insensitive partial match
    });
    res.json(cars);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//fetch all cars
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type: type } : {}; // 'category' is your DB field
    const cars = await Car.find(filter);
    res.json(cars);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// GET a car by its ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) {
    console.error('Error fetching car by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
//add car to DB
router.post('/',upload.single('image'), async (req, res) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'car_images', // You can specify a folder name in Cloudinary
      use_filename: true,   // Ensure the file gets a proper name
      unique_filename: false // Avoid generating random file names
    });
    const { name, type, price } = req.body;
    const newCar = await Car.create({ name, type, price, image: result.secure_url });

    
    res.status(201).json({ message: "Car created", car: newCar });
  } catch (error) {
    res.status(500).json({ error: "Failed to create car" });
  }
});

module.exports = router;
