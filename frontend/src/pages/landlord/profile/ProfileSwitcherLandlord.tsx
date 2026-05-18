import { useState } from 'react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import LandlordInfoCard, { type LandlordInfo } from '../../../components/landlord/LandlordInfoCard';
import Switch from '../../../components/landlord/ProfileToVerificationSwitch';

import LandlordProfileView from '../profile/LandlordProfile';
import LandlordVerificationView from '../profile/verification/LandlordProfileVerification';
import TutorialProfileBubble from './LandlordProfileTutorials';
import TutorialVerifBubble from '../profile/verification/TutorialsForLandlord';

const landlord: LandlordInfo = {
  displayName: 'Quevin Custodio',
  email: 'qacustodio@up.edu.ph',
  fullName: 'Quevin James A. Custodio',
  contactNumber: '09123456789',
  homeAddress: 'Los Banos, Laguna',
  role: 'Landlord',
  employees: ['Nathaniel Cunanan', 'Lance De Jesus'],
  verified: false,
};

type ProfileTab = 'user profile' | 'verification';

type ProfileSwitcherLandlordProps = {
  initialTab?: ProfileTab;
};

const ProfileSwitcherLandlord = ({ initialTab = 'user profile' }: ProfileSwitcherLandlordProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [showHelp, setShowHelp] = useState(false);
  const [contactNumber, setContactNumber] = useState(landlord.contactNumber);
  const [homeAddress, setHomeAddress] = useState(landlord.homeAddress);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleTabChange = (tab: ProfileTab) => {
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
      <div className="landlord-profile-shell flex w-full flex-col gap-[20px] rounded-[16px] bg-white/70 p-[8px] pb-[32px] dark:bg-[#101111]/92 dark:text-[#edf6f4]">
        <LandlordInfoCard
          info={{ ...landlord, contactNumber, homeAddress }}
          activeTab={activeTab === 'verification' ? 'verification' : 'info'}
          setActiveTab={(tab) => handleTabChange(tab === 'verification' ? 'verification' : 'user profile')}
          setContactNumber={setContactNumber}
          setHomeAddress={setHomeAddress}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          setIsEditingAddress={setIsEditingAddress}
          isEditingAddress={isEditingAddress}
          onEditContact={() => setIsEditing(true)}
          onEditHomeAddress={() => setIsEditingAddress(true)}
        />

        <div className="h-px w-full bg-[#e5e7eb]/70 dark:bg-[#303331]" />

        <Switch activeTab={activeTab} setActiveTab={handleTabChange} />

        <div className="transition-all duration-300">
          {activeTab === 'user profile' ? <LandlordProfileView /> : <LandlordVerificationView />}
        </div>
      </div>

      {/* switch between tutorials */}
      {activeTab === 'user profile' ? (
        <TutorialProfileBubble show={showHelp} onClose={() => setShowHelp(false)} />
      ) : (
        <TutorialVerifBubble show={showHelp} onClose={() => setShowHelp(false)} />
      )}
    </LandlordLayout>
  );
};

export default ProfileSwitcherLandlord;
