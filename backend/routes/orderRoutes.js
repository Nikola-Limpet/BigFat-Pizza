const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyJWT = require('../middlewares/verifyJWT');

router.use(verifyJWT);

router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/track/:id', orderController.trackOrder);

router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;
