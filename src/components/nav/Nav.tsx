'use client';

import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-black shadow-md">
      <Link href="/" className="text-lg font-bold text-gray-800 dark:text-white">
        🍽 FoodieApp
      </Link>
      <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300">
        <Link href="/home">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
}
