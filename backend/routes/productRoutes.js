const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoroyController = require('../controllers/categoryController');

router.get('/categories', categoroyController.getAllCategories);
router.post('/categories', categoroyController.createCategory);

router.get('/', productController.getAllProducts);
router.get('/category/:categorySlug', productController.getProductsByCategory); // Add this line
router.get('/:slug', productController.getProductBySlug);
router.post('/', productController.createProduct);

module.exports = router;
