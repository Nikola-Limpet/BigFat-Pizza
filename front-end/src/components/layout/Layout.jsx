import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useCartItemCount } from '../../hooks/cartItem';
import { ArrowUp, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { clearTokenOfState } from '../../redux/features/authSlice';
import Footer from './Footer';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLogout = () => {
    dispatch(clearTokenOfState());
  };
  return (
    <div className="min-h-screen flex flex-col">
      <nav
        className={`bg-[#fff9f0] shadow-md ${isAtTop ? '' : 'sticky top-0'
          } z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link to="/" onClick={scrollToTop} className="flex-shrink-0">
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
                onClick={scrollToTop}
              >
                Home
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-[#33670a] hover:text-[#45800f] font-display transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/past-orders"
                    className="text-[#33670a] hover:text-[#45800f] font-display transition-colors"
                  >
                    Past Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[#33670a] hover:text-[#45800f] font-display transition-colors"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  className="text-[#33670a] hover:text-[#45800f] font-display transition-colors"
                >
                  Login / Sign Up
                </Link>
              )}
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
              className="md:hidden p-2 rounded-md text-[#33670a] hover:text-[#45800f] hover:bg-[#33670a]/10 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div >
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-[100px] right-0 w-64 h-screen bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-2 p-4 border-b border-gray-100">
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-[#33670a] hover:text-[#45800f] font-display px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Home</span>
                </Link>

                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-[#33670a] hover:text-[#45800f] font-display px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/past-orders"
                      className="flex items-center space-x-2 text-[#33670a] hover:text-[#45800f] font-display px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Past Orders</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/auth/login"
                    className="flex items-center space-x-2 text-[#33670a] hover:text-[#45800f] font-display px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Login / Sign Up</span>
                  </Link>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col space-y-2 p-4 mt-auto border-t border-gray-100">
                <Link
                  to="/menu"
                  className="flex items-center justify-center space-x-2 bg-[#33670a] text-white font-display px-4 py-2 rounded-md hover:bg-[#45800f] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Menu</span>
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-center space-x-2 bg-white text-[#33670a] border border-[#33670a] font-display px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Cart ({cartItemCount})</span>
                </Link>

                {isAuthenticated && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 font-display px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Backdrop */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

      </nav >

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
    </div >
  );
};

export default Layout;
