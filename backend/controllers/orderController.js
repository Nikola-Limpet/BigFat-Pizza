const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, total, deliveryAddress, deliveryTime } = req.body;
    if (!userId || !items || !total || !deliveryAddress) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const order = new Order({
      userId,
      items,
      total,
      deliveryAddress,
      deliveryTime,
    });

    const savedOrder = await order.save();
    res.status(201).json({
      success: true,
      _id: savedOrder._id,
      message: 'Order placed successfully',
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create order',
    });
  }
};

exports.updateTrackingNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const { trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        trackingNumber,
        ...(trackingNumber && { status: 'In Transit' }),
      },
      { new: true }
    )
      .populate('userId', 'username email')
      .populate('items.productId', 'name price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Update tracking error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'username email')
      .populate('items.productId', 'name price');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};
exports.trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id, // Changed from user to userId
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      trackingNumber: order.trackingNumber,
      status: order.status,
      estimatedDelivery: order.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track order' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
    });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalOrders, pendingOrders, inTransitOrders, recentOrders, revenue] =
      await Promise.all([
        Order.countDocuments(),
        Order.countDocuments({ status: 'Pending' }),
        Order.countDocuments({ status: 'In Transit' }),
        Order.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .populate('userId', 'username')
          .lean(),
        Order.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: '$total' },
            },
          },
        ]),
      ]);

    res.json({
      success: true,
      totalOrders,
      pendingOrders,
      inTransit: inTransitOrders,
      totalRevenue: revenue[0]?.total || 0,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const status = req.query.status || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'username email')
        .populate('items.productId', 'name price'),
      Order.countDocuments(query),
    ]);

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: 'No orders found',
      });
    }

    res.json({
      success: true,
      orders,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Preparing', 'In Transit', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate('userId', 'username email')
      .populate('items.productId', 'name price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
