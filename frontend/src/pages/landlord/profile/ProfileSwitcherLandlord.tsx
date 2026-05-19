import { useCallback, useEffect, useMemo, useState } from 'react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import LandlordInfoCard, { type LandlordInfo } from '../../../components/landlord/LandlordInfoCard';
import Switch from '../../../components/landlord/ProfileToVerificationSwitch';

import LandlordProfileView from '../profile/LandlordProfile';
import LandlordVerificationView, {
  type LandlordVerificationUser,
} from '../profile/verification/LandlordProfileVerification';
import TutorialProfileBubble from './LandlordProfileTutorials';
import TutorialVerifBubble from '../profile/verification/TutorialsForLandlord';
import { UserService } from '../../../service/UserService';
import { useAuthStore } from '../../../store/useAuthStore';

type ProfileUser = {
  email?: string;
  emails?: string[];
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  contact?: string;
  address?: string;
  userType?: string;
  status?: string;
  verificationStatus?: string;
  profilePicture?: string | null;
};

type ProfileTab = 'user profile' | 'verification';

type ProfileSwitcherLandlordProps = {
  initialTab?: ProfileTab;
};

const formatDisplayName = (user: ProfileUser | null) =>
  [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Landlord';

const formatFullName = (user: ProfileUser | null) =>
  [user?.firstName, user?.middleName, user?.lastName].filter(Boolean).join(' ') ||
  'Not provided';

const ProfileSwitcherLandlord = ({ initialTab = 'user profile' }: ProfileSwitcherLandlordProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [showHelp, setShowHelp] = useState(false);
  const { fetchMe } = useAuthStore();
  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null);
  const [contactNumber, setContactNumber] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setProfileError(null);

      try {
        const response = await UserService.getSelf();
        if (cancelled) return;

        const user = response.data as ProfileUser;
        setProfileUser(user);
        setContactNumber(user.contact ?? '');
        setHomeAddress(user.address ?? '');
      } catch {
        if (!cancelled) {
          setProfileError('Could not load your profile information.');
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const landlordInfo = useMemo<LandlordInfo>(
    () => ({
      displayName: formatDisplayName(profileUser),
      email: profileUser?.email ?? profileUser?.emails?.[0] ?? 'No email connected',
      fullName: formatFullName(profileUser),
      contactNumber,
      homeAddress,
      role: profileUser?.userType ?? 'Landlord',
      employees: [],
      verified:
        profileUser?.status === 'verified' ||
        profileUser?.verificationStatus === 'approved',
      verificationStatus: profileUser?.verificationStatus as
        | 'pending'
        | 'submitted'
        | 'rejected'
        | 'approved'
        | undefined,
      photoUrl: profileUser?.profilePicture ?? undefined,
    }),
    [contactNumber, homeAddress, profileUser],
  );

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);
    setShowHelp(false);
  };

  const handleVerificationUpdated = useCallback((user: LandlordVerificationUser) => {
    setProfileUser((current) =>
      current
        ? {
            ...current,
            verificationStatus: user.verificationStatus,
          }
        : (user as ProfileUser),
    );
  }, []);

  const saveContactNumber = async (contact: string) => {
    try {
      const response = await UserService.updateSelf({ contact });
      const updatedUser = response.data as ProfileUser;
      setProfileUser(updatedUser);
      setContactNumber(updatedUser.contact ?? contact);
      await fetchMe();
      setProfileError(null);
    } catch {
      setProfileError('Could not update your contact number.');
    }
  };

  const saveHomeAddress = async (address: string) => {
    try {
      const response = await UserService.updateSelf({ address });
      const updatedUser = response.data as ProfileUser;
      setProfileUser(updatedUser);
      setHomeAddress(updatedUser.address ?? address);
      await fetchMe();
      setProfileError(null);
    } catch {
      setProfileError('Could not update your home address.');
    }
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
          info={landlordInfo}
          activeTab={activeTab === 'user profile' ? 'info' : 'verification'}
          setActiveTab={(tab) =>
            handleTabChange(tab === 'info' ? 'user profile' : 'verification')
          }
          setContactNumber={setContactNumber}
          setHomeAddress={setHomeAddress}
          isEditing={isEditingContact}
          setIsEditing={setIsEditingContact}
          isEditingAddress={isEditingAddress}
          setIsEditingAddress={setIsEditingAddress}
          onEditContact={() => setIsEditingContact((isEditing) => !isEditing)}
          onEditHomeAddress={() =>
            setIsEditingAddress((isEditing) => !isEditing)
          }
          onSaveContact={saveContactNumber}
          onSaveHomeAddress={saveHomeAddress}
        />

        {profileError && (
          <div className="mx-[32px] rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
            {profileError}
          </div>
        )}

        <div className="h-px w-full bg-[#e5e7eb]/70 dark:bg-[#303331]" />

        <Switch activeTab={activeTab} setActiveTab={handleTabChange} />

        <div className="transition-all duration-300">
          {activeTab === 'user profile' ? (
            <LandlordProfileView />
          ) : (
            <LandlordVerificationView onVerificationUpdated={handleVerificationUpdated} />
          )}
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
