const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }, // ✅ ref khớp với model user
    items: [
        {
            productId: String,
            productType: String,
            quantity: Number,
            price: Number
        }
    ],
    totalPrice: Number,
    shipping: Number,
    paymentDetails: {
        cardholder: String,
        cardNumber: String,
        expiration: String,
        cvv: String
    },
    shippingStatus: {
        type: String,
        enum: ['pending', 'shipping', 'completed', 'cancelled'],
        default: 'pending'
    },
    isHiddenByUser: {
        type: Boolean,
        default: false
      }
}, { collection: 'Bill', timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);
