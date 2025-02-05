import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Loader2 } from 'lucide-react';
import { addToCart } from '@/redux/features/cartSlice';
import { Button } from './common/button';

const AddToCartButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      }));
      // Optional: Show success notification 
    } catch (error) {
      // Optional: Show error notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center justify-center space-x-4 bg-gray-100 rounded-lg p-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="p-1 rounded-full hover:bg-gray-200"
          disabled={quantity <= 1}
        >
          <Minus className="w-5 h-5 text-gray-600" />
        </motion.button>

        <span className="font-bold text-xl min-w-[40px] text-center">
          {quantity}
        </span>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setQuantity(quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>

      {/* Add to Cart Button */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full h-12 bg-[#C41E3A] hover:bg-[#A3172D] text-white flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default AddToCartButton;