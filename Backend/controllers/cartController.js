// controllers/cartController.js

const User = require('../models/userModel');
const Item = require('../models/itemModel');

// Get all items in the cart
exports.getCartItems = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('cart');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.cart);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add an item to the cart
exports.addItemToCart = async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        const user = await User.findById(userId);
        const item = await Item.findById(itemId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check if the item is already in the cart
        const cartItem = user.cart.find(cartItem => cartItem._id.toString() === itemId);
        if (cartItem) {
            cartItem.quantity = (cartItem.quantity || 1) + 1; // Increase quantity if item is already in the cart
        } else {
            user.cart.push({ _id: itemId, quantity: 1 }); // Add new item with quantity 1
        }

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update quantity of an item in the cart
exports.updateCartItem = async (req, res) => {
    const { userId, itemId, quantity } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItem = user.cart.find(cartItem => cartItem._id.toString() === itemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cartItem.quantity = quantity;
        await user.save();

        res.status(200).json(user.cart);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an item from the cart
exports.deleteCartItem = async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItem = user.cart.find(cartItem => cartItem._id.toString() === itemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1; // Decrease quantity if more than 1
        } else {
            user.cart = user.cart.filter(cartItem => cartItem._id.toString() !== itemId); // Remove item if quantity is 1
        }

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
