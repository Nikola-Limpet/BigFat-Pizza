import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { removeFromCart, updateQuantity, updateSpecialInstructions, saveForLater, moveToCart } from '@redux/features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);

  const navigate = useNavigate();



  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  // Price calculations
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const taxes = subtotal * 0.07;
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-pacifico text-[#C41E3A] mb-8">Your Cart</h1>

      <Link
        to="/menu"
        className="flex items-center gap-2 mb-4 sm:mb-2 px-3 sm:px-4 py-2 bg-stone-400 w-fit rounded-md text-[#6B4226] hover:text-[#C41E3A] transition-colors"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Back to Menu</span>
      </Link>

      <div className="lg:flex gap-4 md:gap-8">
        {/* Cart Items Section */}
        <div className="lg:w-2/3 space-y-4 md:space-y-6">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.uniqueId}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg self-start"
                />

                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">{item.name}</h3>
                      {/* Customizations */}
                      {item.customizations?.size && (
                        <p className="text-[#6B4226] text-sm p-1 md:p-2">
                          Size: {item.customizations.size.name}
                        </p>
                      )}
                      {item.customizations?.toppings && (
                        <p className="text-[#6B4226] text-sm p-1 md:p-2">
                          Topping: {item.customizations.toppings.map(topping => topping.name).join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.uniqueId))}
                      className="text-[#6B4226] hover:text-[#C41E3A]"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <div className="flex items-center gap-2 bg-[#FFA726]/10 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                        <button
                          onClick={() => dispatch(updateQuantity({
                            uniqueId: item.uniqueId,
                            quantity: item.quantity - 1
                          }))}
                          className="text-[#C41E3A] hover:text-[#A3172D] text-sm sm:text-base"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({
                            uniqueId: item.uniqueId,
                            quantity: item.quantity + 1
                          }))}
                          className="text-[#C41E3A] hover:text-[#A3172D] text-sm sm:text-base"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-lg font-bold text-[#C41E3A]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div className="mt-3 sm:mt-4">
                    <label
                      htmlFor={`instructions-${item.uniqueId}`}
                      className="block text-sm font-medium text-[#6B4226] mb-2"
                    >
                      Special Instructions
                    </label>
                    <textarea
                      id={`instructions-${item.uniqueId}`}
                      placeholder="Add special instructions for your pizza (e.g., extra crispy, light sauce)"
                      value={item.specialInstructions || ''}
                      onChange={(e) => dispatch(updateSpecialInstructions({
                        uniqueId: item.uniqueId,
                        instructions: e.target.value
                      }))}
                      className="w-full min-h-[80px] p-2 sm:p-3 text-sm sm:text-base text-[#6B4226]
                        border-2 border-[#FFA726]/30 rounded-lg placeholder:text-[#6B4226]/60
                        focus:border-[#FFA726] focus:ring-2 focus:ring-[#FFA726]/20 hover:border-[#FFA726]/50
                        transition-colors resize-y
                        bg-[#FFF9F0]"
                      maxLength={200}
                    />

                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-[#6B4226]/60">
                        {item.specialInstructions?.length || 0}/200 characters
                      </p>
                      {item.specialInstructions?.length > 0 && (
                        <button
                          onClick={() => dispatch(updateSpecialInstructions({
                            uniqueId: item.uniqueId,
                            instructions: ''
                          }))}
                          className="text-xs text-[#C41E3A] hover:text-[#A3172D]"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-8">
            <h2 className="text-xl md:text-2xl font-pacifico text-[#C41E3A] mb-4 sm:mb-6">Order Summary</h2>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Subtotal ({items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-[#FFA726]/20 pt-3 sm:pt-4 mb-4 sm:mb-6">
              <div className="flex justify-between text-lg sm:text-xl font-bold">
                <span>Total</span>
                <span className="text-[#C41E3A]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#C41E3A] text-white py-3 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-[#A3172D] disabled:opacity-50"
              disabled={items.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Cart;