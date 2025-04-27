  import { useEffect, useState } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { useAuth } from '../context/authContext';
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css"; 
  import { motion } from 'framer-motion'; // Import motion from framer-motion
  import './../tailwind.css'; // Import your tailwind CSS file

  function Reservation() {
    const location = useLocation();
    const navigate = useNavigate();
    const car = location.state?.car; // Fetch car data passed from VoitureDetail
    const { user } = useAuth();
    const [formData, setFormData] = useState({
      fullName: user?.username || "",
      email: user?.email || "",
      pickupDate: '',
      returnDate: '',
      carId: car?._id || '',
      userId: user?._id || '',
    });
    const [bookedDates, setBookedDates] = useState([]); // To hold the booked dates of the car
    const [error, setError] = useState(null);
    const isLoggedIn = !!user;

    // Effect to handle user not logged in
    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/login', {
          state: { from: location },
          replace: true
        });
      } else {
        setFormData((prevData) => ({
          ...prevData,
          fullName: user?.username || "",
          email: user?.email || "",
          userId: user._id || "",
          carId: car?._id || ""
        }));
      }
    }, [isLoggedIn, user, navigate, location, car]);

    // Effect to set the booked dates when car data is available
    useEffect(() => {
      if (car) {
        setBookedDates(car.bookedDates.map(date => new Date(date))); // Set booked dates as Date objects
      }
    }, [car]);

    // Helper function to generate dates between pickup and return date
    const getDatesBetween = (startDate, endDate) => {
      const dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };
    // Helper function to check for date range overlap
  const isOverlapping = (pickupDate, returnDate) => {
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    
    return bookedDates.some(booking => {
      const bookedStart = new Date(booking);
      const bookedEnd = new Date(booking);
      bookedEnd.setDate(bookedEnd.getDate() + 1); // Add one day to end date of booked range
      return (pickup >= bookedStart && pickup < bookedEnd) || 
             (returnD > bookedStart && returnD <= bookedEnd) ||
             (pickup <= bookedStart && returnD >= bookedEnd);
    });
  };

    // Handle changes to the form fields
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();

      // Ensure both dates are selected
      if (!formData.pickupDate || !formData.returnDate) {
        setError("Both pickup and return dates must be selected.");
        return;
      }

      // Ensure return date is after pickup
      if (new Date(formData.pickupDate) >= new Date(formData.returnDate)) {
        setError("Return date must be later than pickup date.");
        return;
      }

      // Get all dates between pickup and return
      const bookedRange = getDatesBetween(new Date(formData.pickupDate), new Date(formData.returnDate));

       // Check for overlapping bookings
    if (isOverlapping(formData.pickupDate, formData.returnDate)) {
      setError("The selected dates overlap with an existing booking.");
      return;
    }

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        pickupDate: formData.pickupDate,  // Date selected by the user
        returnDate: formData.returnDate,  // Date selected by the user
        carId: formData.carId,  // ID of the car
        userId: user._id,  // ID of the user (from context or session)
        bookedDates: bookedRange.map(date => date.toISOString().split('T')[0]) // Send the booked range to the backend
      };

      try {
        const response = await fetch("http://localhost:8000/api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}` // Authorization header
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
          alert("Reservation successful!");
          navigate("/");
        } else {
          setError(data.error || "An error occurred during reservation.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Something went wrong!");
      }
    };

    // Handle date changes and set it in the state
    const handleDateChange = (date, field) => {
      const localDate = new Date(date.setHours(0, 0, 0, 0)); // Ensure no timezone shifting
      setFormData({
        ...formData,
        [field]: localDate.toISOString().split("T")[0] // Format to YYYY-MM-DD
      });
    };

    if (!isLoggedIn) return null; // Redirect to login if not logged in

    return (
      <motion.div 
        className="p-4 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-3xl font-bold mt-20 mb-10">Reservation for {car?.name || "Unknown Car"}</h1>

        {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </motion.div>

          {/* Pickup Date Picker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block mb-1 font-medium">Pick-up Date</label>
            <DatePicker
              selected={formData.pickupDate ? new Date(formData.pickupDate) : null}
              onChange={(date) => handleDateChange(date, 'pickupDate')}
              minDate={new Date()} // Disable past dates
              excludeDates={bookedDates}  // Exclude booked dates
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded w-full"
              required
              dayClassName={(date) => 
                bookedDates.some(d => d.toDateString() === date.toDateString()) ? 'highlighted-date' : '' // Highlight booked dates with custom class
              }
            />
          </motion.div>

          {/* Return Date Picker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block mb-1 font-medium">Return Date</label>
            <DatePicker
              selected={formData.returnDate ? new Date(formData.returnDate) : null}
              onChange={(date) => handleDateChange(date, 'returnDate')}
              minDate={new Date(formData.pickupDate || new Date())} // Ensure return date is after pickup date
              excludeDates={bookedDates} // Exclude booked dates
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded w-full"
              required
              dayClassName={(date) => 
                bookedDates.some(d => d.toDateString() === date.toDateString()) ? 'highlighted-date' : '' // Highlight booked dates with custom class
              }
            />
          </motion.div>

          <motion.button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Confirm Reservation
          </motion.button>
        </form>
      </motion.div>
    );
  }

  export default Reservation;
