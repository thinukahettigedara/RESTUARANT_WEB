const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing. Create backend/.env and set MONGODB_URI=mongodb://127.0.0.1:27017/the-hot-chick or your MongoDB Atlas connection string.');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('⚠️  Server continuing without database connection for testing...');
    // Don't exit process - allow server to start for frontend testing
  }
};

module.exports = connectDB;
