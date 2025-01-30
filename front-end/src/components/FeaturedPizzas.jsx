import React from 'react'
import PizzaCard from './PizzaCard'
import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../services/api';


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

  const showFeature = pizzas.slice(0, 5)
  return (
    <div>
      <PizzaCard pizzas={showFeature} />
    </div>
  );
};

export default FeaturedPizzas;