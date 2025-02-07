const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Assume tokenExtractor middleware populates req.user
const tokenExtractor = require('../middlewares/verifyJWT');

router.use(tokenExtractor);

router.get('/profile', userController.getProfile);
router.get('/orders', userController.getUserOrders);
router.get('/addresses', userController.getUserAddresses);

module.exports = router;
