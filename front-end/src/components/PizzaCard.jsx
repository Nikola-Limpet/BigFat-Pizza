import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';

const PizzaCard = ({ pizza, categorySlug }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
    >
      <Link to={`/menu/pizza/${pizza.slug}?category=${categorySlug}`} className="block">
        <div className="relative h-60 overflow-hidden">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.src = '/placeHolder.bmp';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-lg">
            <span className="text-[#C41E3A] font-bold">
              From ${pizza.basePrice.toFixed(2)}
            </span>
          </div>
          {/* Tags */}
          {pizza.tags && pizza.tags.length > 0 && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {pizza.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/90 px-2 py-1 rounded-full text-xs text-[#6B4226] capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
              {pizza.name}
            </h3>
          </div>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {pizza.description}
          </p>
          <div className="mt-4">
            <Button
              className="w-full bg-[#C41E3A] hover:bg-[#A3172D] text-white text-center py-2 rounded-md font-medium transition-colors"
            >
              Customize & Order
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PizzaCard;