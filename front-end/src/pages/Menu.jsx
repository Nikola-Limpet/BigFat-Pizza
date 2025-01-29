import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchMenu } from '../services/api';
import { addToCart } from '../redux/features/cartSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const { data: menu, isLoading, error } = useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenu,
    retry: false,
    onError: (error) => {
      console.error('Query error:', error);
    }
  });

  const handleAddToCart = (pizza) => {
    dispatch(addToCart(pizza));
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-700 mx-auto"></div>
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
    <div className="container mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 text-gray-900"
      >
        Our Delicious Menu
      </motion.h2>

      {menu.map((category) => (
        <section key={category.id} className="mb-16">
          <h2 className="text-2xl font-semibold text-lime-700 border-l-4 border-lime-700 pl-4 mb-6">
            {category.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((item) => (
              console.log(item),
              < motion.div
                key={item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover rounded-t-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                    <div className="flex flex-col items-end">
                      {item.meta.rating && (
                        <span className="bg-lime-100 text-lime-700 px-2 py-1 rounded text-sm mb-2">
                          ⭐ {item.meta.rating}
                        </span>
                      )}
                      {item.meta.calories && (
                        <span className="text-sm text-gray-500">
                          {item.meta.calories} kcal
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.badges.map((badge) => (
                      <span key={badge} className={`badge-${badge} bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        {badge.replace('-', ' ')}
                      </span>
                    ))}
                    {/* {item.meta.crusts.map((crust) => (
                      <span
                        key={crust}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        🍞 {crust} Crust
                      </span>
                    ))} */}
                  </div>

                  <p className="text-gray-600 mb-4">{item.description}</p>

                  {item.meta.includes && (
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-800 mb-2">Includes:</h5>
                      <ul className="list-disc pl-4">
                        {item.meta.includes.map((include) => (
                          <li key={include} className="text-sm text-gray-600">
                            {include}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-lime-700 hover:bg-lime-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                    >
                      <span>Add to Cart</span>
                      <span className="ml-2 text-sm opacity-90">
                        from {item.price.small ? `$${item.price.small}` : `$${item.price}`}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))
      }
    </div >
  );
};

export default Menu;