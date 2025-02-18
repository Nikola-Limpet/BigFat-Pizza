import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5E6] p-4">
      <h1 className="text-4xl font-bold text-[#C41E3A] mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-[#6B4226] mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-[#C41E3A] hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;