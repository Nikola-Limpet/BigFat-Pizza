const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Assume tokenExtractor middleware populates req.user
const tokenExtractor = require('../middlewares/verifyJWT');

router.get('/profile', tokenExtractor, userController.getProfile);
router.get('/orders', tokenExtractor, userController.getUserOrders);
router.get('/addresses', tokenExtractor, userController.getUserAddresses);

module.exports = router;
