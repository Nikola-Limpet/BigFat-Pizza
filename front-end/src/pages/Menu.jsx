
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PizzaCard from '../components/PizzaCard';
import { useQuery } from '@tanstack/react-query';
import { fetchMenu } from '../services/api';


const categories = [
  { name: "Pizza", slug: "pizza" },
  { name: "BITE", slug: "bite" },
  { name: "Special Deals", slug: "special-deals" },
  { name: "Set For One", slug: "set-for-one" },
  { name: "Set For Group", slug: "set-for-group" },
  { name: "Chicken", slug: "chicken" },
  { name: "Pasta & Rice", slug: "pasta-rice" },
  { name: "Appetizer", slug: "appetizer" },
  { name: "Salad", slug: "salad" }
]


const Menu = () => {
  const { data: pizzas, isLoading, error } = useQuery({
    queryKey: ['pizzas'],
    queryFn: fetchMenu,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-lime-700 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading menu: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen"
      style={{ background: 'linear-gradient(to bottom, #ffecd2 0%, #fcb69f 100%)' }}>

      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-10">
          <img
            src="/banner.jpg"
            alt="Pizza background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-pacifico drop-shadow-lg">
            Crafted with Passion
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Choose from our artisan selection of hand-tossed pizzas
          </p>
        </motion.div>
      </motion.header>

      {/* Scrollable Categories */}
      <div className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-6 overflow-x-auto pb-3 hide-scrollbar">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/menu/${category.slug}`}
                className="flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <span className="text-sm font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* menu grid full */}
      <PizzaCard pizzas={pizzas} />
    </div>
  );
};

export default Menu;