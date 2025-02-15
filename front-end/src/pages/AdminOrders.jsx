import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { orderService } from '@/services/order';
import { Select } from '@/components/common/select/Select';
import { useNavigate } from 'react-router-dom';

// Define status options with proper values
const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Preparing', label: 'Preparing' },
  { value: 'In Transit', label: 'In Transit' },
  { value: 'Delivered', label: 'Delivered' }
];

const AdminOrders = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: ordersData, refetch } = useQuery({
    queryKey: ['adminOrders', page, statusFilter],
    queryFn: () => orderService.getAllOrders({ page, status: statusFilter })
  });

  const statusMutation = useMutation({
    mutationFn: ({ orderId, status }) =>
      orderService.updateOrderStatus(orderId, status),
    onSuccess: () => refetch()
  });

  const handleStatusChange = (orderId) => (newStatus) => {
    statusMutation.mutate({ orderId, status: newStatus });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#C41E3A]">Manage Orders</h1>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="Filter by status" />
          </Select.Trigger>
          <Select.Content>
            {statusOptions.map(({ value, label }) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordersData?.orders?.map(order => (
              <tr key={order._id}>
                <td className="px-6 py-4">#{order._id.slice(-6)}</td>
                <td className="px-6 py-4">{order.userId?.username}</td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <Select
                    value={order.status}
                    onValueChange={handleStatusChange(order._id)}
                  >
                    <Select.Trigger className="w-[150px]">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      {statusOptions
                        .filter(option => option.value !== 'all')
                        .map(({ value, label }) => (
                          <Select.Item key={value} value={value}>
                            {label}
                          </Select.Item>
                        ))}
                    </Select.Content>
                  </Select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium 
                      rounded-md transition-colors duration-200
                      bg-[#C41E3A]/10 text-[#C41E3A] 
                      hover:bg-[#C41E3A]/20"
                      onClick={() => navigate(`/orders/${order._id}`)}
                      disabled={statusMutation.isPending}
                    >
                      <span>View Details</span>
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className='text-[#C41E3A] hover:text-[#A3172D] hover:underline'
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </button>
          <button
            className='text-[#C41E3A] hover:text-[#A3172D] hover:underline'
            variant="outline"
            disabled={page >= ordersData?.totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;