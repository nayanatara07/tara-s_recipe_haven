// controllers/authController.js

const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, username, email, phone, password } = req.body;

    try {
        console.log('Registering user:', { name, username, email, phone });

        // Check if user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.log('User already exists with email or username:', email, username);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, username, email, phone, password: hashedPassword });
        await newUser.save();

        console.log('User registered successfully:', { name, email, username });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Logging in user:', { username });

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log('Invalid credentials for username:', username);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
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
};
