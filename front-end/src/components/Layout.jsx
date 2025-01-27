import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="text-[#33670a] py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="../../public/logo.jpg" alt="Big Fat Pizza Logo" className="h-[150px] w-[150px] mr-2" />
        </Link>
        <div className="flex items-center">
          <Link to="/cart" className="nav-cart mr-4 flex items-center">
            🛒 <span className="nav-cart-number ml-2">0</span>
          </Link>
          <Link to="/menu" className="px-4 py-2 text-4xl button-Order rounded-md">
            Menu
          </Link>
        </div>
      </nav>

      <main className="m-0 p-0">{children}</main>

      <footer className="text-center py-4">
        <p>&copy; 2025 Big Fat Pizza. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;