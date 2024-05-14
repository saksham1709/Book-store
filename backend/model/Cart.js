const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        // required: true,
        ref: 'Book'
    }
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0
        // required: true,
    }
})

module.exports = mongoose.model('Cart', cartSchema);