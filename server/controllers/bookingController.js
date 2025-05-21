const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  try {
    const { slotNumber, startTime, endTime } = req.body;

    const overlapping = await Booking.findOne({
      slotNumber,
      $or: [
        {
          startTime: { $lt: new Date(endTime) },
          endTime: { $gt: new Date(startTime) }
        }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ message: 'This slot is already booked for the selected time range.' });
    }

    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ startTime: 1 });
  res.json(bookings);
};
