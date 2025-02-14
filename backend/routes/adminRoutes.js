const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyJWT = require('../middlewares/verifyJWT');
const isAdmin = require('../middlewares/isAdmin');

router.use(verifyJWT);
router.use(isAdmin);

router.get('/orders', orderController.getAllOrders);
router.get('/stats', orderController.getDashboardStats);
router.put('/orders/:id/status', orderController.updateOrderStatus);
router.put('/orders/:id/tracking', orderController.updateTrackingNumber);

module.exports = router;
