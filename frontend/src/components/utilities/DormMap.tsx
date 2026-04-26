import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import RecenterMap from './RecenterMap';

// NOTES FOR FUTURE UPDATES
// useMap will be used eventually to dynamically change the location of the pin depending on the coords passed by the backend
// use map.flyTo() and map.setView()?
// radius from the pin
// distance calculations
// optimize map loading speed

const GreenIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = GreenIcon;

type DormMapProps = {
  latitude: number;
  longitude: number;
  dormName: string;
};

const DormMap = ({ latitude, longitude, dormName }: DormMapProps) => {
  const position: [number, number] = [latitude, longitude];

  return (
    <div className="w-full h-full min-h-[400px] relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <MapContainer
        center={position}
        zoom={16}
        minZoom={13}
        maxZoom={18}
        zoomAnimation={false}
        markerZoomAnimation={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="font-inter">
              <p className="font-bold text-teal-700 m-0">{dormName}</p>
              <p className="text-xs text-slate-500 mt-1">Dorm Location</p>
            </div>
          </Popup>
        </Marker>
        <RecenterMap lat={latitude} lng={longitude} />
      </MapContainer>
    </div>
  );
};

export default DormMap;
