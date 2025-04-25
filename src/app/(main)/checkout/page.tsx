'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { orderApi } from '@/lib/api';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import DeliveryAddress from '@/components/checkout/DeliveryAddress';
import OrderSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      
      const orderData = {
        restaurantId: items[0]?.restaurantId, // Assuming all items are from same restaurant
        items: items.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions || '',
        })),
        deliveryAddress: address,
        paymentMethod,
      };

      await orderApi.create(orderData);
      clearCart();
      router.push('/order-confirmation');
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <DeliveryAddress 
                address={address}
                onChange={setAddress}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <PaymentMethod 
                selectedMethod={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <OrderSummary />
              
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || !address}
                className={`w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-200 ${
                  (isSubmitting || !address) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}