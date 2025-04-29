import Map, { Marker, Source, Layer } from 'react-map-gl/mapbox';
import { useMemo } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

type Coords = { lat: number; lng: number };

type Props = {
  customerCoords: Coords;
  driverCoords: Coords;
  restaurantCoords: Coords;
};

const OrderMap = ({ customerCoords, driverCoords, restaurantCoords }: Props) => {
  const center = {
    lat: (customerCoords.lat + driverCoords.lat + restaurantCoords.lat) / 3,
    lng: (customerCoords.lng + driverCoords.lng + restaurantCoords.lng) / 3,
  };

  // Dynamic line from driver to customer
  const routeGeoJSON = useMemo(() => ({
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [driverCoords.lng, driverCoords.lat],
        [customerCoords.lng, customerCoords.lat],
      ],
    },
  }), [driverCoords, customerCoords]);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: center.lng,
        latitude: center.lat,
        zoom: 12,
      }}
      style={{ width: '100%', height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {/* Live driver to customer route */}
      <Source id="route" type="geojson" data={routeGeoJSON}>
        <Layer
          id="route-line"
          type="line"
          paint={{
            'line-color': '#00f',
            'line-width': 4,
            'line-dasharray': [2, 2],
          }}
        />
      </Source>

      {/* Restaurant Marker */}
      <Marker longitude={restaurantCoords.lng} latitude={restaurantCoords.lat} color="red">
        <div style={{ textAlign: 'center' }}>
          <div style={{ backgroundColor: 'blue', padding: '2px 4px', borderRadius: '4px', fontSize: '14px', marginBottom: '2px', color: 'white' }}>
            Restaurant
          </div>
        </div>
      </Marker>

      {/* Customer Marker */}
      <Marker longitude={customerCoords.lng} latitude={customerCoords.lat} color="blue">
        <div style={{ textAlign: 'center' }}>
          <div style={{ backgroundColor: 'red', padding: '2px 4px', borderRadius: '4px', fontSize: '14px', marginBottom: '2px', color: 'white' }}>
            Destination
          </div>
        </div>
      </Marker>

      {/* Driver Marker */}
      <Marker longitude={driverCoords.lng} latitude={driverCoords.lat} color="green">
        <div style={{ textAlign: 'center' }}>
          <div style={{ backgroundColor: 'green', padding: '2px 4px', borderRadius: '4px', fontSize: '14px', marginBottom: '2px', color: 'white' }}>
            Driver
          </div>
        </div>
      </Marker>
    </Map>
  );
};

export default OrderMap;
