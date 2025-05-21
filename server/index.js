const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');
const port = require('./config/config').PORT;
const connectToDB = require('./db/db');

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());


connectToDB();
app.get('/test', (req, res) => {
    res.json({ message: 'Test route works!' });
  });
app.get('/', (req, res) => {
  res.send('Welcome to the Booking API');
});
app.use('/api/bookings', bookingRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
