const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
	const { name, username, email, phone, password } =
		req.body;

	try {
		console.log("Registering user:", {
			name,
			username,
			email,
			phone,
		});

		const existingUser = await User.findOne({
			$or: [{ email }, { username }],
		});
		if (existingUser) {
			console.log(
				"User already exists with email or username:",
				email,
				username
			);
			return res
				.status(400)
				.json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			name,
			username,
			email,
			phone,
			password: hashedPassword,
		});
		await newUser.save();

		const { password: userPassword, ...userWithoutPassword } =
			newUser.toObject();

		console.log("User registered successfully:", {
			name,
			email,
			username,
		});
		res.status(201).json({
			message: "User registered successfully",
			user: userWithoutPassword,
		});
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ message: "Server error" });
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		console.log("Logging in user:", { username });

		const user = await User.findOne({ username });
		if (!user) {
			console.log(
				"Invalid credentials for username:",
				username
			);
			return res
				.status(400)
				.json({ message: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(
			password,
			user.password
		);
		if (!isMatch) {
			console.log("Invalid password for username:", username);
			return res
				.status(400)
				.json({ message: "Invalid credentials" });
		}

		const { password: userPassword, ...userWithoutPassword } =
			user.toObject();

		console.log("User logged in successfully:", {
			userWithoutPassword,
		});
		res.status(200).json({
			message: "Login successful",
			user: userWithoutPassword,
		});
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
