import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/'; // Check if the current page is the homepage


  const handleNavigation = (to, isScroll) => {
    if (isScroll && !isHomePage) {
      // if it's a scroll link and we're not on the homepage, navigate to the homepage first
      navigate('/', { state: { scrollTo: to } });
    }
  };
  return (
    <footer className="bg-gradient-to-b from-[#C41E3A]/70 to-[#7B2D26] text-[#FFF5E6] pt-16 pb-8 relative overflow-hidden">
      {/* Pizza crust border top */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-repeat-x bg-[url('/pizza-crust-border.png')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo Section */}
          <div className="space-y-6">
            <Link to="/" className="inline-block transform hover:rotate-12 transition-transform duration-300">
              <img
                src="/logo.jpg"
                alt="Big Fat Pizza Logo"
                className="h-24 w-24 object-contain rounded-full border-4 border-[#FFA726] p-2 shadow-lg"
              />
            </Link>
            <p className="text-sm text-[#FFE4C4] max-w-xs italic">
              "Crafting Naples-inspired pizza perfection since 2000. Every slice tells a story of tradition, passion, and the finest ingredients."
            </p>
            <div className="flex space-x-6">
              {['📘', '📷', '🍕'].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-2xl text-[#FFE4C4] hover:text-[#FFA726] hover:scale-110 transition-all duration-300"
                >
                  <span className="sr-only">Social Media</span>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-pacifico text-[#FFD700] mb-6">Explore More</h3>
            <ul className="space-y-3">
              {[
                { to: '/menu', text: 'Our Pizzas' },
                { to: 'about-section', text: 'Our Story', scroll: true },
                { to: 'book-section', text: 'Reservations', scroll: true },
                { to: '/locations', text: 'Find Us' }
              ].map((link, index) => (
                <li key={index}>
                  {link.scroll ? (
                    <ScrollLink
                      to={link.to}
                      smooth={true}
                      duration={500}
                      className="flex items-center text-[#FFE4C4] hover:text-white group transition-colors cursor-pointer"
                      onClick={() => handleNavigation(link.to, link.scroll)}
                    >
                      <span className="mr-2">🍕</span>
                      {link.text}
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </ScrollLink>
                  ) : (
                    <Link to={link.to} className="flex items-center text-[#FFE4C4] hover:text-white group transition-colors">
                      <span className="mr-2">🍕</span>
                      {link.text}
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-pacifico text-[#FFD700] mb-6">Our Hours</h3>
            <div className="space-y-3 text-[#FFE4C4]">
              <div className="flex justify-between items-center pb-2 border-b border-[#FFA726]/30">
                <span>Mon-Thu</span>
                <span className="font-semibold">11AM - 10PM</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#FFA726]/30">
                <span>Fri-Sat</span>
                <span className="font-semibold">11AM - 11PM</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#FFA726]/30">
                <span>Sunday</span>
                <span className="font-semibold">12PM - 9PM</span>
              </div>
              <p className="text-xs italic mt-4 text-[#FFA726]">
                *Late-night slice window available Fridays & Saturdays
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-pacifico text-[#FFD700] mb-6">Get in Touch</h3>
            <div className="space-y-4 text-[#FFE4C4]">
              <div className="flex items-start">
                <span className="text-2xl mr-3">📍</span>
                <div>
                  <p>123 Via della Pizza</p>
                  <p>Little Italy District</p>
                  <p>Pizzatown, PT 12345</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">📞</span>
                <a href="tel:+11234567890" className="hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">📧</span>
                <a href="mailto:hello@bigfatpizza.com" className="hover:text-white transition-colors">
                  hello@bigfatpizza.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-[#FFA726]/30">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#FFE4C4]">
            <p className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Big Fat Pizza - Crafted with ❤️ & 🍕
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="hover:text-[#FFA726] underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-[#FFA726] underline-offset-4 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Pizza Slices */}
      <div className="absolute bottom-0 right-0 opacity-10 -rotate-45">
        <span className="text-8xl">🍕</span>
        <span className="text-8xl ml-[-1rem]">🍕</span>
      </div>
    </footer>
  );
};

export default Footer;