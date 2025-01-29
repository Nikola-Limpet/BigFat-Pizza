import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchPizzas } from '../services/api';
import { addToCart } from '../redux/features/cartSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const { data: pizzas, isLoading } = useQuery({
    queryKey: ['pizzas'],
    queryFn: fetchPizzas,
  });

  if (isLoading) return <div className='loading'>Loading...</div>;

  const handleAddToCart = (pizza) => {
    dispatch(addToCart(pizza));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="border p-4 rounded-lg shadow-lg">
            <img src={pizza.image} alt={pizza.name} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p className="font-bold">${pizza.price}</p>
            <button
              onClick={() => handleAddToCart(pizza)}
              className="mt-2 py-1 px-4 rounded bg-blue-500 text-white"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Menu;