const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/fetch', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    res.status(200).json(user.cartItems || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add', async (req, res) => {
  const { username, item } = req.body;
  try {
    const user = await User.findOne({ username : username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const existingItem = user.cartItems.find((cartItem) => cartItem.recipe_id === item.recipe_id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ ...item, quantity: 1 });
    }
    await user.save();
    res.status(200).json({ ...item, quantity: existingItem ? existingItem.quantity : 1 });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/remove', async (req, res) => {
  const { username, recipe_id } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const itemIndex = user.cartItems.findIndex((cartItem) => cartItem.recipe_id === recipe_id);
    if (itemIndex > -1) {
      if (user.cartItems[itemIndex].quantity > 1) {
        user.cartItems[itemIndex].quantity -= 1;
      } else {
        user.cartItems.splice(itemIndex, 1);
      }
    }
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
