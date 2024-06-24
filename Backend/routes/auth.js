const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Logging in user:', { username });

    const user = await User.findOne({ username });
    if (!user) {
      console.log('Invalid credentials for username:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password for username:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User logged in successfully:', { username });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
