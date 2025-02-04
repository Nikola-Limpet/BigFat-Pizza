import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/features/cartSlice';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <ChevronLeft className="w-6 h-6 text-[#C41E3A] cursor-pointer" />
          <h1 className="text-3xl font-bold text-[#2C1810] mx-4 font-pacifico">
            Your Pizza Cart
          </h1>
          <div className="bg-[#C41E3A] text-white px-3 py-1 rounded-full">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <img
              src="/empty-cart.png"
              alt="Empty cart"
              className="mx-auto h-64 w-64 mb-8"
            />
            <h2 className="text-2xl font-bold text-[#2C1810] mb-4">Mamma Mia! Your cart is empty</h2>
            <p className="text-[#6B4226] mb-8">Looks like someone's got room for more pizza!</p>
            <Link
              to="/menu"
              className="bg-[#C41E3A] text-white px-8 py-3 rounded-full hover:bg-[#A3172D] transition-colors font-medium"
            >
              Explore Our Menu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex gap-6">
                    {/* Pizza Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 rounded-xl object-cover border-4 border-[#FFA726]/20"
                    />

                    {/* Pizza Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold text-[#2C1810]">{item.name}</h2>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-[#6B4226] hover:text-[#C41E3A] transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-[#6B4226] mt-2">{item.description}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border rounded-full">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-[#C41E3A] hover:bg-[#FFA726]/10 rounded-l-full"
                          >
                            -
                          </button>
                          <span className="px-4 text-[#2C1810]">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-[#C41E3A] hover:bg-[#FFA726]/10 rounded-r-full"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-lg font-bold text-[#C41E3A]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 h-fit shadow-lg">
              <h2 className="text-2xl font-bold text-[#2C1810] mb-6 font-pacifico">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[#6B4226]">Subtotal:</span>
                  <span className="font-bold">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B4226]">Delivery Fee:</span>
                  <span className="font-bold">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B4226]">Taxes (10%):</span>
                  <span className="font-bold">${(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <hr className="my-4 border-[#FFA726]/20" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-[#2C1810]">Total:</span>
                  <span className="text-[#C41E3A]">
                    ${(calculateTotal() + 5 + (calculateTotal() * 0.1)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#C41E3A] text-white py-4 rounded-full mt-8 hover:bg-[#A3172D] 
                transition-colors font-medium flex items-center justify-center gap-2">
                Proceed to Checkout
                <ChevronRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-[#6B4226] mt-4">
                Free delivery for orders over $30!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;