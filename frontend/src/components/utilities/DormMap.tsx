import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import RecenterMap from './RecenterMap';
import 'leaflet/dist/leaflet.css';

type DormMapProps = {
  latitude: number;
  longitude: number;
  dormName: string;
};

const DormIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, #0f766e, #14b8a6);
      border: 4px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 8px 20px rgba(15, 118, 110, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 14px;
        height: 14px;
        background: white;
        border-radius: 50%;
      "></div>
    </div>
  `,
  iconSize: [42, 42],
  iconAnchor: [21, 42],
  popupAnchor: [0, -38],
});

const DormMap = ({ latitude, longitude, dormName }: DormMapProps) => {
  const position: [number, number] = [latitude, longitude];

  return (
    <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md">
      <div className="absolute left-4 top-4 z-[500] rounded-xl bg-white/90 px-4 py-3 shadow-md backdrop-blur-md">
        <p className="m-0 text-sm font-semibold text-slate-800">{dormName}</p>
        <p className="m-0 mt-1 text-xs text-slate-500">Dorm Location</p>
      </div>
      <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md">
        <MapContainer
          center={position}
          zoom={16}
          minZoom={13}
          maxZoom={19}
          zoomControl={false}
          scrollWheelZoom
          zoomAnimation
          fadeAnimation
          markerZoomAnimation
          className="z-0 h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
          />

          <Marker position={position} icon={DormIcon}>
            <Popup closeButton={false}>
              <div className="min-w-[150px] font-inter">
                <p className="m-0 text-sm font-bold text-teal-700">{dormName}</p>
                <p className="mt-1 text-xs text-slate-500">Dorm Location</p>
              </div>
            </Popup>
          </Marker>

          <RecenterMap lat={latitude} lng={longitude} />
        </MapContainer>

        <div className="pointer-events-none absolute inset-0 z-[400] bg-white/10" />
      </div>

    </div>
  );
};

export default DormMap;
