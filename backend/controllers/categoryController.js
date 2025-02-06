const Category = require('../models/category');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, image, isActive } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = new Category({ name, description, image, isActive });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};
