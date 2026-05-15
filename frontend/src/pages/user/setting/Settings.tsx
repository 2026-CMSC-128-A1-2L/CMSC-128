import type { FunctionComponent } from 'react';
import SideBar from '../../../components/user/SideBar';
import Footer from '../../../components/general/Footer';
import PageBackground from '../../../components/general/PageBackground';
import PropertyTabs from '../../../components/user/unitdetails/PropertyTabs';
import PropertyTab from '../../../components/user/unitdetails/PropertyTab';
import General from './General';
import Security from './Security';
import Notification from './Notification';
import Preferences from './Preferences';

const Settings: FunctionComponent = () => {
  return (
    <div className="user-settings-shell relative flex min-h-screen overflow-hidden bg-white font-inter text-darkslategray dark:bg-[#0f1010] dark:text-[#edf6f4]">
      <PageBackground />
      <div className="sticky top-0 z-20 h-screen shrink-0">
        <SideBar />
      </div>
      <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="flex-1 px-4 pb-20 pt-16 sm:px-8 lg:px-20">
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
