const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, 'Quantity must be at least 1']
  }
}, { timestamps: true });

// A compound index to ensure user + itemId unique pairing
CartItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model('CartItem', CartItemSchema);
