const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/readify');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        // If MongoDB fails, we continue for now to allow local dev without a running DB
        console.warn('Backend running without MongoDB connection. Some features may not work.');
    }
};

module.exports = connectDB;
