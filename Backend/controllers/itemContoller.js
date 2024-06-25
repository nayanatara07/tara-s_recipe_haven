// controllers/itemController.js

const Item = require('../models/itemModel');

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get item by ID
exports.getItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new item
exports.createItem = async (req, res) => {
    const { name, description, price, category, imageUrl } = req.body;
    try {
        if (!name) return res.status(400).json({ message: 'Name is required' });
        const newItem = new Item({ name, description, price, category, imageUrl });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing item
exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, imageUrl } = req.body;
    try {
        let item = await Item.findById(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.name = name;
        item.description = description;
        item.price = price;
        item.category = category;
        item.imageUrl = imageUrl;

        await item.save();
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an item by ID
exports.deleteItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};