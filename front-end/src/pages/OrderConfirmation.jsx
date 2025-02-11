import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock, Banknote, Printer } from 'lucide-react';
import { Button } from '@/components/common/Button';

const OrderConfirmation = ({ address, payment, orderId, onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6 flex flex-col items-center"
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <div className="flex justify-center">
          <h2 className="text-3xl font-pacifico text-[#C41E3A]">Order Confirmed!</h2>
        </div>
        <p className="text-[#6B4226] text-lg">
          Thank you! Your delicious pizza is being prepared with love.
        </p>
        <p className="text-sm text-[#6B4226]/80">Order ID: #{orderId}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 w-full">
        <div className="bg-[#FFF5E6] p-6 rounded-xl">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#C41E3A] mt-1" />
            <div>
              <h3 className="font-bold text-[#6B4226] mb-2">Delivery Address</h3>
              <p className="text-[#6B4226]/80">{address?.street}</p>
              <p className="text-[#6B4226]/80">{address?.city}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF5E6] p-6 rounded-xl">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#C41E3A] mt-1" />
            <div>
              <h3 className="font-bold text-[#6B4226] mb-2">Delivery Time</h3>
              <p className="text-[#6B4226]/80">
                {new Date(address?.deliveryTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF5E6] p-6 rounded-xl md:col-span-2">
          <div className="flex items-start gap-3">
            <Banknote className="w-5 h-5 text-[#C41E3A] mt-1" />
            <div>
              <h3 className="font-bold text-[#6B4226] mb-2">Payment Details</h3>
              <p className="text-[#6B4226]/80">
                Method: {payment?.method === 'cash' ? 'Cash on Delivery' : payment?.method}
              </p>
              {payment?.amount && (
                <p className="text-[#6B4226]/80">
                  Amount Due: ${payment.amount.toFixed(2)}
                </p>
              )}
              <p className="mt-2 text-sm text-[#6B4226]/60">
                {payment?.method === 'cash'
                  ? 'Please prepare exact change if possible'
                  : 'Payment has been processed successfully'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-4 w-full">
        <Button
          onClick={onNext}
          className="w-full md:w-auto bg-[#C41E3A] hover:bg-[#A3172D] text-white px-8 py-3 rounded-full"
        >
          Track Your Order
        </Button>
        <button
          onClick={() => window.print()}
          className="text-[#6B4226] hover:text-[#C41E3A] text-sm font-medium"
        >
          <Printer className="w-5 h-5 inline-block mr-2" />
          Print Receipt
        </button>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;