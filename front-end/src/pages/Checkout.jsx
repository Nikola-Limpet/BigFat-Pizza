import { useState } from 'react';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import CartReview from './CartReview';
import AddressForm from '@/components/checkout/AddressForm';
import OrderConfirmation from './OrderConfirmation';
import PaymentConfirmation from '@/components/checkout/PaymentConfirmation';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '@/redux/features/cartSlice'; // Make sure to create this action
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/order';
import { useToast } from '@/contexts/ToastContext';
import { useMutation } from '@tanstack/react-query';
import { StretchHorizontal } from 'lucide-react';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryData, setDeliveryData] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();


  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.33;
  const taxes = subtotal * 0.07;
  const total = subtotal + deliveryFee + taxes;

  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: (data) => {
      setOrderId(data._id);
      dispatch(clearCart());
      showToast('Order placed successfully! 🍕', 'success');
    },
    onError: (error) => {
      showToast(error.message, 'error');
    }
  })

  const handleConfirmOrder = async () => {
    const orderData = {
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        size: item.customizations?.size?.name || 'Regular',
        toppings: item.customizations?.toppings?.map(t => t.name) || [],
        specialInstructions: item.specialInstructions
      })),
      total,
      deliveryAddress: {
        street: deliveryData.street,
        city: deliveryData.city,
      },
      deliveryTime: deliveryData.deliveryTime,
      userId: user.id
    };
    await createOrderMutation.mutateAsync(orderData);
    setActiveStep(3);

  };

  const handleTrackOrder = () => {
    navigate(`/past-orders/`);
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
            onNext={handleConfirmOrder}
            total={total}
            onBack={() => setActiveStep(1)}
            isLoading={createOrderMutation.isPending}
          />
        );
      case 3:
        return (
          <OrderConfirmation
            orderNumber={orderId}
            address={deliveryData}
            payment={{
              method: 'cash',
              amount: total,
              message: 'Please prepare exact change if possible'
            }}
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