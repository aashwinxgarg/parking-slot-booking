const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    match: /^[A-Za-z0-9]{6,}$/
  },
  ownerName: {
    type: String,
    required: true,
    match: /^[A-Za-z ]+$/
  },
  slotNumber: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: 'Start time must be in the future.'
    }
  },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return this.startTime && value > this.startTime;
      },
      message: 'End time must be after start time.'
    }
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
