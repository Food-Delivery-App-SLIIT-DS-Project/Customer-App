'use client';

import { useCart } from '@/context/CartContext';

export default function CartSummary() {
  const { cart } = useCart(); 
  
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 2.99 : 0; 
  const tax = subtotal * 0.1;
  const total = subtotal + deliveryFee + tax;
  const inCheckout = true;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({cart.reduce((count, item) => count + item.quantity, 0)} items)</span>
            <p className="text-sm text-gray-500">
            {cart.map((item) => (
              <span key={item.id}>
              {item.name} x {item.quantity}
              <br />
              </span>
            ))}
            </p>
            <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      {!inCheckout && (
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 disabled:opacity-50"
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </button>
      )}
    </div>
  );
}