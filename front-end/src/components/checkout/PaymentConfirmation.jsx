import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Banknote } from 'lucide-react';
import { Button } from '@/components/common/Button';

const PaymentConfirmation = ({ total, onNext, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-pacifico text-[#C41E3A] mb-6">Payment</h2>

      <div className="space-y-6">
        <div className="bg-[#FFF5E6] p-4 rounded-lg">
          <h3 className="font-bold mb-2">Order Total</h3>
          <p className="text-2xl font-bold text-[#C41E3A]">${total.toFixed(2)}</p>
        </div>

        <div className="bg-[#FFF5E6] p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Banknote className="w-6 h-6 text-[#C41E3A]" />
            <h3 className="font-bold text-lg">Cash on Delivery</h3>
          </div>
          <p className="text-[#6B4226]">
            Pay in cash when your delicious pizza arrives at your doorstep.
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
            <div>
              <p className="text-yellow-700">
                Please prepare <span className="font-bold">${total.toFixed(2)}</span> in cash.
                Having exact change ready will help our delivery process.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="bg-gray-100 hover:bg-gray-200"
          >
            Back
          </Button>
          <Button
            onClick={onNext}

            className="bg-[#C41E3A] hover:bg-[#A3172D] text-white"
          >
            Confirm Order
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentConfirmation;