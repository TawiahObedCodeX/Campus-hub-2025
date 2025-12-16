require('dotenv').config();
const mongoose = require('mongoose');
// MongoDB Connection
const connectMongo = async () => {
  try {
    const uri = process.env.MONGODB_URL || process.env.MONGO_URI;
    if (!uri || typeof uri !== 'string') {
      throw new Error('Missing MongoDB connection string. Set MONGODB_URL in Server/.env');
    }
    const options = {};
    if (process.env.MONGODB_DB) {
      options.dbName = process.env.MONGODB_DB;
    }
    await mongoose.connect(uri, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    if (error && error.code === 8000) {
      console.error('MongoDB authentication failed. Verify username/password, IP access list, and that your user is scoped to the correct database. If your user is scoped to a specific DB, set MONGODB_DB in .env or include the database name in the URI path (e.g., "/myDatabase").');
    }
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectMongo, mongoose };