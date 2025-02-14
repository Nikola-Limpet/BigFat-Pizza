import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/order';
import { useToast } from '@contexts/ToastContext';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const ORDER_STATUS = {
  PENDING: 'Pending',
  PREPARING: 'Preparing',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered'
};

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['adminOrders', page, statusFilter],
    queryFn: () => orderService.getAllOrders({ page, status: statusFilter })
  });

  const updateTrackingMutation = useMutation({
    mutationFn: ({ orderId, trackingNumber }) =>
      orderService.updateTrackingNumber(orderId, trackingNumber),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminOrders']);
      showToast('Tracking number updated successfully', 'success');
    },
    onError: (error) => {
      showToast(error.message, 'error');
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }) =>
      orderService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminOrders']);
      showToast('Order status updated successfully', 'success');
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#C41E3A]" />
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
      [ORDER_STATUS.PREPARING]: 'bg-blue-100 text-blue-800',
      [ORDER_STATUS.IN_TRANSIT]: 'bg-purple-100 text-purple-800',
      [ORDER_STATUS.DELIVERED]: 'bg-green-100 text-green-800'
    };
    return colors[status] || colors[ORDER_STATUS.PENDING];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#C41E3A] mb-8">Order Management</h1>

      {/* Filters and Controls */}
      <div className="flex items-center gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-[#C41E3A] focus:ring-[#C41E3A]"
        >
          <option value="">All Status</option>
          {Object.values(ORDER_STATUS).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <span className="text-sm text-gray-500">
          Total Orders: {data?.totalOrders || 0}
        </span>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>
                      <p className="font-medium">{order.userId.username}</p>
                      <p className="text-xs">{order.userId.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="max-w-xs">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-xs">
                          {item.quantity}x {item.productId.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      placeholder="Enter tracking #"
                      defaultValue={order.trackingNumber}
                      onBlur={(e) => {
                        if (e.target.value !== order.trackingNumber) {
                          updateTrackingMutation.mutate({
                            orderId: order._id,
                            trackingNumber: e.target.value
                          });
                        }
                      }}
                      className="w-32 rounded-md border-gray-300 text-sm shadow-sm 
                               focus:border-[#C41E3A] focus:ring-[#C41E3A]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => {
                        updateStatusMutation.mutate({
                          orderId: order._id,
                          status: e.target.value
                        });
                      }}
                      className={`rounded-md text-sm shadow-sm 
                                focus:border-[#C41E3A] focus:ring-[#C41E3A] 
                                ${getStatusColor(order.status)}`}
                    >
                      {Object.values(ORDER_STATUS).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>
                      <p>{order.deliveryAddress.street}</p>
                      <p>{order.deliveryAddress.city}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Page {page} of {data?.totalPages || 1}
        </p>
        <div className="flex gap-2">
          {[...Array(data?.totalPages || 0)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                ${page === i + 1
                  ? 'bg-[#C41E3A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;