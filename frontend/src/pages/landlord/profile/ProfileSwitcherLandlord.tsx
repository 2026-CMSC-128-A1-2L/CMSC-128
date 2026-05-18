import { useState, useMemo, useEffect } from 'react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import LandlordInfoCard, { type LandlordInfo } from '../../../components/landlord/LandlordInfoCard';
import Switch from '../../../components/landlord/ProfileToVerificationSwitch';
import { useAuthStore } from '../../../store/useAuthStore';
import { UserService } from '../../../service/UserService';

import LandlordProfileView from '../profile/LandlordProfile';
import LandlordVerificationView from '../profile/verification/LandlordProfileVerification';
import TutorialProfileBubble from './LandlordProfileTutorials';
import TutorialVerifBubble from '../profile/verification/TutorialsForLandlord';

// Static fallback removed or replaced with dynamic generation inside component

type ProfileTab = 'user profile' | 'verification';

type ProfileSwitcherLandlordProps = {
  initialTab?: ProfileTab;
};

const ProfileSwitcherLandlord = ({ initialTab = 'user profile' }: ProfileSwitcherLandlordProps) => {
  const authUser = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [showHelp, setShowHelp] = useState(false);

  const [contactNumber, setContactNumber] = useState('-----');
  const [homeAddress, setHomeAddress] = useState('-----');

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    if (authUser) {
      setContactNumber(authUser.contact || '-----');
      setHomeAddress(authUser.address || '-----');
    }
  }, [authUser]);

  const dynamicLandlord = useMemo<LandlordInfo>(() => {
    if (!authUser) {
      return {
        displayName: 'Quevin Custodio',
        email: 'qacustodio@up.edu.ph',
        fullName: 'Quevin James A. Custodio',
        contactNumber: contactNumber,
        homeAddress: homeAddress,
        role: 'Landlord',
        employees: ['Nathaniel Cunanan', 'Lance De Jesus'],
        verified: false,
      };
    }
    return {
      displayName: [authUser.firstName, authUser.lastName].filter(Boolean).join(' ') || 'Quevin Custodio',
      email: authUser.email || authUser.emails?.[0] || 'qacustodio@up.edu.ph',
      fullName: [authUser.firstName, authUser.middleName, authUser.lastName].filter(Boolean).join(' ') || 'Quevin James A. Custodio',
      contactNumber: contactNumber,
      homeAddress: homeAddress,
      role: 'Landlord',
      employees: ['Nathaniel Cunanan', 'Lance De Jesus'],
      verified: authUser.status === 'verified' || authUser.verificationStatus === 'approved',
      photoUrl: authUser.profilePicture,
    };
  }, [authUser, contactNumber, homeAddress]);

  const handleSaveContact = async (newVal: string) => {
    if (!authUser) return;
    try {
      const updated = await UserService.updateSelf(authUser._id, { contact: newVal });
      if (updated) {
        useAuthStore.getState().setUser(updated);
        setContactNumber(updated.contact || '-----');
      }
    } catch (err) {
      console.error('Failed to update contact:', err);
    }
  };

  const handleSaveAddress = async (newVal: string) => {
    if (!authUser) return;
    try {
      const updated = await UserService.updateSelf(authUser._id, { address: newVal });
      if (updated) {
        useAuthStore.getState().setUser(updated);
        setHomeAddress(updated.address || '-----');
      }
    } catch (err) {
      console.error('Failed to update address:', err);
    }
  };

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
          info={dynamicLandlord}
          activeTab={activeTab === 'user profile' ? 'info' : 'verification'}
          setActiveTab={(tab) => handleTabChange(tab === 'info' ? 'user profile' : 'verification')}
          setContactNumber={handleSaveContact}
          setHomeAddress={handleSaveAddress}
          onEditContact={() => {
            setIsEditing(!isEditing);
          }}
          onEditHomeAddress={() => {
            setIsEditingAddress(!isEditingAddress);
          }}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          setIsEditingAddress={setIsEditingAddress}
          isEditingAddress={isEditingAddress}
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
