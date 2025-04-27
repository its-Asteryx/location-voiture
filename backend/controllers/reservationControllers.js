const Reservation = require("../models/ReservationModel");
const Car = require("../models/CarModel");


const createReservationCtrl = async (req, res) => {
  console.log("Incoming reservation data:", req.body); // Logs incoming request data

  try {
    const { fullName, email, pickupDate, returnDate, carId, userId } = req.body;

    // Ensure all required fields are present
    if (!fullName || !email || !pickupDate || !returnDate || !carId || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Parse and validate dates to ensure pickupDate is before returnDate
    const parsedPickupDate = new Date(pickupDate);
    const parsedReturnDate = new Date(returnDate);

    if (parsedReturnDate <= parsedPickupDate) {
      return res.status(400).json({ error: "Return date must be after pickup date" });
    }

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    // Check if the dates are already booked
    const isBooked = car.bookedDates.some(
      (date) => 
        (new Date(date).toISOString().split("T")[0] === new Date(pickupDate).toISOString().split("T")[0]) ||
        (new Date(date).toISOString().split("T")[0] === new Date(returnDate).toISOString().split("T")[0])
    );
    if (isBooked) {
      return res.status(400).json({ error: "Date is already booked." });
    }

    console.log("Parsed reservation data:", { pickupDate: parsedPickupDate, returnDate: parsedReturnDate });

    // Create the reservation
    const reservation = await Reservation.create({
      fullName,
      email,
      pickupDate: parsedPickupDate,
      returnDate: parsedReturnDate,
      car: carId,
      userId
    });
    // Add the booked dates to the car's bookedDates array
    car.bookedDates.push(new Date(pickupDate));
    car.bookedDates.push(new Date(returnDate));
    await car.save();

    res.status(201).json({ message: "Reservation created", reservation });
  } catch (error) {
    console.error("Reservation error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

module.exports = { createReservationCtrl };
