'use client';
import { useState } from 'react';

type Order = {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      items: [
        { name: 'Vegetable Pizza', quantity: 2, price: 12.99 },
        { name: 'Chocolate Cake', quantity: 1, price: 8.50 },
      ],
      total: 34.48,
      status: 'Delivered',
      trackingNumber: 'TRK789456123',
    },
    {
      id: 'ORD-12346',
      date: '2023-05-18',
      items: [
        { name: 'Chicken Burger', quantity: 3, price: 9.99 },
        { name: 'French Fries', quantity: 2, price: 4.50 },
      ],
      total: 38.97,
      status: 'Shipped',
      trackingNumber: 'TRK987654321',
    },
    {
      id: 'ORD-12347',
      date: '2023-05-20',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 10.99 },
        { name: 'Garlic Bread', quantity: 1, price: 3.99 },
        { name: 'Soda', quantity: 2, price: 2.50 },
      ],
      total: 20.48,
      status: 'Processing',
    },
  ]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <h1 className="text-3xl font-bold text-gray-200 mb-6">Your Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-5 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-3 sm:mb-0">
                  <h2 className="text-lg font-semibold text-gray-800">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-medium text-gray-700 mb-3">Items</h3>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600">{item.quantity} ×</span>
                      <span className="ml-2 font-medium text-gray-800">{item.name}</span>
                    </div>
                    <span className="text-gray-800">${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  {order.trackingNumber && (
                    <p className="text-sm text-gray-600">
                      Tracking: <span className="font-medium">{order.trackingNumber}</span>
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-lg font-bold text-gray-800">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                View Details
              </button>
              {order.status === 'Shipped' && (
                <button className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-800">
                  Track Order
                </button>
              )}
              {order.status === 'Delivered' && (
                <button className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800">
                  Reorder
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};