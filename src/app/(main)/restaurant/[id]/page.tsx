import { restaurantApi } from '@/lib/api';
import RestaurantHeader from '@/components/restaurant/RestaurantHeader';
import MenuItem from '@/components/restaurant/MenuItem';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

export default async function RestaurantPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: restaurant } = await restaurantApi.getById(params.id);

  return (
    <div className="min-h-screen bg-gray-100">
      <RestaurantHeader restaurant={restaurant} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          
          <div className="space-y-6">
            {restaurant.menuCategories.map((category) => (
              <div key={category.id}>
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <MenuItem key={item.id} item={item}>
                      <AddToCartButton item={item} restaurantId={restaurant.id} />
                    </MenuItem>
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