const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Controller function to add an item to the cart
router.post("/addToCart/:userId", async (req, res) => {
	const { userId } = req.params; // Assuming userId is passed as a route parameter
	const { dish } = req.body; // Assuming dish object is passed in the request body
	console.log(req.body);
	console.log(req.params);
	try {
		// Find the user by userId
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if dish.dish_id already exists in the cart
		const existingCartItem = user.cart.find(
			(item) => item.dish_id === dish.dish_id
		);

		if (existingCartItem) {
			// Increase the dish.quantity
			existingCartItem.quantity += 1;
		} else {
			// Create a new cart item
			user.cart.push({ ...dish });
		}

		// Save the updated user object
		await user.save();

		res
			.status(201)
			.json({ message: "Item added to cart", user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Controller function to get all items in the cart
router.get("/getCart/:userId", async (req, res) => {
	const { userId } = req.params; // Assuming userId is passed as a route parameter

	try {
		// Find the user by userId
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(user.cart);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
// Controller function to remove an item from the cart
router.delete(
	"/removeFromCart/:userId/:itemId",
	async (req, res) => {
		const { userId, itemId } = req.params; // Assuming userId and itemId are passed as route parameters
		try {
			// Find the user by userId
			const user = await User.findById(userId);

			if (!user) {
				return res
					.status(404)
					.json({ error: "User not found" });
			}

			// Find the index of the item in the cart array based on itemId
			const itemIndex = user.cart.findIndex(
				(item) => item.dish_id === itemId
			);

			if (itemIndex === -1) {
				return res
					.status(404)
					.json({ error: "Item not found in cart" });
			}

			// Decrease the quantity if it is more than 1, otherwise remove the item from the cart
			if (user.cart[itemIndex].quantity > 1) {
				user.cart[itemIndex].quantity -= 1;
			} else {
				user.cart.splice(itemIndex, 1);
			}

			// Save the updated user object
			await user.save();

			res
				.status(200)
				.json({ message: "Item removed from cart", user });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
);

module.exports = router;
