import { useState } from 'react';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import CartReview from './CartReview';
import AddressForm from '@/components/checkout/AddressForm';
import OrderConfirmation from './OrderConfirmation';
import PaymentConfirmation from '@/components/checkout/PaymentConfirmation';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '@/redux/features/cartSlice'; // Make sure to create this action
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryData, setDeliveryData] = useState(null);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const taxes = subtotal * 0.07;
  const total = subtotal + deliveryFee + taxes;

  // const handlePaymentConfirmation = () => {
  //   const orderId = `ORD${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
  //   // Here you would typically save the order to your backend
  //   dispatch(clearCart()); // Clear the cart after successful order
  //   setActiveStep(3);
  // };

  const handleTrackOrder = () => {
    navigate('/orders'); // Navigate to orders page
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <CartReview onNext={() => setActiveStep(1)} />;
      case 1:
        return (
          <AddressForm
            onNext={(data) => {
              setDeliveryData(data);
              setActiveStep(2);
            }}
            onBack={() => setActiveStep(0)}
          />
        );
      case 2:
        return (
          <PaymentConfirmation
            onNext={() => setActiveStep(3)}
            total={total}
            onBack={() => setActiveStep(1)}
          />
        );
      case 3:
        return (
          <OrderConfirmation
            address={deliveryData}
            payment={{
              method: 'cash',
              amount: total,
              message: 'Please prepare exact change if possible'
            }}
            orderId={`ORD${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`.toUpperCase()}
            onNext={handleTrackOrder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <CheckoutStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={[
          'Review Cart',
          'Delivery Details',
          'Payment',
          'Confirmation'
        ]}
      />
      {renderStep()}
    </div>
  );
};

export default Checkout;