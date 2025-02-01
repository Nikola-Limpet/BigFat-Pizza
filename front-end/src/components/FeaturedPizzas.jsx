import React from 'react';
import PizzaCard from './PizzaCard';
import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../services/api';
import { Link } from 'react-router-dom';

const FeaturedPizzas = () => {
  const { data: pizzas, isLoading, error } = useQuery({
    queryKey: ['pizzas'],
    queryFn: fetchMenu,
    retry: false,
  });

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

  const showFeature = pizzas.slice(0, 5);
  return (
    <div className="relative m-0 p-0">

      {/* Fixed positioning container */}
      <div className="left-0 right-0 pt-2 bg-[#ffecd2] border-t border-orange-100">
        <div className="container mx-auto px-4 py-2 flex justify-end">
          <Link
            to="/menu"
            className="text-3xl border-teal-300  text-teal-700 hover:text-teal-900 font-medium transition-colors p-2 rounded flex items-center group"
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
        </div>
        <PizzaCard pizzas={showFeature} />
      </div>
    </div>
  );
};

export default FeaturedPizzas;