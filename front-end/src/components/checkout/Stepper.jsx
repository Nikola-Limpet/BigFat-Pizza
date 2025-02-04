import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = ['Cart Review', 'Delivery Info', 'Payment', 'Confirmation'];

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      navigate('/order-confirmation');
    }
  };

  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={step} className={`step ${index <= activeStep ? 'active' : ''}`}>
          <div className="step-number">{index + 1}</div>
          <div className="step-title">{step}</div>
        </div>
      ))}
    </div>
  );
};