const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyJWT = require('../middlewares/verifyJWT');

router.use(verifyJWT);

// Get routes
router.get('/', orderController.getAllOrders);
router.get('/track/:id', orderController.trackOrder);
router.get('/:id', orderController.getOrderById);

// Create route
router.post('/', orderController.createOrder);

// Update routes
router.put('/:id/status', orderController.updateOrderStatus);
router.put('/:id/tracking', orderController.updateTrackingNumber);

module.exports = router;
