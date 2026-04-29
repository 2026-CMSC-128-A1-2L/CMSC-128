import type { FunctionComponent } from 'react';
import DormMap from '../../utilities/DormMap';

const LocationDetails: FunctionComponent = () => {

  //temp data
  const dormData = { lat: 14.16670, lng: 121.23908, name: "UPLB" };

  return (
    <div className="w-full relative flex flex-col items-start gap-[29px] text-center text-num-18 text-gray font-inter">
      <div className="self-stretch flex flex-col items-start py-2.5 px-5 shrink-0">

        <div className="h-[300px] w-full">
          <DormMap
            latitude={dormData.lat}
            longitude={dormData.lng}
            dormName={dormData.name}
          />
        </div>
      </div>

      <div className="flex flex-col pt-20 px-5 text-left text-num-14 w-[793px]">
        <div
          className="grid py-3 text-[16px] text-darkslategray font-lora"
          style={{ gridTemplateColumns: '2fr 1fr 1fr' }}
        >
          <div className="font-medium">LANDMARK</div>
          <div className="font-medium">DISTANCE</div>
          <div className="font-medium">EST. WALK</div>
        </div>
        <div className="w-full h-px bg-gainsboro" />

        {[
          { landmark: 'UPLB Main Gate', distance: '0.4 km', walk: '~5 min' },
          { landmark: 'College of Engineering', distance: '0.7 km', walk: '~9 min' },
          { landmark: 'Freedom Park', distance: '0.1 km', walk: '< 1 min' },
          { landmark: 'University Health Center', distance: '0.9 km', walk: '~11 min' },
        ].map((row, i) => (
          <div key={i} className="flex flex-col">
            <div className="grid py-4 text-[14px]" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
              <div className="font-medium">{row.landmark}</div>
              <div className="font-medium">{row.distance}</div>
              <div className="font-medium">{row.walk}</div>
            </div>
            <div className="w-full h-px bg-gainsboro" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationDetails;
