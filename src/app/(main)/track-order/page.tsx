'use client';

import { useState, useEffect } from 'react';
import OrderMap from '@/components/order/OrderMap';

export default function OrderPage() {
  const customerCoords = { lat: 6.9271, lng: 79.8612 };
  const restaurantCoords = { lat: 6.9344, lng: 79.8428 };
  const [driverCoords, setDriverCoords] = useState({ lat: 6.9344, lng: 79.8428 });

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverCoords((prev) => ({
        lat: prev.lat - 0.0001,
        lng: prev.lng + 0.0001,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <h1 style={{ textAlign: 'center', color: '#4CAF50', margin: '20px 0', fontSize: '24px' }}>
      Tracking Your Order...
    </h1>
      <OrderMap
        customerCoords={customerCoords}
        driverCoords={driverCoords}
        restaurantCoords={restaurantCoords}
      />
    </div>
  );
}
