const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middlewares/verifyJWT');
const Acc = require('../models/user');

router.get('/', async (req, res) => {
  const allAcc = await Acc.find({});
  res.json(allAcc).status(200);
});
router.use(verifyJWT);

router.get('/profile', userController.getProfile);
router.get('/orders', userController.getUserOrders);
router.get('/addresses', userController.getUserAddresses);

module.exports = router;
