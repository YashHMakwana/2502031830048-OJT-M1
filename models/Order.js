const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for guest orders
  },
  items: [
    {
      itemId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  delivery: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  tokenId: {
    type: String,
    required: true
  },
  estimatedPrepTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
