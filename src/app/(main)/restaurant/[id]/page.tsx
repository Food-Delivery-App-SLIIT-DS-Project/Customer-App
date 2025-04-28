'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Restaurant } from '@/lib/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';


export default function RestaurantPage() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { cart, addItem, clearCart } = useCart();
  
  // Hard-coded restaurants with complete menus
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Italian Bistro',
      description: 'Authentic Italian cuisine with homemade pasta',
      imageUrl: '/images/italian-restaurant.jpg',
      menuItems: [
        {
          id: 101,
          name: 'Margherita Pizza',
          description: 'Tomato sauce, mozzarella, and basil',
          price: 12.99,
          category: 'Pizza'
        },
        {
          id: 102,
          name: 'Spaghetti Carbonara',
          description: 'Pasta with eggs, cheese, pancetta, and pepper',
          price: 14.99,
          category: 'Pasta'
        },
        {
          id: 103,
          name: 'Tiramisu',
          description: 'Classic Italian dessert with coffee flavor',
          price: 7.99,
          category: 'Desserts'
        },
        {
          id: 104,
          name: 'Bruschetta',
          description: 'Toasted bread topped with tomatoes and garlic',
          price: 6.99,
          category: 'Appetizers'
        }
      ]
    },
    {
      id: 2,
      name: 'Burger Joint',
      description: 'Gourmet burgers and craft beers',
      imageUrl: '/images/burger-restaurant.jpg',
      menuItems: [
        {
          id: 201,
          name: 'Classic Cheeseburger',
          description: 'Beef patty with cheese, lettuce, and special sauce',
          price: 9.99,
          category: 'Burgers'
        },
        {
          id: 202,
          name: 'Bacon Burger',
          description: 'Beef patty with bacon and cheddar cheese',
          price: 11.99,
          category: 'Burgers'
        },
        {
          id: 203,
          name: 'Sweet Potato Fries',
          description: 'Crispy sweet potato fries with dipping sauce',
          price: 4.99,
          category: 'Sides'
        },
        {
          id: 204,
          name: 'Chocolate Milkshake',
          description: 'Creamy chocolate milkshake',
          price: 5.99,
          category: 'Drinks'
        }
      ]
    },
    {
      id: 3,
      name: 'Sushi Palace',
      description: 'Fresh Japanese sushi and sashimi',
      imageUrl: '/images/sushi-restaurant.jpg',
      menuItems: [
        {
          id: 301,
          name: 'California Roll',
          description: 'Crab, avocado, and cucumber',
          price: 8.99,
          category: 'Sushi Rolls'
        },
        {
          id: 302,
          name: 'Salmon Nigiri',
          description: 'Fresh salmon over pressed rice',
          price: 6.99,
          category: 'Nigiri'
        },
        {
          id: 303,
          name: 'Miso Soup',
          description: 'Traditional Japanese soybean soup',
          price: 3.99,
          category: 'Soups'
        },
        {
          id: 304,
          name: 'Green Tea Ice Cream',
          description: 'Japanese-style green tea flavored ice cream',
          price: 5.99,
          category: 'Desserts'
        }
      ]
    }
  ];

  useEffect(() => {
    const restaurantId = Number(params.id);
    const foundRestaurant = restaurants.find(r => r.id === restaurantId);
    setRestaurant(foundRestaurant || null);
    setLoading(false);
  }, [params.id]);

  const handleAddToCart = (menuItem: MenuItem) => {
    // Check if cart has items from a different restaurant
    if (cart.length > 0 && cart[0].restaurantId !== restaurant.id.toString()) {
      if (confirm('Your cart contains items from another restaurant. Adding this item will clear your current cart. Continue?')) {
        clearCart();
      } else {
        return;
      }
    }

    const cartItem: CartItem = {
      ...menuItem,
      quantity: 1,
      restaurantId: restaurant.id.toString(),
      specialInstructions: ''
    };
    
    addItem(cartItem);
  };

  if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
          <LoadingSpinner />
        </div>
      );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <svg
          className="h-16 w-16 text-gray-400 mb-4"
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
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Restaurant not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't find the restaurant you're looking for.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  // Get unique categories
  const categories = [...new Set(restaurant.menuItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Restaurant Hero Section */}
      <div className="relative h-64 w-full bg-gray-200">
        <Image
          src={'/restaurant-placeholder.jpg'}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
  
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Restaurant Info Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                  <p className="text-gray-600 mb-4">{restaurant.description}</p>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 font-medium">4.5</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  <span>25-35 min • $$</span>
                </div>
                <Link 
                  href="/cart" 
                  className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  <span>View Cart ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
                  <svg 
                    className="w-5 h-5 ml-1"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
  
          {/* Menu Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
              
              {/* Menu by Categories */}
              {categories.map(category => (
                <div key={category} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                    {category}
                  </h3>
                  <div className="space-y-6">
                    {restaurant.menuItems
                      .filter(item => item.category === category)
                      .map(item => (
                        <div 
                          key={item.id} 
                          className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                        >
                          <div className="flex-1 pr-4">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                            <span className="font-medium text-indigo-600 mt-2 inline-block">
                              Rs.{item.price.toFixed(2)}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleAddToCart(item)}
                            className="flex-shrink-0 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Floating Cart Button (Mobile) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Link
          href="/cart"
          className="flex items-center justify-center h-14 w-14 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <span className="text-white font-medium">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
          <svg
            className="h-6 w-6 text-white ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}