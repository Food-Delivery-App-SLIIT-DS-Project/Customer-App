'use client';

import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 5.99 : 0; // Example delivery fee
  const total = subtotal + deliveryFee;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-lg mb-4">Your cart is empty</p>
              <Link href="/home" className="text-blue-600 hover:underline">
                Browse restaurants
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  {cart.map((item) => (
                    <div key={item.id} className="border-b pb-4 mb-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          -
                        </button>
                        <span className="mx-4">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          +
                        </button>
                      </div>
                      {item.specialInstructions && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Special Instructions: {item.specialInstructions}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link 
                    href="/checkout" 
                    className="w-full mt-4 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-200 block text-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}