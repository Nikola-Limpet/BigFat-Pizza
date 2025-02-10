import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PizzaCard from '../components/PizzaCard';
import { Pizza, ChevronRight } from 'lucide-react';
import productService from '@/services/product';

const Menu = () => {
  const { categorySlug } = useParams();

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getAllCategories
  });

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError
  } = useQuery({
    queryKey: ['products', categorySlug],
    queryFn: () => categorySlug
      ? productService.getProductsByCategory(categorySlug)
      : productService.getAllProducts()
  });

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

  // If we're on a category page, show only those products
  if (categorySlug) {
    const category = categories?.find(cat => cat.slug === categorySlug);

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-dark font-display">
                  {category?.name}
                </h2>
                <Link
                  to="/menu"
                  className="group flex items-center gap-2 px-4 py-3 rounded-lg 
                    bg-gradient-to-r from-[#C41E3A]/90 to-[#FF6B6B] 
                    hover:from-[#A3172D]/90 hover:to-[#E65C5C]
                    text-white font-medium font-serif
                    shadow-md hover:shadow-lg
                    transform hover:-translate-y-0.5
                    transition-all duration-300 ease-in-out"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Back to Menu
                </Link>
              </div>
              <p className="text-dark/80 mb-6 max-w-3xl font-serif">
                {category?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((pizza, index) => (
                <motion.div
                  key={pizza._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PizzaCard pizza={pizza} categorySlug={categorySlug} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // For the main menu page, group products by category
  const productsByCategory = products?.reduce((acc, product) => {
    const categoryId = product.categories[0]?._id;
    if (categoryId) {
      if (!acc[categoryId]) acc[categoryId] = [];
      acc[categoryId].push(product);
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      {/* Categories Navigation */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-6 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
            {categories?.map((category) => (
              <Link
                key={category._id}
                to={`/menu/${category.slug}`}
                className="flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md
                    ${categorySlug === category.slug
                      ? 'bg-primary text-white'
                      : 'bg-background hover:bg-primary hover:text-white'}`}
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
        {categories?.map((category, index) => (
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
                  to={`/menu/${category.slug}`}
                  className="group flex items-center gap-2 px-4 py-3 rounded-lg 
                    bg-gradient-to-r from-[#C41E3A]/90 to-[#FF6B6B] 
                    hover:from-[#A3172D]/90 hover:to-[#E65C5C]
                    text-white font-medium font-serif
                    shadow-md hover:shadow-lg
                    transform hover:-translate-y-0.5
                    transition-all duration-300 ease-in-out"
                >
                  View All
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <p className="text-dark/80 mb-6 max-w-3xl font-serif">
                {category.description}
              </p>
            </div>

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