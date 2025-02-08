import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import productService from '@services/product';
import PizzaCard from '../components/PizzaCard';
import { Pizza, ChevronRight } from 'lucide-react';

const Menu = () => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getAllCategories,
  });

  const {
    data: allProducts,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAllProducts,
  });

  // Group products by the _id of the first category in the product.categories array.
  const productsByCategory = (allProducts || []).reduce((acc, product) => {
    // Check if product.categories exists and has at least one element.
    if (product.categories && product.categories.length > 0) {
      const categoryId = product.categories[0]._id;
      if (!acc[categoryId]) acc[categoryId] = [];
      acc[categoryId].push(product);
    }
    return acc;
  }, {});

  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Pizza className="w-12 h-12 text-primary animate-spin" />
          <p className="text-lg font-medium text-dark font-serif">
            Preparing the menu...
          </p>
        </div>
      </div>
    );
  }

  if (categoriesError || productsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
          <p className="text-xl text-red mb-2 font-serif">
            Oops! Something went wrong.
          </p>
          <p className="text-dark">
            {categoriesError?.message || productsError?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-10">
          <img
            src="/banner.jpg"
            alt="Pizza background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 to-dark/30" />
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
            Authentic Italian Pizza
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-serif">
            Handcrafted with love, baked to perfection in our wood-fired ovens
          </p>
        </motion.div>
      </motion.header>

      {/* Categories Navigation */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-6 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/products/${category.slug}`}
                className="flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-background hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span className="text-sm font-medium whitespace-nowrap font-serif">
                    {category.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {categories.map((category, index) => (
          <motion.section
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-16 bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-dark font-display">
                  {category.name}
                </h2>
                <Link
                  to={`/products/${category.slug}`}
                  className="group flex items-center gap-2 text-primary hover:text-red font-medium font-serif"
                >
                  View All
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <p className="text-dark/80 mb-6 max-w-3xl font-serif">
                {category.description}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsByCategory[category._id]?.slice(0, 3).map((pizza, pizzaIndex) => (
                <motion.div
                  key={pizza._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: pizzaIndex * 0.1 }}
                >
                  <PizzaCard pizza={pizza} categorySlug={category.slug} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Menu;
