const Product = require('../models/products');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('categories');
    res.json(products);
  } catch (error) {
    next(error);
  }
};

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

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { categorySlug } = req.params;
    const products = await Product.find()
      .populate({
        path: 'categories',
        match: { slug: categorySlug },
      })
      .then((products) =>
        products.filter((product) => product.categories.length > 0)
      );

    res.json(products);
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
