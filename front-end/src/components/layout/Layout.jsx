import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useCartItemCount } from '../../hooks/cartItem';
import { ArrowUp, Menu, X } from 'lucide-react';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to track if the user is at the top of the page
  const [isAtTop, setIsAtTop] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const cartItemCount = useCartItemCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is 0 (at the very top)
      setIsAtTop(window.scrollY === 0);
      setShowScrollTop(window.scrollY > 300); // Show button after 300px scroll
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page is loaded at a position other than 0
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally apply sticky classes only when NOT at the top */}
      <nav
        className={`bg-[#fff9f0] shadow-md ${isAtTop ? '' : 'sticky top-0'
          } z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="Big Fat Pizza Logo"
                className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center text-2xl space-x-16">
              <Link
                to="/"
                className="text-[#33670a] hover:text-[#45800f] font-display transition-colors"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="text-[#33670a] hover:text-[#45800f] font-display transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/auth/login"
                className="text-[#33670a] hover:text-[#45800f] border-teal-300 font-display cursor-pointer transition-colors"
              >
                Login / Sign Up
              </Link>
            </div>

            {/* Cart Icon - Always Visible */}
            <div className="flex items-center">
              <Link to="/cart" className="nav-cart mr-4 flex items-center">
                🛒 <span className="nav-cart-number ml-2">{cartItemCount}</span>
              </Link>
              <Link to="/menu" className="px-4 py-2 font-display button-Order rounded-md">
                Menu
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-[#33670a] hover:text-[#45800f] transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 px-2">
              <Link
                to="/"
                className="text-[#33670a] hover:text-[#45800f] font-display px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#Drink"
                className="text-[#33670a] hover:text-[#45800f] font-display px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Drinks
              </Link>
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="text-[#33670a] hover:text-[#45800f] font-display px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </ScrollLink>
            </div>
          </div>
        )}
      </nav>

      <main className="m-0">{children}</main>

      <Footer />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#33670a] hover:bg-[#45800f] text-white p-3 rounded-full shadow-lg transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Layout;
