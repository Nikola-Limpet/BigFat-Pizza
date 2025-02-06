const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order({
      user: req.user.id,
      items: req.body.items,
      total: req.body.total,
      deliveryAddress: req.body.deliveryAddress,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product');
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: 'Order not found' });
  }
};

exports.trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ status: order.status });
  } catch (error) {
    res.status(404).json({ error: 'Order not found' });
  }
};
