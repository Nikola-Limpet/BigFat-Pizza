const User = require('../models/user');

const getProfile = async (req, res, next) => {
  try {
    // Assume req.user is populated by a tokenExtractor middleware.
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getUserAddresses = async (req, res, next) => {
  try {
    res.json(req.user.addresses);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  getUserOrders,
  getUserAddresses
}