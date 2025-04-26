// import { restaurantApi } from '@/lib/api';
import RestaurantCard from '@/components/restaurant/RestaurantCard';

export default async function HomePage() {
  // const { data: restaurants } = await restaurantApi.getAll();
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
    <div className="min-h-screen bg-gray-100">
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Restaurants Near You</h1>
        {restaurants.length === 0 ? (
          <p className="text-center text-gray-500">No restaurants available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}