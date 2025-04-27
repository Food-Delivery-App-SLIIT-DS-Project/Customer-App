'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function Nav() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState('');
  const { isLoggedIn, username, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-black shadow-md">
        <div className="text-lg font-bold">QuickGrubs</div>
        <LoadingSpinner />
      </nav>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-black shadow-md">
      <Link href="/" className="text-lg font-bold text-gray-800 dark:text-white">
        QuickGrubs
      </Link>
      
      <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300 items-center">
        {isLoggedIn ? (
          <>
            <Link href="/home" className="hover:text-gray-900 dark:text-white">Home</Link>
            <Link href="/cart" className="hover:text-gray-900 dark:text-white">Cart</Link>
            <div className="relative group">
              <span className="text-gray-800 dark:text-white cursor-pointer">
                Hello {username ? username : 'user'}!
              </span>
              <button 
                onClick={handleLogout}
                className="absolute left-0 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors
                          opacity-0 group-hover:opacity-100 -translate-y-full group-hover:translate-y-0
                          transition-all duration-200 ease-in-out"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link href="/about" className="hover:text-gray-900 dark:hover:text-white">About</Link>
            <Link 
              href="/login" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}