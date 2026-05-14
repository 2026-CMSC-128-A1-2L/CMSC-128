import { Icon } from '@iconify/react';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../../../assets/default_avatar.svg';
import VerifiedBadge from '../../../assets/verified_badge.svg';
import { UserService } from '../../service/UserService';
import { useAuthStore } from '../../store/useAuthStore';

type VerificationStatus = 'pending' | 'submitted' | 'rejected' | 'approved';
type AccountStatus = 'setup' | 'unverified' | 'verified' | 'inactive' | 'disabled' | 'legacy';
type UserRole = 'Admin' | 'Manager' | 'Landlord' | 'Student';

type ProfileUser = {
  _id?: string;
  email?: string;
  emails?: string[];
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  profilePicture?: string | null;
  address?: string;
  contact?: string;
  status?: AccountStatus;
  userType?: UserRole;
  verificationStatus?: VerificationStatus;
  studentNumber?: string;
  degreeProgram?: string;
};

type RentalSummary = {
  status?: string;
  facilityId?: string | { name?: string; id?: string; _id?: string };
  unitId?: string | { roomNumber?: string; id?: string; _id?: string };
  expectedMoveInDate?: string;
  expectedMoveOutDate?: string;
  actualMoveInDate?: string;
  actualMoveOutDate?: string;
};

type BillingSummary = {
  paymentStatus?: string;
  totalAmount?: number;
  dueDate?: string;
};

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const formatName = (user: ProfileUser | null) => {
  if (!user) return 'Profile';
  return [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' ') || 'Profile';
};

const formatFormalName = (user: ProfileUser | null) => {
  if (!user) return 'Not provided';
  const lastName = user.lastName?.trim();
  const givenNames = [user.firstName, user.middleName].filter(Boolean).join(' ');
  if (lastName && givenNames) return `${lastName.toUpperCase()}, ${givenNames.toUpperCase()}`;
  return formatName(user).toUpperCase();
};

const redactContact = (number: string) => {
  if (!number) return 'Not provided';
  if (number.length < 4) return number;
  return `${number.slice(0, 2)}${'*'.repeat(Math.max(number.length - 4, 0))}${number.slice(-2)}`;
};

const redactStudentNumber = (studentNumber?: string) => {
  if (!studentNumber) return 'Not available';
  if (studentNumber.length <= 4) return studentNumber;
  return `${studentNumber.slice(0, 4)}${'*'.repeat(Math.max(studentNumber.length - 4, 0))}`;
};

const verificationLabel = (user: ProfileUser | null) => {
  if (!user) return 'Loading';
  if (user.status === 'verified' || user.verificationStatus === 'approved') return 'Verified';
  if (user.verificationStatus === 'submitted') return 'For Review';
  if (user.verificationStatus === 'rejected') return 'Rejected';
  if (user.status === 'setup') return 'Setup Required';
  return 'Unverified';
};

const roleLabel = (role?: UserRole) => {
  if (role === 'Student') return 'Student';
  return role ?? 'Unassigned';
};

const getFacilityName = (rental?: RentalSummary) => {
  if (!rental?.facilityId) return 'No active dorm yet';
  if (typeof rental.facilityId === 'object') return rental.facilityId.name ?? 'Assigned dorm';
  return 'Assigned dorm';
};

const getContractDuration = (rental?: RentalSummary) => {
  const start = rental?.actualMoveInDate ?? rental?.expectedMoveInDate;
  const end = rental?.actualMoveOutDate ?? rental?.expectedMoveOutDate;
  if (!start || !end) return 'Not available';

  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return 'Not available';

  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
};

const ProfileInfo = () => {
  const { fetchMe } = useAuthStore();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [profileImage, setProfileImage] = useState<string>(DefaultAvatar);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSavingContact, setIsSavingContact] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [homeAddress, setHomeAddress] = useState('');
  const [currentRental, setCurrentRental] = useState<RentalSummary | undefined>();
  const [latestBilling, setLatestBilling] = useState<BillingSummary | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [selfResponse, rentalsResponse, billingsResponse] = await Promise.allSettled([
          UserService.getSelf(),
          UserService.getMyRentals(),
          UserService.getMyBillings(),
        ]);

        if (cancelled) return;

        if (selfResponse.status === 'fulfilled') {
          const fetchedUser = selfResponse.value.data as ProfileUser;
          setUser(fetchedUser);
          setContactNumber(fetchedUser.contact ?? '');
          setHomeAddress(fetchedUser.address ?? '');
          setProfileImage(fetchedUser.profilePicture || DefaultAvatar);
        } else {
          throw selfResponse.reason;
        }

        if (rentalsResponse.status === 'fulfilled') {
          const rentals = getDataArray<RentalSummary>(rentalsResponse.value);
          setCurrentRental(
            rentals.find((rental) => rental.status === 'active') ??
              rentals.find((rental) => rental.status === 'inactive') ??
              rentals[0],
          );
        }

        if (billingsResponse.status === 'fulfilled') {
          const billings = getDataArray<BillingSummary>(billingsResponse.value);
          setLatestBilling(billings[0]);
        }
      } catch {
        if (!cancelled) setError('Could not load your profile information.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSaveAddress = async () => {
    const cleaned = homeAddress.trim().replace(/\s\s+/g, ' ');
    setIsSavingAddress(true);

    try {
      const response = await UserService.updateSelf({ address: cleaned });
      const updatedUser = response.data as ProfileUser;
      setUser(updatedUser);
      setHomeAddress(updatedUser.address ?? cleaned);
      await fetchMe();
      setIsEditingAddress(false);
    } catch {
      setError('Could not update your home address.');
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleSave = async () => {
    if (contactNumber && contactNumber.length !== 11) return;

    setIsSavingContact(true);
    try {
      const response = await UserService.updateSelf({ contact: contactNumber });
      const updatedUser = response.data as ProfileUser;
      setUser(updatedUser);
      setContactNumber(updatedUser.contact ?? contactNumber);
      await fetchMe();
      setIsEditing(false);
    } catch {
      setError('Could not update your contact number.');
    } finally {
      setIsSavingContact(false);
    }
  };

  const email = user?.email ?? user?.emails?.[0] ?? 'No email connected';
  const isVerified = user?.status === 'verified' || user?.verificationStatus === 'approved';
  const isStudent = user?.userType === 'Student';

  return (
    <div className="self-stretch h-[382px] rounded-2xl flex flex-col items-start gap-3 dark:text-[#a4acba]">
      <div className="self-stretch rounded-2xl overflow-hidden flex flex-col items-start px-num-32 pb-num-32">
        <div className="self-stretch flex flex-col items-start gap-2.5">
          <b className="relative">{roleLabel(user?.userType)} Profile</b>
          <div className="flex items-center justify-center gap-2.5 text-[24px] text-darkslategray-200 dark:text-[#b9eadf]">
            <b className="relative leading-8">
              {isLoading ? 'Loading profile...' : formatName(user)}
            </b>
            {isVerified && <img className="h-6 w-6 relative" alt="Verified" src={VerifiedBadge} />}
          </div>
          <b className="relative text-[#096c5b] dark:text-[#72cbb8]">{email}</b>
          {error && <span className="text-xs font-semibold text-red-500">{error}</span>}
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex items-start justify-between py-1 px-num-32 gap-5">
        <div className="relative group w-[200px] h-[200px]">
          <button
            type="button"
            className="h-full w-full cursor-pointer rounded-full border-0 bg-transparent p-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              className="w-full h-full rounded-full object-cover transition-all duration-300 group-hover:blur-sm"
              alt="Profile"
              src={profileImage}
              onError={() => setProfileImage(DefaultAvatar)}
            />

            <div className="absolute inset-0 flex items-center justify-center rounded-full transition-all duration-300">
              <Icon
                icon="iconamoon:edit"
                className="opacity-0 group-hover:opacity-100 h-10 w-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                color="#096C5B"
              />
            </div>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfileImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Name</b>
            <b className="relative text-black">{formatFormalName(user)}</b>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <b className="relative">Contact number</b>

              <button
                type="button"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                disabled={isSavingContact}
                className="focus:outline-none hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                <Icon
                  icon={isEditing ? 'solar:check-read-linear' : 'iconamoon:edit'}
                  className="h-6 w-6 relative"
                  color="#096C5B"
                />
              </button>
            </div>
            <div className="w-[350px] min-h-[32px] flex items-center">
              {isEditing ? (
                <input
                  type="text"
                  value={contactNumber}
                  placeholder="09*********"
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');

                    if (onlyNums.length === 0) {
                      setContactNumber('');
                    } else if (onlyNums.length === 1) {
                      if (onlyNums === '0') setContactNumber('0');
                    } else if (onlyNums.startsWith('09') && onlyNums.length <= 11) {
                      setContactNumber(onlyNums);
                    }
                  }}
                  className="border-b border-[#096C5B] text-[14px] bg-transparent outline-none w-[200px] py-1 dark:border-[#72cbb8] dark:text-[#edf6f4]"
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                />
              ) : (
                <b className="relative text-black py-1 text-left">{redactContact(contactNumber)}</b>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <b className="relative">Home Address</b>

              <button
                type="button"
                onClick={() => (isEditingAddress ? handleSaveAddress() : setIsEditingAddress(true))}
                disabled={isSavingAddress}
                className="focus:outline-none hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                <Icon
                  icon={isEditingAddress ? 'solar:check-read-linear' : 'iconamoon:edit'}
                  className="h-6 w-6 relative"
                  color="#096C5B"
                />
              </button>
            </div>
            <div className="w-[350px] min-h-[32px] flex items-center">
              {isEditingAddress ? (
                <input
                  type="text"
                  value={homeAddress}
                  onChange={(e) => {
                    const val = e.target.value;
                    const isValidChar = /^[a-zA-Z0-9\s.,\-#]*$/.test(val);
                    if (isValidChar && val.length <= 100) setHomeAddress(val);
                  }}
                  className="border-b border-[#096C5B] text-[14px] bg-transparent outline-none w-[300px] py-1 text-black dark:border-[#72cbb8] dark:text-[#edf6f4]"
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveAddress()}
                />
              ) : (
                <b className="relative text-black py-1 text-left">
                  {homeAddress || 'Not provided'}
                </b>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
          <div className="flex flex-col items-start gap-1">
            <b className="relative">{`User Role `}</b>
            <b className="relative text-black">{roleLabel(user?.userType)}</b>
          </div>
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Student Number</b>
            <b className="relative text-black">
              {isStudent ? redactStudentNumber(user?.studentNumber) : 'Not applicable'}
            </b>
          </div>
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Verification Status</b>
            <b className="relative text-transparent bg-clip-text! [background:linear-gradient(180deg,#5dc2a8_27.88%,#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              {verificationLabel(user)}
            </b>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Current Dorm</b>
            <b className="relative text-black">{getFacilityName(currentRental)}</b>
          </div>
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Rent Fee</b>
            <div className="self-stretch flex items-center gap-8 text-black">
              <b className="relative">{latestBilling?.paymentStatus ?? 'No billing yet'}</b>

              <Link
                to="/finance"
                className="flex items-center gap-1 text-[12px] text-teal-100 cursor-pointer hover:underline dark:text-[#72cbb8]"
              >
                <div className="relative font-medium text-[#096c5b] dark:text-[#72cbb8]">See Finance</div>
                <Icon
                  icon="solar:arrow-right-up-linear"
                  className="h-4 w-4 relative text-[#096c5b] dark:text-[#72cbb8]"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <b className="relative">Contract Duration</b>
            <b className="relative text-black">{getContractDuration(currentRental)}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
