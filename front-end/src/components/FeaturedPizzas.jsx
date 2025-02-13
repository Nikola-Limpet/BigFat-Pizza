import React from 'react';
import PizzaCard from './PizzaCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Pizza } from 'lucide-react';
import productServices from '@/services/product';

const FeaturedPizzas = () => {
  const {
    data: products,
    isLoading,
    error
  } = useQuery({
    queryKey: ['featured-products'],
    queryFn: productServices.getAllProducts,
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Pizza className="w-12 h-12 text-primary animate-spin" />
          <p className="text-lg font-medium text-dark font-serif">
            Loading fresh from the oven...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red py-8 max-w-2xl mx-auto">
        <span className="text-4xl">🍕</span>
        <h3 className="text-2xl font-bold mb-2 font-display">Oven Malfunction!</h3>
        <p className="font-serif">We're having trouble loading our specialties. Please try again later.</p>
      </div>
    );
  }

  // Get featured products (top 5 by rating)
  const featuredPizzas = products
    ?.sort((a, b) => b.rating - a.rating)
    .slice(0, 5) || [];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-background/60 py-12 border-y-4 border-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Pizza Crust Inspired Border */}
        <div className="mb-8 pb-8 border-b-4 border-primary/20 relative">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary/20"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl font-bold text-dark font-display"
            >
              <span className="text-primary">🔥</span> Hot & Fresh Picks
            </motion.h2>

            <Link
              to="/menu"
              className="hidden md:flex items-center gap-2 bg-primary hover:bg-red text-white px-6 py-3 rounded-full text-lg font-medium transition-all group shadow-md hover:shadow-lg"
            >
              <span className="font-serif">Explore Full Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Horizontal Scrolling Pizza Cards */}
        <div className="relative">
          <div className="overflow-x-auto pl-8 items-center pb-6 hide-scrollbar">
            <div className="flex space-x-6">
              {featuredPizzas.map((pizza, index) => (
                <motion.div
                  key={pizza._id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-[300px] flex-shrink-0"
                >
                  <PizzaCard
                    pizza={pizza}
                    categorySlug={pizza.categories[0]?.slug}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Indicators */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 bg-gradient-to-r from-background to-transparent h-full pointer-events-none" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 bg-gradient-to-l from-background to-transparent h-full pointer-events-none" />
        </div>

        {/* Mobile CTA */}
        <Link
          to="/menu"
          className="md:hidden mt-8 w-full bg-primary hover:bg-red text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
        >
          <span className="font-serif">View Full Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-70 pointer-events-none">
        <div className="absolute -bottom-4 left-4 text-6xl">🍕</div>
        <div className="absolute -top-4 right-4 text-6xl">🔥</div>
      </div>
    </motion.section>
  );
};

export default FeaturedPizzas;