// routes/reservationRoute.js
const express = require("express");
const router = express.Router();
const Car = require("../models/CarModel");

const { createReservationCtrl } = require("../controllers/reservationControllers");

// POST /api/reservations
router.post("/",createReservationCtrl, async (req, res) => {
    const { carId, bookingDate } = req.body;
  
    if (!bookingDate) {
      return res.status(400).json({ error: "Booking date is required" });
    }
  
    try {
      const car = await Car.findById(carId);
  
      // Check if the date is already booked
      const isBooked = car.bookedDates.some(
        (date) => date.toISOString().split("T")[0] === new Date(bookingDate).toISOString().split("T")[0]
      );
  
      if (isBooked) {
        return res.status(400).json({ error: "Date is already booked." });
      }
  
      // Add the booked date to the car's bookedDates array
      car.bookedDates.push(new Date(bookingDate));
      await car.save();
  
      res.status(200).json({ message: "Car reserved successfully" });
    } catch (error) {
      console.error("Reservation error:", error);
      res.status(500).json({ error: "Error reserving car", details: error.message });
    }
  });
  

module.exports = router;
