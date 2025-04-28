'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function OrderConfirmationPage(searchParams: { amount: any, address: any }) {
  const { amount } = searchParams;
  const { address } = searchParams;
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, isLoading, userId } = useAuth();

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const orderPayLoad = {
          "customerId": 'c4f1b0a2-3d5e-4f8b-9c7d-6a0e5f3b8c1d',
          "restaurantId": "92305ca1-7320-4912-9ab6-00e07dede74e",
          "deliveryId": "22904014-be55-4fd4-9b0e-92960387b3c5",
          "status": "PENDING",
          "totalPrice": amount,
          "items": [
            {
              "menuId": "2242e344-fdcf-42c6-bb40-20638216da7f",
              "quantity": 10,
              "price": 1.4
            }
          ]
        };
        const orderResponse = await apiRequest('/order', 'POST', orderPayLoad);
        const orderData = orderResponse.data as any;
        
        // const paymentPayLoad = {
        //   "orderId": orderData.id,
        //   "customerId": orderData.customerId,
        //   "amount": orderData.totalPrice,
        //   "paymentMethod": "Stripe",
        //   "transactionId": ""
        // };
        // const paymentResponse = await apiRequest('/payment', 'POST', paymentPayLoad);
        // const paymentData = paymentResponse.data as any;
      } catch (error) {
        console.error('Error saving order and payment: ', error);
      }
    };

    saveOrder();
    clearCart();
    setLoading(false);
  }, []);


  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center transform transition-all hover:shadow-xl">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
        <svg 
          className="w-10 h-10 text-green-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6">Your delicious food is being prepared and will be with you soon.</p>
      
      <div className="bg-gray-50 dark:bg-gray-100 p-5 rounded-lg mb-8 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Order #</span>
          <span className="font-medium">12345</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated delivery</span>
          <span className="font-medium">30-45 minutes</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-medium text-indigo-600">Rs. 2,450.00</span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link 
          href="/orders" 
          className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          View Order
        </Link>
        <Link 
          href="/home" 
          className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        We've sent the order details to your email at <span className="font-medium">user@example.com</span>
      </p>
    </div>
  </div>
);
}