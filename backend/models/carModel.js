// models/CarModel.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]
    },
    type: {
      type: String,
      required: [true, "Car type is required"],
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"]
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true
    },
    bookedDates: { type: [Date], default: [] },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
