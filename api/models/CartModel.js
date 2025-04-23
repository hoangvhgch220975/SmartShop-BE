// File: server/api/models/CartModel.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    items: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            productType: {
                type: String,
                enum: ['device', 'package', 'combo'],
                required: true
            },
            quantity: { type: Number, default: 1 },

            price: { type: Number, required: true },
        }
    ],

    totalPrice: { type: Number, default: 0, required: true },
},
    { collection: 'Cart', timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);