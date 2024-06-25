
const User = require('../models/userModel');

// Get all carts
exports.getAllCarts = async (req, res) => {
    try {
        // Assuming you want to return all users with their carts
        const users = await User.find().populate('cartItems');
        const carts = users.map(user => ({
            username: user.username,
            cartItems: user.cartItems
        }));
        res.status(200).json(carts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get cart by user ID
exports.getCartById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('cartItems');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user.cartItems || []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
    const { username, item } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const existingItemIndex = user.cartItems.findIndex(cartItem => cartItem.recipe_id === item.recipe_id);
        if (existingItemIndex !== -1) {
            user.cartItems[existingItemIndex].quantity += 1;
        } else {
            user.cartItems.push({ ...item, quantity: 1 });
        }

        await user.save();
        const updatedItem = existingItemIndex !== -1 ? user.cartItems[existingItemIndex] : { ...item, quantity: 1 };
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update item in cart
exports.updateCartItem = async (req, res) => {
    const { username, recipe_id, quantity } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const itemToUpdate = user.cartItems.find(cartItem => cartItem.recipe_id === recipe_id);
        if (!itemToUpdate) return res.status(404).json({ message: 'Item not found in cart' });

        itemToUpdate.quantity = quantity;
        await user.save();
        res.status(200).json(itemToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
    const { username, recipe_id } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const itemIndex = user.cartItems.findIndex(cartItem => cartItem.recipe_id === recipe_id);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

        if (user.cartItems[itemIndex].quantity > 1) {
            user.cartItems[itemIndex].quantity -= 1;
        } else {
            user.cartItems.splice(itemIndex, 1);
        }

        await user.save();
        res.status(200).json(user.cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
