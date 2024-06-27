const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const emailjs = require("emailjs-com");

const serviceID = process.env.EMAILJS_SERVICE_ID;
const templateID = process.env.EMAILJS_TEMPLATE_ID;
const emailUserID = process.env.EMAILJS_USER_ID;

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

    user.cart = user.cart.map((item) => ({ ...item, locked: true }));

    await user.save();

    const emailParams = {
      to_email: user.email,
      username: user.username,
      cartItems: user.cart.map((item) => `
        <div>
          <p>${item.name}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: ${item.price}</p>
          <img src="${item.image_url}" alt="${item.name}" />
        </div>
      `).join(""),
    };

    emailjs.send(serviceID, templateID, emailParams, emailUserID)
      .then(() => {
        console.log("Email sent successfully!");
        res.status(200).json({ message: "Checkout successful, items locked and email sent" });
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        res.status(500).json({ error: "Failed to send email" });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
