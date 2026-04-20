import { FunctionComponent, useState } from 'react';
import AboutDetails from './AboutDetails';
import AmenitiesDetails from './AmenetiesDetails';
import RulesDetails from './RulesDetails';
import LocationDetails from './LocationDetails';
import ReviewDetails from "./ReviewDetails"

type Tab = 'ABOUT' | 'AMENITIES' | 'RULES' | 'LOCATION' | 'REVIEWS';

const TABS: Tab[] = ['ABOUT', 'AMENITIES', 'RULES', 'LOCATION', 'REVIEWS'];

const PropertyTabs: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<Tab>('ABOUT');
  const activeIndex = TABS.indexOf(activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'ABOUT': return <AboutDetails />;
      case 'AMENITIES': return <AmenitiesDetails />;
      case 'RULES': return <RulesDetails />;
      case 'LOCATION': return <LocationDetails />;
      case 'REVIEWS': return <ReviewDetails />;
    }
  };

  return (
    <div className="w-full relative flex flex-col items-start gap-[29px] font-inter">
      <div className="self-stretch flex flex-col items-start relative text-center">

        <div className="flex items-start py-4 z-[1]">
          {TABS.map((tab) => (
            <b
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-num-150 relative tracking-num--0_01 flex items-center justify-center cursor-pointer transition-colors duration-200
                ${activeTab === tab ? 'text-teal-600' : 'text-gray hover:text-teal-600'}`}
            >
              {tab}
            </b>
          ))}
        </div>

        <div className="w-[750px] relative h-[2px] bg-gainsboro">
          <div
            className="absolute top-0 h-full bg-teal-600 transition-all duration-300 ease-in-out"
            style={{
              width: '150px',
              transform: `translateX(${activeIndex * (150)}px)`
            }}
          />
        </div>
      </div>

      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  );
};
export default PropertyTabs;
