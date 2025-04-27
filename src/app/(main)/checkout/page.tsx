'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import DeliveryAddress from '@/components/checkout/DeliveryAddress';
import OrderSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from '@/components/checkout/Checkout';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const items = cart.reduce((total, item) => total + item.quantity, 0);
  
  // total amount
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const deliveryFee = subtotal > 0 ? 2.99 : 0; 
    const tax = subtotal * 0.1;
    setAmount(subtotal + deliveryFee + tax);
  }, []);
  

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      
      // await orderApi.create(orderData);
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
            
            {/* <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <PaymentMethod 
                selectedMethod={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div> */}
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "usd",
              }}
            >
              <Checkout amount={amount} address={address} />
            </Elements>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <OrderSummary />
              
              {/* <button 
                onClick={handleSubmit}
                disabled={isSubmitting || !address}
                className={`w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-200 ${
                  (isSubmitting || !address) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}