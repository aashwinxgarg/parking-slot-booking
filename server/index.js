const express = require('express');
// const mongoose = require('mongoose');
const port = require('./config/config').PORT;
const connectToDB = require('./db/db');

const app = express();
app.use(express.json());

connectToDB();

app.listen(port, () => console.log('Server started on port 5000'));
