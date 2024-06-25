const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming a user owns the cart
    items: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true }
        }
    ],
}, { timestamps: true });


module.exports = mongoose.model('Cart', cartSchema);
