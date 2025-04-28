'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function OrderConfirmationPage(searchParams: { amount: any, address: any }) {
  const { amount } = searchParams;
  const { address } = searchParams;
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCart();
    // saveOrder();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-medium">Estimated delivery time:</p>
            <p className="text-lg">30-45 minutes</p>
          </div>
          
          <Link 
            href="/home" 
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
  );
}