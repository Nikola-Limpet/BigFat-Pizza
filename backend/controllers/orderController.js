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
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
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
    res.json({
      trackingNumber: order.trackingNumber,
      status: order.status,
      estimatedDelivery: order.createdAt, // Add estimated delivery time
    });
  } catch (error) {
    res.status(404).json({ error: 'Order not found' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validate status - adjust allowed statuses as needed
    const allowedStatuses = ['Pending', 'Preparing', 'In Transit', 'Delivered'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // update status
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
