const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoroyController = require('../controllers/categoryController');

router.get('/categories', categoroyController.getAllCategories);
router.post('/categories', categoroyController.createCategory);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
// allow only shop manager to create products latter
router.post('/', productController.createProduct);
module.exports = router;
