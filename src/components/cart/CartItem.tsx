'use client';

import { useCart } from '@/context/CartContext';

export default function CartItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div>
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
        >
          -
        </button>
        <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
        >
          +
        </button>
        
        <button
          onClick={() => removeItem(item.id)}
          className="ml-4 text-red-500 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
}