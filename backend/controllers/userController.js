const User = require('../models/user');
const Order = require('../models/order');

const getProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(req.user._id)
      .select('-passwordHash -refreshToken')
      .populate('orderHistory');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      addresses: user.addresses,
      orderHistory: user.orderHistory,
      loyaltyPoints: user.loyaltyPoints,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'items.productId',
        select: 'name price imageUrl',
        model: 'Product',
      });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getUserAddresses = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(req.user._id).select('addresses');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.addresses);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  getUserOrders,
  getUserAddresses,
};
