'use client';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  // const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
      const fetchOrders = async () => {
        try {
          const orderResponse = await apiRequest(`/order/user/${userId}`, 'GET');
          setOrders(orderResponse.data.data.orders);
          console.log('Orders fetched successfully: ', orders);
        } catch (error) {
          console.error('Error saving order and payment: ', error);
        } finally {
          setLoading(false);
        }
      };
  
      if (userId) {
        fetchOrders();
      }
    }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
     <LoadingSpinner />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Your Orders</h1>

      {!orders ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">You have no orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.orderId} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-3 sm:mb-0">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Order #{order.orderId}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Customer ID: {order.customerId}...</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Items</h3>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 dark:text-gray-400">{item.quantity} ×</span>
                      <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">Menu Item (ID: {item.menuId}...)</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">${(item.price / 100).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center">
                <div>
                  {order.deliveryId && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Delivery: <span className="font-medium">{order.deliveryId}...</span>
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">Rs.{(order.totalPrice).toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
              {order.status === 'DELIVERED' && (
                <button className="px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                  Reorder
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};