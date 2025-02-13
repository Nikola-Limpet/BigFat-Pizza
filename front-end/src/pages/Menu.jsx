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
      : productService.getAllProducts(),

  });

  // Loading State
  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-[50vh] md:min-h-screen flex items-center justify-center bg-background p-4">
        <div className="flex flex-col items-center gap-4">
          <Pizza className="w-8 h-8 md:w-12 md:h-12 text-primary animate-spin" />
          <p className="text-base md:text-lg font-medium text-dark font-serif">
            Preparing the menu...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (categoriesError || productsError) {
    return (
      <div className="min-h-[50vh] md:min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md p-4 md:p-6 bg-white rounded-lg shadow-lg text-center">
          <p className="text-lg md:text-xl text-red mb-2 font-serif">
            Oops! Something went wrong.
          </p>
          <p className="text-sm md:text-base text-dark">
            {categoriesError?.message || productsError?.message}
          </p>
        </div>
      </div>
    );
  }

  // Category Page
  if (categorySlug) {
    const category = categories?.find(cat => cat.slug === categorySlug);

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-16 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8"
          >
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-dark font-display">
                  {category?.name}
                </h2>
                <Link
                  to="/menu"
                  className="group self-end inline-flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg 
                    bg-gradient-to-r from-[#C41E3A]/90 to-[#FF6B6B] 
                    hover:from-[#A3172D]/90 hover:to-[#E65C5C]
                    text-white text-sm md:text-base font-medium font-serif
                    shadow-md hover:shadow-lg
                    transform hover:-translate-y-0.5
                    transition-all duration-300 ease-in-out"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Back to Menu
                </Link>
              </div>
              <p className="text-sm md:text-base text-dark/80 mb-6 max-w-3xl font-serif">
                {category?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
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

  // Main Menu Page
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
      {/* Categories Navigation - Sticky Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-2 md:py-4">
          <div className="flex gap-2 md:gap-6 overflow-x-auto pb-2 md:pb-3 
            scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent
            px-2 md:px-0 -mx-2 md:mx-0">
            {categories?.map((category) => (
              <Link
                key={category._id}
                to={`/menu/${category.slug}`}
                className="flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md
                    ${categorySlug === category.slug
                      ? 'bg-primary text-white'
                      : 'bg-background hover:bg-primary hover:text-white'}`}
                >
                  <span className="text-xs md:text-sm font-medium whitespace-nowrap font-serif">
                    {category.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        {categories?.map((category, index) => (
          <motion.section
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6 md:mb-12 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8"
          >
            <div className="mb-4 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 md:mb-6">
                <h2 className="text-xl md:text-3xl font-bold text-dark font-display">
                  {category.name}
                </h2>
                <Link
                  to={`/menu/${category.slug}`}
                  className="group self-end inline-flex items-center gap-2 px-4 py-2 md:py-3 rounded-lg 
                    bg-gradient-to-r from-[#C41E3A]/90 to-[#FF6B6B] 
                    hover:from-[#A3172D]/90 hover:to-[#E65C5C]
                    text-white text-sm md:text-base font-medium font-serif
                    shadow-md hover:shadow-lg
                    transform hover:-translate-y-0.5
                    transition-all duration-300 ease-in-out"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <p className="text-sm md:text-base text-dark/80 mb-4 md:mb-6 max-w-3xl font-serif">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
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