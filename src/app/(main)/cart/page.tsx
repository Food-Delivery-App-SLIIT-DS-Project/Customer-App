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
  const deliveryFee = subtotal > 0 ? 200.00 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-50">Your Cart</h1>
          {cart.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Cart
            </button>
          )}
        </div>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
            <Link 
              href="/home" 
              className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
            >
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Your Items</h2>
                
                {cart.map((item) => (
                  <div key={item.id} className="border-b border-gray-100 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-start">
                          <div className="bg-gray-100 rounded-lg w-2 h-16 flex-shrink-0"></div>
                          <div className="ml-4">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                            <p className="text-indigo-600 font-medium mt-2">Rs.{item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        {item.specialInstructions && (
                          <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Note:</span> {item.specialInstructions}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end ml-4">
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        
                        <div className="flex items-center border border-gray-200 rounded-lg mt-4">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-lg"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
                    <span className="font-medium">Rs.{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">Rs.{deliveryFee.toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Rs.{(subtotal * 0.05).toFixed(2)}</span>
                  </div> */}
                  
                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">Rs.{(subtotal + deliveryFee).toFixed(2)}</span>
                  </div>
                </div>
                
                <Link 
                  href="/checkout" 
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition duration-200 block text-center"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Estimated delivery: 30-45 minutes</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}