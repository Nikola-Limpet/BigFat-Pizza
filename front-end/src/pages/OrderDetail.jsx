import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { orderService } from '../services/order';
import { ChevronLeft } from 'lucide-react';

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrderById(orderId)
  });

  if (isLoading) {
    return <div>Loading order details...</div>;
  }


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="group inline-flex items-center gap-2 px-3 py-2 mb-6 
          text-sm font-medium rounded-lg
          bg-[#C41E3A]/10 text-[#C41E3A]
          hover:bg-[#C41E3A]/20 transition-colors duration-200"
        aria-label="Go back to previous page"
      >
        <ChevronLeft
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
        />
        <span>Back</span>
      </button>
      <h1 className="text-2xl font-bold mb-4">Order #{orderId}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Order details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
          <p>{order.deliveryAddress.street}</p>
          <p>{order.deliveryAddress.city}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Items</h2>
          {order.items.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{item.productId?.name}</p>
              <p className="text-sm text-gray-600">
                Size: {item.size} × {item.quantity}
              </p>
              {item.toppings.length > 0 && (
                <p className="text-sm text-gray-600">
                  Toppings: {item.toppings.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <p className="flex justify-between">
            <span>Total:</span>
            <span className="font-bold">${order.total.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Status: {order.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;