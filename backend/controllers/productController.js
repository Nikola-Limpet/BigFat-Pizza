const Product = require('../models/products');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('categories');
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// exports.getProductById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findOne({ id });
//     if (!product) return res.status(404).json({ error: 'Product not found' });
//     res.json(product);
//   } catch (error) {
//     next(error);
//   }
// };

exports.getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate('categories');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
