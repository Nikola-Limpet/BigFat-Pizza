const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  size: { type: String, required: true },
  toppings: [{ type: String }],
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
  },
  specialInstructions: { type: String },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'In Transit', 'Delivered'],
    default: 'Pending',
  },
  deliveryAddress: {
    street: { type: String },
    city: { type: String },
  },
  trackingNumber: String,
  createdAt: { type: Date, default: Date.now },
  deliveryTime: { type: Date },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
