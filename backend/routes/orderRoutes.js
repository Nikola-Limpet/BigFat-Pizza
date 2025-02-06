const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyJWT = require('../middlewares/verifyJWT');

// Apply JWT verification to all order routes
router.use(verifyJWT);

// Define routes with proper controller functions
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/track/:id', orderController.trackOrder);

module.exports = router;
