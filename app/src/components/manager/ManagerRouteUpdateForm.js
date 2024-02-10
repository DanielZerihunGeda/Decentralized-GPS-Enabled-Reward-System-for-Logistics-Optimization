import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';

const ManagerRouteUpdateForm = () => {
  const [waypoints, setWaypoints] = useState([]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    // Multiply latitude and longitude by 10^6 to handle floating-point numbers
    const latitude = Math.round(lat * 10 ** 6);
    const longitude = Math.round(lng * 10 ** 6);
    setWaypoints([...waypoints, { latitude, longitude }]);
  };

  return (
    <div>
      <h2>Manager Route Update Form</h2>
      <MapContainer center={[0, 0]} zoom={2} onClick={handleMapClick}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {waypoints.map((waypoint, index) => (
          <Marker key={index} position={[waypoint.latitude / 10 ** 6, waypoint.longitude / 10 ** 6]}>
            <Popup>Waypoint {index + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ManagerRouteUpdateForm;
