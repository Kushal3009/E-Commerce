const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  // Ensure user field is required
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true  // Ensure product field is required
    },
    quantity: {
        type: Number,
        required: true,
        default: 1  // Set default quantity to 1 if not provided
    }
});

module.exports = mongoose.model('Cart', cartSchema);
