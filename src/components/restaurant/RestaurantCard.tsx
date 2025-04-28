import Link from 'next/link';
import Image from 'next/image';
import { Restaurant } from '@/lib/types';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
        <div className="relative h-48 w-full">
          <Image
            src={'/restaurant-placeholder.jpg'}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 px-2 py-1 rounded-full shadow-sm flex items-center">
            <span className="text-yellow-500 text-sm font-bold">★</span>
            <span className="ml-1 text-xs font-medium text-gray-800 dark:text-white">
              4.5
            </span>
          </div>
          <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-900 px-2 py-1 rounded-full shadow-sm">
            <span className="text-xs font-medium text-gray-800 dark:text-white">
              25-35 min
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Italian • American</span>
            <span className="mx-2">•</span>
            <span>$$</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded mr-2">
              Fast Delivery
            </span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
              Popular
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}