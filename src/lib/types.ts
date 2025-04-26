export interface Restaurant {
  id: string | number;  // Allow both string and number
  name: string;
  description: string;
  image?: string;  // Make optional
  imageUrl?: string; // Add alternative property
  cuisine?: string;
  rating?: number;
  deliveryTime?: string;
  menuCategories?: MenuCategory[];
}
  
  export interface MenuCategory {
    id: string;
    name: string;
    items?: MenuItem[];
  }
  
  export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  }
  
  export interface OrderCreateDto {
    restaurantId: string;
    items: {
      menuItemId: string;
      quantity: number;
      specialInstructions?: string;
    }[];
    deliveryAddress: string;
    paymentMethod: 'card' | 'cash';
  }
  
  export interface CartItem extends MenuItem {
    quantity: number;
    specialInstructions?: string;
    restaurantId: string;
  }