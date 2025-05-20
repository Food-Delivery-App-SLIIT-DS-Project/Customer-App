'use client';

import { useState, useEffect } from 'react';
import OrderMap from '@/components/order/OrderMap';

import io from 'socket.io-client';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/lib/api';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
const socket = io(SOCKET_URL);

export default function OrderPage() {
  const params = useParams();
  // const customerCoords = { lat: 6.9271, lng: 79.8612 };
  // const restaurantCoords = { lat: 6.9344, lng: 79.8428 };
  const [restaurantCoords, setRestaurantCoords] = useState({ lat: 6.9344, lng: 79.8428 });
  const [customerCoords, setCustomerCoords] = useState({ lat: 6.9344, lng: 79.8428 });
  const [driverCoords, setDriverCoords] = useState({ lat: 6.9344, lng: 79.8428 });
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const restaurantId = params.restaurantId;
        const restaurant = await apiRequest(`/restaurant/${restaurantId}`, 'GET');
        setRestaurantCoords({
          lat: restaurant.data.data.location.latitude,
          lng: restaurant.data.data.location.longitude,
        });

        // setCustomerCoords({
        //   lat: restaurant.data.data.location.latitude,
        //   lng: restaurant.data.data.location.longitude,
        // });

      } catch (error) {
        console.error('Error saving order and payment: ', error);
      }
    };

    fetchLocations();
  }, []);
 
  useEffect(() => {
    const driverId = params.id;
    // Listen for 'driverLocation' messages from the WebSocket
    socket.on(`locationUpdate:${driverId}`, (data) => {
      console.log('Driver location: ', data);
      setDriverCoords({ lat: data.lat, lng: data.lng });
    });

    // Clean up connection on unmount
    return () => {
      socket.off('locationUpdate');
    };
  }, [restaurantCoords]);

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
