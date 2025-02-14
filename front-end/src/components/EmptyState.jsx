import React from 'react';

const EmptyState = ({ icon, title, description }) => {
  return (
    <div className="text-center py-12 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-gray-400 text-4xl sm:text-5xl">{icon}</div>
      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-base sm:text-lg">{description}</p>
    </div>
  );
};

export default EmptyState;