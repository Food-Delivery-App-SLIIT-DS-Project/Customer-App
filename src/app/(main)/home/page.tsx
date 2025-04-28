// import { restaurantApi } from '@/lib/api';
'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  
  async function fetchRestaurants() {
    try {
      const response = await apiRequest('/restaurants', 'GET');
      const data = response.data;
      console.log('Restaurants:', data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } 
  }
  
  const restaurants = [
    {
      id: 1,
      name: 'Restaurant A',
      description: 'Delicious food from Restaurant A',
      imageUrl: '/images/restaurant-a.jpg',
    },
    {
      id: 2,
      name: 'Restaurant B',
      description: 'Tasty meals from Restaurant B',
      imageUrl: '/images/restaurant-b.jpg',
    },
    {
      id: 3,
      name: 'Restaurant C',
      description: 'Yummy dishes from Restaurant C',
      imageUrl: '/images/restaurant-c.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Discover Restaurants
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Order from your favorite local spots
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
  
        {restaurants.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              No restaurants available
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              We couldn't find any restaurants in your area.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}