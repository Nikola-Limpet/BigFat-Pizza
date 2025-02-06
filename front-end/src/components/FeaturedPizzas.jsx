import React from 'react';
import PizzaCard from './PizzaCard';
// import { useQuery } from '@tanstack/react-query';
import { useGetCategoriesQuery } from '../services/api';
import { Link } from 'react-router-dom';

const FeaturedPizzas = () => {
  const { data: pizzas, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-lime-700 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading menu: {error.message}
      </div>
    );
  }

  const showFeature = pizzas?.slice(0, 5) || [];
  return (
    <div className="relative m-0 p-0">
      {/* Button container with responsive styling */}
      <div className="px-4">
        {/* Desktop and tablet: Right aligned button */}
        <Link
          to="/menu"
          className="hidden justify-end text-3xl text-teal-700 hover:text-teal-900 font-medium transition-colors p-2 rounded items-center group"
        >
          <span>Explore Full Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1 transform group-hover:translate-x-2 transition-transform"
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

        {/* Mobile: Full width button */}
        <Link
          to="/menu"
          className="sm:hidden w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center space-x-2 transition-colors"
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

      <div className="bg-[#ffecd2] border-t border-orange-100">
        <PizzaCard pizzas={showFeature} />
      </div>
    </div>
  );
};

export default FeaturedPizzas;