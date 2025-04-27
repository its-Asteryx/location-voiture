const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: true
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
