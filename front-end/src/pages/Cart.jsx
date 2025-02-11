import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, ShoppingCart, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, updateSpecialInstructions, saveForLater, moveToCart } from '@redux/features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, savedItems } = useSelector(state => state.cart);

  // Price calculations
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const taxes = subtotal * 0.07;
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-pacifico text-[#C41E3A] mb-8">Your Cart</h1>

      <Link
        to="/menu"
        className="flex items-center gap-2 px-4 py-2 text-[#6B4226] hover:text-[#C41E3A] transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Menu
      </Link>
      {/* Active Cart Items */}
      <div className="lg:flex gap-8">
        <div className="lg:w-2/3 space-y-6">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-xl shadow-lg p-6 flex gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      {/* <p className="text-[#6B4226]">{item.size?.name}</p>
                      <p className="text-[#6B4226]">{item.size?.price}</p> */}
                      {item.customizations?.size && (
                        <p className="text-[#6B4226] p-2">Size: {item.customizations.size.name}</p>
                      )}
                      {item.customizations?.toppings && (
                        <p className="text-[#6B4226] p-2">
                          Topping:  {item.customizations.toppings.map(topping => topping.name).join(', ')}
                        </p>
                      )}


                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-[#6B4226] hover:text-[#C41E3A]"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-[#FFA726]/10 px-4 py-2 rounded-full">
                        <button
                          onClick={() => dispatch(updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1
                          }))}
                          className="text-[#C41E3A] hover:text-[#A3172D]"
                        >
                          -
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1
                          }))}
                          className="text-[#C41E3A] hover:text-[#A3172D]"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xl font-bold text-[#C41E3A]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <textarea
                    placeholder="Special instructions (e.g., extra cheese, no onions)"
                    value={item.specialInstructions || ''}
                    onChange={(e) => dispatch(updateSpecialInstructions({
                      id: item.id,
                      instructions: e.target.value
                    }))}
                    className="w-full p-2 border border-[#FFA726]/30 rounded-lg"
                  />

                  <button
                    onClick={() => dispatch(saveForLater(item.id))}
                    className="mt-4 flex items-center gap-2 text-[#6B4226] hover:text-[#C41E3A]"
                  >
                    <Save className="w-5 h-5" />
                    Save for Later
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className="text-2xl font-pacifico text-[#C41E3A] mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-[#FFA726]/20 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-[#C41E3A]">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-[#C41E3A] text-white py-4 rounded-full text-lg font-bold hover:bg-[#A3172D]">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Saved Items */}
      {savedItems.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-pacifico text-[#C41E3A] mb-6">Saved for Later</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {savedItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[#C41E3A] font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => dispatch(moveToCart(item.id))}
                      className="flex items-center gap-2 text-[#6B4226] hover:text-[#C41E3A]"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;