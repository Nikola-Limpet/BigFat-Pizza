import React from 'react';
import { Link } from 'react-router-dom';
import { useCartItemCount } from '../hooks/cartItem';
import { Link as ScrollLink } from 'react-scroll';

const Layout = ({ children }) => {
  const cartItemCount = useCartItemCount();

  return (
    <div>
      <nav className="text-[#33670a] py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.jpg" alt="Big Fat Pizza Logo" className="h-[120px] w-[120px] mr-2" />
        </Link>
        <ScrollLink
          to="book-section"
          smooth={true}
          duration={500}
          className="px-4 py-2 font-display button-Order rounded-md cursor-pointer"
        >
          Book & Events
        </ScrollLink>
        <Link to="/#Food" className="px-4 py-2 font-display button-Order rounded-md">
          Food
        </Link>
        <Link to="/#Drink" className="px-4 py-2 font-display button-Order rounded-md">
          Drink
        </Link>
        <div className="flex items-center">
          <Link to="/cart" className="nav-cart mr-4 flex items-center">
            🛒 <span className="nav-cart-number ml-2">{cartItemCount}</span>
          </Link>
          <Link to="/menu" className="px-4 py-2 font-display button-Order rounded-md">
            Menu
          </Link>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="text-center py-4">
        <p>&copy; 2025 Big Fat Pizza. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;