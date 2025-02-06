const mongoose = require('mongoose');
const validator = require('validator');

const addressSchema = new mongoose.Schema({
  type: { type: String, enum: ['home', 'work'], default: 'home' },
  street: { type: String },
  city: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'User is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: [validator.isEmail, 'Invalid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    addresses: [addressSchema],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    loyaltyPoints: { type: Number, default: 0 },
    refreshToken: String,
  },
  { timestamps: true }
);

// addresses: [{
//   street: String,
//   city: String,
//   postalCode: String,
//   isPrimary: Boolean
// }],

module.exports = mongoose.model('User', userSchema);
