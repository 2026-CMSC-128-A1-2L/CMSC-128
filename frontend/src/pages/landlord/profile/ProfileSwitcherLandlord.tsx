import { useState } from 'react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import LandlordInfoCard, { type LandlordInfo } from '../../../components/landlord/LandlordInfoCard';
import Switch from '../../../components/landlord/ProfileToVerificationSwitch';

import LandlordProfileView from '../profile/LandlordProfile';
import LandlordVerificationView from '../profile/verification/LandlordProfileVerification';
import TutorialProfileBubble from './LandlordProfileTutorials';
import TutorialVerifBubble from '../profile/verification/TutorialsForLandlord'; 
import TutorialIcon from '../../../../assets/help-chat.svg';

const landlord: LandlordInfo = {
  displayName: 'Quevin Custodio',
  email: 'qacustodio@up.edu.ph',
  fullName: 'Quevin James A. Custodio',
  role: 'Landlord',
  employees: ['Nathaniel Cunanan', 'Lance De Jesus'],
  verified: false,
};

const ProfileSwitcherLandlord = () => {
  const [activeTab, setActiveTab] = useState<'user profile' | 'verification'>('user profile');
  const [showHelp, setShowHelp] = useState(false);

  const handleTabChange = (tab: 'user profile' | 'verification') => {
    setActiveTab(tab);
    setShowHelp(false); 
  };

  return (
    <LandlordLayout
      breadcrumbs={[
        { label: 'User Profile' },
        { label: activeTab === 'user profile' ? 'Profile' : 'Verification' },
      ]}
    >
      <div className="flex w-full flex-col gap-[12px] rounded-[16px] bg-white/70 p-[8px] pb-[32px]">
        <LandlordInfoCard info={landlord} />

        <div className="h-px w-full bg-[#e5e7eb]/70" />

        <Switch activeTab={activeTab} setActiveTab={handleTabChange} />

        <div className="transition-all duration-300">
          {activeTab === 'user profile' ? (
            <LandlordProfileView />
          ) : (
            <LandlordVerificationView />
          )}
        </div>
      </div>

      {/* switch between tutorials */}
      {activeTab === 'user profile' ? (
        <TutorialProfileBubble show={showHelp} onClose={() => setShowHelp(false)} />
      ) : (
        <TutorialVerifBubble show={showHelp} onClose={() => setShowHelp(false)} />
      )}
      
      {/* ======= FLOATING ICON ========== */}
      <div
        className="fixed bottom-10 right-10 z-1000 cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img src={TutorialIcon} alt="Help" className="w-16 h-16 drop-shadow-lg" />
      </div>
    </LandlordLayout>
  );
};

export default ProfileSwitcherLandlord;