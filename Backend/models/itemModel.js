const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    imageUrl: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);

