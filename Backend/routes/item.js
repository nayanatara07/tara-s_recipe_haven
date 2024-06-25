const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItemById
} = require('../controllers/itemContoller');

// Get all items
router.get('/', getAllItems);

// Get item by ID
router.get('/:id', getItemById);

// Create a new item
router.post('/', createItem);

// Update an item
router.put('/:id', updateItem);

// Delete an item
router.delete('/:id', deleteItemById);

module.exports = router;
