import Link from 'next/link';
import Image from 'next/image';
import { Restaurant } from '@/lib/types';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            // src={restaurant.image || restaurant.imageUrl || '/images/restaurant-placeholder.jpg'}
            src={'/restaurant-placeholder.jpg'}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
          {/* <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p> */}
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            {/* <span className="ml-1 text-gray-700">{restaurant.rating}</span> */}
            <span className="mx-2 text-gray-300">•</span>
            {/* <span className="text-gray-700">{restaurant.deliveryTime}</span> */}
          </div>
        </div>
      </div>
    </Link>
  );
}