import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';



const PizzaCard = ({ pizzas }) => {


  return (
    <div className="featured-section px-2 py-12 bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]/60">
      <div className="max-w-7xl mx-auto lg:mx-20">
        <div className="flex items-center justify-between mb-8 px-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold text-teal-900/80 font-pacifico"
          >
            Featured Pizzas
          </motion.h2>
        </div>

        {/* Scrollable Container */}
        <div className="relative group">
          <div className="flex space-x-6 overflow-x-auto pb-8 px-4 hide-scrollbar scroll-smooth">
            {pizzas.map((pizza) => (
              <motion.div
                key={pizza.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-80 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
              >
                <Link to={`/menu/pizza/${pizza.slug}`} className="block relative">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/placeHolder.bmp';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{pizza.description}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
                    >
                      Customize & Order
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Show All Button */}
          <div className="md:hidden px-4 pt-6">
            <Link
              to="/menu"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <span>View Full Menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PizzaCard;