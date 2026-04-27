import type { FunctionComponent, } from 'react';
import SideBar from '../../../components/user/SideBar';
import Footer from '../../../components/general/Footer';
import PropertyTabs from '../../../components/user/unitdetails/PropertyTabs';
import PropertyTab from '../../../components/user/unitdetails/PropertyTab';
import General from './General';
import Security from './Security';
import Notification from './Notification';
import Preferences from './Preferences';

const Settings: FunctionComponent = () => {
  return (
    <div className="flex min-h-screen font-inter text-darkslategray">
      <div className="sticky top-0 h-screen shrink-0 z-10">
        <SideBar />
      </div>
      <div className="flex flex-1 flex-col min-w-0 overflow-y-auto">
        <div className="flex-1 px-4 sm:px-8 lg:px-20 pt-16">
          <PropertyTabs>
            <PropertyTab text="General" element={<General />} />
            <PropertyTab text="Security" element={<Security />} />
            <PropertyTab text="Notification" element={<Notification />} />
            <PropertyTab text="Preferences" element={<Preferences />} />
          </PropertyTabs>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Settings;
