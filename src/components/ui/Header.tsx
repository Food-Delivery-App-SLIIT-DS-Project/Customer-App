'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/home" className="text-xl font-bold text-green-600">
          FoodDelivery
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/home" className="text-gray-700 hover:text-green-600">
            Restaurants
          </Link>
          <Link href="/cart" className="relative text-gray-700 hover:text-green-600">
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}