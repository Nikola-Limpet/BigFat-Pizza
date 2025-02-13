import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { orderService } from '../services/order';

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrder(orderId)
  });

  if (isLoading) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
              <p className="font-medium">{item.product.name}</p>
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