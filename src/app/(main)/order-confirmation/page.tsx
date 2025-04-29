'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get('amount');
  const address = searchParams.get('address');
  const transactionId = searchParams.get('payment_intent');
  const amount = amountParam ? parseFloat(amountParam) : 0;
  const { userId } = useAuth();

  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const orderPayLoad = {
          "customerId": userId,
          "restaurantId": "4207872f-4085-4b92-abac-9bf08e4738e6",
          "deliveryId": "ce805d9f-12df-4720-8ec4-4ab138974b3a",
          "status": "PENDING",
          "totalPrice": amount,
          "items": [
            {
              "menuId": "69d21b5d-e4c5-449f-b43d-63eae44d0f6b",
              "quantity": 10,
              "price": 1.4
            }
          ]
        };
        const orderResponse = await apiRequest('/order', 'POST', orderPayLoad);
        const order = orderResponse.data as any;
        setOrderData(order.data);
        console.log('Order saved successfully: ', order);
        
        const paymentPayLoad = {
          "orderId": order.data.orderId,
          "customerId": order.data.customerId,
          "amount": order.data.totalPrice,
          "paymentMethod": "Stripe",
          "status": "COMPLETED",
          "transactionId": transactionId?.toString(),
        };
        const paymentResponse = await apiRequest('/payment', 'POST', paymentPayLoad);
        const paymentData = paymentResponse.data as any;
        console.log('Payment saved successfully: ', paymentData);
      } catch (error) {
        console.error('Error saving order and payment: ', error);
      } finally {
        clearCart();
        setLoading(false);
      }
    };

    if (userId && amount > 0 && transactionId) {
      saveOrder();
    }
  }, [userId, amount]);


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
          <span className="font-medium">{orderData.orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated delivery</span>
          <span className="font-medium">30-45 minutes</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-medium text-indigo-600">Rs.{amount.toFixed(2)}</span>
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
    </div>
  </div>
);
}