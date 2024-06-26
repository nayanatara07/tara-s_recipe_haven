const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

router.post("/addToCart/:userId", async (req, res) => {
	const { userId } = req.params; 
	const { dish } = req.body; 
	console.log(req.body);
	console.log(req.params);
	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const existingCartItem = user.cart.find(
			(item) => item.dish_id === dish.dish_id
		);

		if (existingCartItem) {
			existingCartItem.quantity += 1;
		} else {
			user.cart.push({ ...dish });
		}

		await user.save();

		res
			.status(201)
			.json({ message: "Item added to cart", user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/getCart/:userId", async (req, res) => {
	const { userId } = req.params; 

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(user.cart);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
router.delete(
	"/removeFromCart/:userId/:itemId",
	async (req, res) => {
		const { userId, itemId } = req.params; 
		try {
			const user = await User.findById(userId);

			if (!user) {
				return res
					.status(404)
					.json({ error: "User not found" });
			}

			const itemIndex = user.cart.findIndex(
				(item) => item.dish_id === itemId
			);

			if (itemIndex === -1) {
				return res
					.status(404)
					.json({ error: "Item not found in cart" });
			}

			if (user.cart[itemIndex].quantity > 1) {
				user.cart[itemIndex].quantity -= 1;
			} else {
				user.cart.splice(itemIndex, 1);
			}

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
