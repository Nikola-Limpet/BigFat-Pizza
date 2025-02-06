const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoroyController = require('../controllers/categoryController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/categories', categoroyController.getAllCategories);

module.exports = router;
