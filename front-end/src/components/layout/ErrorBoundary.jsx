import React from 'react';
import { useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-[#FFF5E6]"
    >
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-pacifico text-[#C41E3A] mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-[#6B4226] mb-6">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-[#C41E3A] text-white rounded-lg hover:bg-[#A3172D] transition-colors duration-300"
        >
          Return to Home
        </button>
      </div>
    </motion.div>
  );
};

export default ErrorBoundary;