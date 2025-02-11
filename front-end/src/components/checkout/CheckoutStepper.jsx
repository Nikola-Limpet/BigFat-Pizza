// CheckoutStepper.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const steps = ['Cart Review', 'Delivery Info', 'Payment', 'Confirmation'];

const CheckoutStepper = ({ activeStep, setActiveStep }) => {
  const navigate = useNavigate();

  const handleStepClick = (index) => {
    if (index < activeStep) {
      setActiveStep(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="flex justify-between relative">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex flex-col items-center relative z-10"
            style={{ width: `${100 / steps.length}%` }}
          >
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors
                ${index <= activeStep ? 'bg-[#C41E3A] text-white' : 'bg-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleStepClick(index)}
            >
              {index + 1}
            </motion.div>
            <span className={`text-sm mt-2 text-center ${index <= activeStep ? 'text-[#C41E3A]' : 'text-gray-500'}`}>
              {step}
            </span>
          </div>
        ))}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
          <motion.div
            className="h-full bg-[#C41E3A]"
            initial={{ width: 0 }}
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};


export default CheckoutStepper;