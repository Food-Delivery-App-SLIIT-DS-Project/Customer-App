'use client';

import { useState, useEffect } from 'react';
import OrderMap from '@/components/order/OrderMap';

import io from 'socket.io-client';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/lib/api';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;
const socket = io(SOCKET_URL);

export default function OrderPage() {
  const params = useParams();
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

        if (!navigator.geolocation) {
          console.error('Geolocation is not supported by your browser.');
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCustomerCoords({ lat: latitude, lng: longitude });
          },
          (err) => {
            console.error('Unable to retrieve your location. ' + err.message);
          }
        );
      } catch (error) {
        console.error('Error fetching locations: ', error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const driverId = params.id;
    const eventName = `locationUpdate:${driverId}`;

    socket.on(eventName, (data) => {
      console.log('Driver location update: ', data);

      if (data?.location?.coordinates) {
        const [lng, lat] = data.location.coordinates;
        setDriverCoords({ lat, lng });
      }
    });

    return () => {
      socket.off(eventName);
    };
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
