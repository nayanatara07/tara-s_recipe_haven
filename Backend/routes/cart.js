const express = require('express');
const router = express.Router();
const {
  getCartItems,
  addItemToCart,
  updateCartItem,
  deleteCartItem
} = require('../controllers/cartController');

// Get all items in the cart
router.get('/:userId', getCartItems);

// Add an item to the cart
router.post('/', addItemToCart);

// Update quantity of an item in the cart
router.put('/', updateCartItem);

// Delete an item from the cart
router.delete('/', deleteCartItem);

module.exports = router;
