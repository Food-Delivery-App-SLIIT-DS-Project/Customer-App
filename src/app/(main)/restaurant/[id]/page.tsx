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
        <header className="w-full sticky top-0 z-50 bg-gray-100 dark:bg-black shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            <div className="text-lg font-bold">QuickGrubs</div>
            <LoadingSpinner size="sm" />
          </div>
        </header>
      );
    }

  if (!restaurant) {
    return <div className="text-center py-8">Restaurant not found</div>;
  }

  // Get unique categories
  const categories = [...new Set(restaurant.menuItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Restaurant Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-64 w-full">
              <img
                // src={restaurant.imageUrl}
                src={'/restaurant-placeholder.jpg'}
                alt={restaurant.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              <div className="flex justify-between items-center">
                <Link href="/cart" className="text-blue-600 hover:underline">
                  View Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                </Link>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            
            {/* Menu by Categories */}
            {categories.map(category => (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">{category}</h3>
                <div className="space-y-4">
                  {restaurant.menuItems
                    .filter(item => item.category === category)
                    .map(item => (
                      <div key={item.id} className="flex justify-between items-start border-b pb-4">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          <span className="font-medium">${item.price.toFixed(2)}</span>
                        </div>
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="ml-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          Add to Cart
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
  );
}