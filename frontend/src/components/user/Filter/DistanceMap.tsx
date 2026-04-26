import { MapContainer, TileLayer, Circle, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons (common issue in React-Leaflet)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
  distance: number; // in Kilometers
}

const DistanceMap = ({ distance }: Props) => {
  // Center: University of the Philippines Los Baños
  const center: [number, number] = [14.1675, 121.2433];

  return (
    <div className="w-full h-50 rounded-[1.2rem] overflow-hidden border border-gray-100 shadow-sm relative">
      <MapContainer center={center} zoom={14} scrollWheelZoom={false} className="h-full w-full z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <Marker position={center} />

        <Circle
          center={center}
          pathOptions={{
            fillColor: '#13634F',
            color: '#13634F',
            weight: 1.5,
            opacity: 0.8,
            fillOpacity: 0.15,
          }}
          radius={distance * 1000}
        />
      </MapContainer>
    </div>
  );
};

export default DistanceMap;
