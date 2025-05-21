const mongoose = require('mongoose');
const url = require('../config/config.js').MONGODB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(`Error while connecting to MongoDB: `, error.message);
  }
};

module.exports = connectToDB;
