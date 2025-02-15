import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/user';
import { Clock, Pizza, CheckCircle, Truck, MapPin } from 'lucide-react';
import { Loader } from 'lucide-react';
import EmptyState from '../components/EmptyState';

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await userService.getUserOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Preparing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  console.log(orders)

  const formatDate = (dateString) => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!orders.length) return (
    <EmptyState
      icon={<Pizza size={48} className="text-orange-500" />}
      title="No Past Orders"
      description="Your delicious pizza journey starts here! Place your first order and we'll keep track of it here."
    />
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="mb-2 sm:mb-0">
                <h2 className="text-lg font-semibold">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  <Clock className="inline-block w-4 h-4 mr-1" />
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <p className="text-lg font-bold text-orange-600">
                  ${order.total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div className="border-t border-gray-100 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Items List */}
                <div>
                  <h3 className="font-medium mb-3">Items Ordered</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <Pizza className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.productId.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity}x {item.size.toLowerCase()}
                            {item.toppings.length > 0 && ` • ${item.toppings.join(', ')}`}
                          </p>
                          {item.specialInstructions && (
                            <p className="text-sm text-gray-400 mt-1">
                              "{item.specialInstructions}"
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div>
                  <h3 className="font-medium mb-3">Delivery Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Delivery Address</p>
                        <p className="text-gray-600">
                          {order.deliveryAddress.street},<br />
                          {order.deliveryAddress.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Tracking Number</p>
                        <p className="text-gray-600">
                          {order.trackingNumber || 'Not available'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reorder Button */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <Link
                to={`/menu`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Reorder Items
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastOrders;