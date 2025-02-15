import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/services/order';

import { BarChart3, Clock, DollarSign, Truck } from 'lucide-react';
import StatsCard from '../ui/StatesCard';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: orderService.getDashboardStats,
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  console.log(stats);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C41E3A]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[#C41E3A] mb-8">Admin Dashboard</h1>
      <button
        onClick={() => navigate('/admin/orders')}
        className="bg-[#C41E3A] text-white px-6 py-2 m-2  rounded-lg hover:bg-[#A3172D] transition-colors"
      >
        View All Orders
      </button>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={<BarChart3 className="h-6 w-6" />}
          color="bg-blue-100 text-blue-800"
        />
        <StatsCard
          title="Pending Orders"
          value={stats?.pendingOrders || 0}
          icon={<Clock className="h-6 w-6" />}
          color="bg-yellow-100 text-yellow-800"
        />
        <StatsCard
          title="Revenue"
          value={`$${stats?.totalRevenue?.toFixed(2) || '0'}`}
          icon={<DollarSign className="h-6 w-6" />}
          color="bg-green-100 text-green-800"
        />
        <StatsCard
          title="In Transit"
          value={stats?.inTransit || 0}
          icon={<Truck className="h-6 w-6" />}
          color="bg-purple-100 text-purple-800"
        />
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#6B4226]">Recent Orders</h2>
          <span className="text-sm text-gray-500">Last 5 orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.map(order => (
                <tr key={order._id} className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/orders/${order._id}`)}>
                  <td className="px-4 py-4 text-sm font-medium text-[#6B4226]">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {order.userId?.username}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'MM/dd/yyyy HH:mm')}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-[#C41E3A]">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'In Transit' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



export default AdminDashboard;