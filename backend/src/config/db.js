const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/dish_manager';
  await mongoose.connect(uri, {
    // options are fine default for Mongoose 7
  });
  console.log('MongoDB connected');
}

module.exports = { connectDB };
