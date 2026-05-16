import { useMap } from 'react-leaflet';

type RecenterMapProps = {
  lat: number;
  lng: number;
};

const RecenterMap = ({ lat, lng }: RecenterMapProps) => {
  const map = useMap();

  const handleRecenter = () => {
    map.flyTo([lat, lng], 16, {
      duration: 1.5,
    });
  };

  return (
    <div className="absolute bottom-5 right-5 z-1000">
      <button
        onClick={handleRecenter}
        className="bg-white p-3 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center group cursor-pointer"
        title="Recenter Map"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-teal-600 group-hover:scale-110 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <circle cx="12" cy="12" r="3" strokeWidth={2} />
        </svg>
      </button>
    </div>
  );
};

export default RecenterMap;
