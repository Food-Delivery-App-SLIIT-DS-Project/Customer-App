'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 6.9271,
  lng: 79.8612,
};

const libraries = ['places'] as ('places')[];

export default function DeliveryAddress({
  address,
  onChange,
}: {
  address: string;
  onChange: (address: string) => void;
}) {
  const [position, setPosition] = useState(defaultCenter);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Try to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  // Save lat/lng to localStorage whenever position changes
  useEffect(() => {
    localStorage.setItem(
      'delivery_address_latlng',
      JSON.stringify({ lat: position.lat, lng: position.lng })
    );
  }, [position]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPosition({ lat, lng });

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          onChange(results[0].formatted_address);
          if (searchInputRef.current) {
            searchInputRef.current.value = results[0].formatted_address;
          }
        }
      });
    }
  };

  const handlePlaceChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry?.location;
      const address = place.formatted_address || place.name || '';

      if (location) {
        const lat = location.lat();
        const lng = location.lng();
        setPosition({ lat, lng });
        onChange(address);
        if (searchInputRef.current) {
          searchInputRef.current.value = address;
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <LoadScript
        googleMapsApiKey="AIzaSyAeTuSVmsdYEZA4ELRqkdKrpzcO3nM9DOI"
        libraries={libraries}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search your delivery address"
            className="w-full p-2 border rounded"
            defaultValue={address}
          />
        </StandaloneSearchBox>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={14}
          onClick={handleMapClick}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>

      {/* <p className="text-sm text-gray-600">
        <strong>Selected Address:</strong> {address || 'No address selected yet.'}
      </p>
      <p className="text-sm text-blue-600">
        <strong>Lat:</strong> {position.lat.toFixed(6)} | <strong>Lng:</strong> {position.lng.toFixed(6)}
      </p> */}
    </div>
  );
}
