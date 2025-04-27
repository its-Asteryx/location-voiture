const express = require('express');
const connectToDb = require('./config/connectToDb');

const cors = require('cors');
require('dotenv').config();



connectToDb();

const app = express();
app.use(cors());
app.use(express.json());





//routes    

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/reservations', require('./routes/reservationRoute'));
app.use('/api/cars', require('./routes/carRoute'));

// In your server setup, ensure the static files are being served
app.use(express.static('public'));



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));