import type { FunctionComponent } from 'react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import PropertyTabs from '../../../components/user/unitdetails/PropertyTabs';
import PropertyTab from '../../../components/user/unitdetails/PropertyTab';
import General from '../../user/setting/General';
import Security from '../../user/setting/Security';
import LandlordNotification from './LandlordNotifications';
import Preferences from '../../user/setting/Preferences';

const LandlordSettings: FunctionComponent = () => {
  return (
    <LandlordLayout activeSidebarItem="settings" breadcrumbs={[{ label: 'Settings' }]}>
      <div className="flex flex-col items-start gap-3 w-full pt-6 px-8">
        <PropertyTabs>
          <PropertyTab text="General" element={<General />} />
          <PropertyTab text="Security" element={<Security />} />
          <PropertyTab text="Notification" element={<LandlordNotification />} />
          <PropertyTab text="Preferences" element={<Preferences />} />
        </PropertyTabs>
      </div>
    </LandlordLayout>
  );
};

export default LandlordSettings;