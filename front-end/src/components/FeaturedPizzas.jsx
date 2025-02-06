import React from 'react';
import PizzaCard from './PizzaCard';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../services/api';
import { motion } from 'framer-motion';

const FeaturedPizzas = () => {
  const { data: pizzas, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#C41E3A] mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8 max-w-2xl mx-auto">
        <span className="text-4xl">🍕</span>
        <h3 className="text-2xl font-bold mb-2">Oven Malfunction!</h3>
        <p>We're having trouble loading our specialties. Please try again later.</p>
      </div>
    );
  }

  const showFeature = pizzas?.slice(0, 5) || [];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-[#FFF5E6] py-12 border-y-4 border-[#FFA726]/30"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Pizza Crust Inspired Border */}
        <div className="mb-8 pb-8 border-b-4 border-[#C41E3A]/20 relative">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFA726]/20"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl font-bold text-[#6B4226] font-pizza"
            >
              <span className="text-[#C41E3A]">🔥</span> Hot & Fresh Picks
            </motion.h2>

            <Link
              to="/menu"
              className="hidden md:flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A3172D] text-white px-6 py-3 rounded-full text-lg font-medium transition-all group"
            >
              <span>Explore Full Menu</span>
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

        {/* Pizza Cards Section */}
        <div className="relative z-10">
          <PizzaCard pizzas={showFeature} />
        </div>

        {/* Mobile CTA */}
        <Link
          to="/menu"
          className="md:hidden mt-8 w-full bg-[#C41E3A] hover:bg-[#A3172D] text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
        >
          <span>View Full Menu</span>
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
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-pizza-pattern bg-repeat"></div>
      <div className="absolute -bottom-4 left-4 text-6xl opacity-20">🍕</div>
      <div className="absolute -top-4 right-4 text-6xl opacity-20">🔥</div>
    </motion.section>
  );
};

export default FeaturedPizzas;