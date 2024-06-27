const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Order = require("../models/orderModel"); 

router.post("/addToCart/:userId", async (req, res) => {
  const { userId } = req.params;
  const { dish } = req.body;

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

    res.status(201).json({ message: "Item added to cart", user });
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

router.delete("/removeFromCart/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const itemIndex = user.cart.findIndex(
      (item) => item.dish_id === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    if (user.cart[itemIndex].quantity > 1) {
      user.cart[itemIndex].quantity -= 1;
    } else {
      user.cart.splice(itemIndex, 1);
    }

    await user.save();

    res.status(200).json({ message: "Item removed from cart", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/checkout/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orderItems = user.cart.map(item => ({
      dish_id: item.dish_id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image_url: item.image_url
    }));

    const newOrder = new Order({
      userId: user._id,
      items: orderItems,
      orderDate: new Date(),
    });

    await newOrder.save();

    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Checkout successful, order placed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId });

    if (!orders) {
      return res.status(404).json({ error: "No orders found for user" });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
