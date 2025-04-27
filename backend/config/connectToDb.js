const mongoose = require('mongoose');

const connectToDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/location");
        console.log('MongoDB connected successfully');
        

    }
    catch(err){
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}; 

module.exports = connectToDb;