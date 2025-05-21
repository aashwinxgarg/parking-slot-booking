const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    match: /^[A-Za-z0-9]{6,}$/,
  },
  ownerName: {
    type: String,
    required: true,
    minlength: 3,
    match: /^[A-Za-z ]+$/,
  },
  slotNumber: {
    type: Number,
    required: true,
    min: 1
  },
  bookingTime: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > new Date(); // Must be a future time
      },
      message: 'Booking time must be in the future.'
    }
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
