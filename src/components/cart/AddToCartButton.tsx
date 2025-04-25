'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export function AddToCartButton({
  item,
  restaurantId,
}: {
  item: {
    id: string;
    name: string;
    price: number;
  };
  restaurantId: string;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      ...item,
      quantity,
      restaurantId,
    });
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center border border-gray-300 rounded-md mr-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-2 py-1 text-gray-600"
        >
          -
        </button>
        <span className="px-2">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-2 py-1 text-gray-600"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
      >
        Add
      </button>
    </div>
  );
}