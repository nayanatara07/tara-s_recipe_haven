const express = require('express');
const router = express.Router();
const {
  getAllCarts,
  getCartById,
  addItemToCart,
  updateCartItem,
  deleteCartItem
} = require('../controllers/cartController');

// Get all carts
router.get('/', getAllCarts);

// Get cart by user ID
router.get('/:id', getCartById);

// Add item to cart
router.post('/', addItemToCart);

// Update item in cart
router.put('/:id', updateCartItem);

// Delete item from cart
router.delete('/:id', deleteCartItem);

module.exports = router;
