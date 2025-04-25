import Image from 'next/image';
import { Restaurant } from '@/lib/types';

export default function RestaurantHeader({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="relative bg-gray-800 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={restaurant.image || '/images/restaurant-placeholder.jpg'}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-gray-300 mb-4">{restaurant.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{restaurant.rating}</span>
              </div>
              <span>•</span>
              <span>{restaurant.deliveryTime} delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}