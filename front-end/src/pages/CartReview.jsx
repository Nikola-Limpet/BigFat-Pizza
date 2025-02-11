import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/common/Button';
import { motion } from 'framer-motion';


const CartReview = ({ onNext }) => {
  const { items } = useSelector((state) => state.cart);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const taxes = subtotal * 0.07;
  const total = subtotal + deliveryFee + taxes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-3xl font-pacifico text-[#C41E3A]">Review Your Order</h2>


      {items.length === 0 ? (
        <p className="text-center py-8">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.customizations?.size?.name} × {item.quantity}
                    </p>
                    {item.customizations?.toppings?.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Toppings: {item.customizations.toppings.map(t => t.name).join(', ')}
                      </p>
                    )}
                    {item.specialInstructions && (
                      <p className="text-sm text-gray-600 italic">
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>
                  <p className="font-bold text-[#C41E3A]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
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
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total</span>
              <span className="text-[#C41E3A]">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={onNext}
            className="w-full bg-[#C41E3A] hover:bg-[#A3172D] text-white py-3 rounded-full text-lg font-bold"
          >
            Continue to Delivery
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default CartReview;