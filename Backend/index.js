const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());


const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl, {

});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


app.use('/api/auth', require('./routes/auth')); 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
