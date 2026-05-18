// pages/user/ProfileSwitcher.tsx
import { useState, useEffect } from 'react';
import CurrentDormCard from './current_dorm/CurrentDormCard';
import UserVerif from './verification/UserVerif';
import Sidebar from '../../../components/user/SideBar';
import Footer from '../../../components/general/Footer';
import PageBackground from '../../../components/general/PageBackground';
import Switch from '../../../components/user/CurrentDormToVerificationSwitch';
import ProfileInfo from '../../../components/user/ProfileInfo';
import BreadcrumbHeader from '../../../components/general/Breadcrumb';
import { Link } from 'react-router-dom';
import { UserService } from '../../../service/UserService';

type RentalSummary = {
  status?: string;
  facilityId?: string | { name?: string };
  unitId?: string | { roomNumber?: string };
  expectedMoveInDate?: string;
  expectedMoveOutDate?: string;
  actualMoveInDate?: string;
  actualMoveOutDate?: string;
};
type ApplicationSummary = {
  _id?: string;
  id?: string;
  status?: string;
  facilityId?:
    | string
    | { name?: string; location?: { text?: string }; media?: { value?: string }[] };
  listingId?: string | { roomType?: string };
  unitId?: string | { roomNumber?: string };
  leaseDuration?: '6-months' | '12-months';
  moveInDate?: string;
};
type CurrentDormDetails = {
  propertyImageSrc?: string;
  propertyName?: string;
  unitNumber?: string;
  contractDuration?: string;
  leaseEndDate?: string;
};

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const getApplicationId = (application: ApplicationSummary) =>
  application.id ?? application._id ?? '';

const getFacilityName = (application: ApplicationSummary) => {
  if (typeof application.facilityId === 'object') {
    return application.facilityId.name ?? 'Dorm';
  }
  return 'Dorm application';
};

const getAddress = (application: ApplicationSummary) => {
  if (typeof application.facilityId === 'object') {
    return application.facilityId.location?.text ?? 'Address unavailable';
  }
  return 'Address unavailable';
};

const getRoomType = (application: ApplicationSummary) => {
  if (typeof application.listingId === 'object') {
    return application.listingId.roomType ?? 'Selected room';
  }
  return 'Selected room';
};

const applicationStatusLabel: Record<string, string> = {
  pending: 'Initial screening',
  waitlisted: 'Initial accepted',
  finalized: 'Submitted for final approval',
  approved: 'Approved',
  rejected: 'Rejected',
};

const CurrentApplicationsList = ({ applications }: { applications: ApplicationSummary[] }) => (
  <div className="w-full px-8 text-left text-darkslategray-100 dark:text-[#edf6f4]">
    <div className="mb-6 flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <b className="text-num-18">Your Applications</b>
        <b className="text-num-18 text-dimgray dark:text-[#a4acba]">
          {applications.length} out of 5 Dorm Applications
        </b>
      </div>
      <Link
        to="/home"
        className="rounded-2xl bg-lightcyan px-4 py-2 text-sm font-bold text-teal dark:bg-[#1a3b33] dark:text-[#4fd1c5]"
      >
        Browse Listings
      </Link>
    </div>

    <div className="w-full overflow-hidden rounded-2xl border border-whitesmoke bg-white text-sm dark:border-[#2a2d33] dark:bg-[#1a1b1e]">
      <div className="grid grid-cols-[64px_1.2fr_1.4fr_160px_180px] bg-darkslategray-200 px-6 py-4 text-white dark:bg-[#00503f]">
        <b>No.</b>
        <b>Listing</b>
        <b>Address</b>
        <b>Status</b>
        <b>Actions</b>
      </div>

      {applications.length === 0 && (
        <div className="px-6 py-8 text-center font-bold text-teal dark:text-[#4fd1c5]">
          You have no current dorm applications.
        </div>
      )}

      {applications.slice(0, 5).map((application, index) => {
        const applicationId = getApplicationId(application);
        const canFinalize = application.status === 'waitlisted';

        return (
          <div
            key={applicationId || index}
            className="grid grid-cols-[64px_1.2fr_1.4fr_160px_180px] items-center gap-2 border-t border-whitesmoke px-6 py-4 text-left text-black first:border-t-0 dark:border-[#2a2d33] dark:text-[#edf6f4]"
          >
            <span>{index + 1}</span>
            <div className="flex flex-col">
              <b>{getFacilityName(application)}</b>
              <span className="text-xs text-dimgray dark:text-[#a4acba]">
                {getRoomType(application)}
              </span>
            </div>
            <span className="text-dimgray dark:text-[#a4acba]">{getAddress(application)}</span>
            <b className="text-teal dark:text-[#4fd1c5]">
              {applicationStatusLabel[application.status ?? 'pending'] ?? application.status}
            </b>
            {canFinalize && applicationId ? (
              <Link
                to={`/finappli?applicationId=${applicationId}`}
                className="rounded-2xl bg-lightcyan px-4 py-2 text-center text-sm font-bold text-teal dark:bg-[#1a3b33] dark:text-[#4fd1c5]"
              >
                Finalize
              </Link>
            ) : (
              <Link
                to="/applications"
                className="rounded-2xl bg-lightcyan px-4 py-2 text-center text-sm font-bold text-teal dark:bg-[#1a3b33] dark:text-[#4fd1c5]"
              >
                View Status
              </Link>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

const formatDate = (date?: string | Date | null) => {
  if (!date) return undefined;
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return undefined;
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const getLeaseEndDate = (moveInDate?: string, leaseDuration?: '6-months' | '12-months') => {
  if (!moveInDate || !leaseDuration) return undefined;
  const parsedDate = new Date(moveInDate);
  if (Number.isNaN(parsedDate.getTime())) return undefined;
  parsedDate.setMonth(parsedDate.getMonth() + (leaseDuration === '6-months' ? 6 : 12));
  return formatDate(parsedDate);
};

const getContractDurationLabel = (leaseDuration?: string) => {
  if (leaseDuration === '6-months') return '6 Months';
  if (leaseDuration === '12-months') return '1 Year';
  return undefined;
};

const getApprovedDormDetails = (application: ApplicationSummary): CurrentDormDetails => ({
  propertyImageSrc:
    typeof application.facilityId === 'object'
      ? application.facilityId.media?.[0]?.value
      : undefined,
  propertyName:
    typeof application.facilityId === 'object' ? application.facilityId.name : 'Approved Dorm',
  unitNumber:
    typeof application.unitId === 'object'
      ? application.unitId.roomNumber
      : typeof application.listingId === 'object'
        ? application.listingId.roomType
        : 'Assigned Unit',
  contractDuration: getContractDurationLabel(application.leaseDuration),
  leaseEndDate: getLeaseEndDate(application.moveInDate, application.leaseDuration),
});

const getRentalDormDetails = (rental: RentalSummary): CurrentDormDetails => ({
  propertyName: typeof rental.facilityId === 'object' ? rental.facilityId.name : 'Current Dorm',
  unitNumber: typeof rental.unitId === 'object' ? rental.unitId.roomNumber : 'Assigned Unit',
  contractDuration: 'Current Lease',
  leaseEndDate: formatDate(rental.actualMoveOutDate ?? rental.expectedMoveOutDate),
});

const ProfileSwitcher = () => {
  const [activeTab, setActiveTab] = useState<'dorm' | 'verification'>('dorm');
  const [currentDorm, setCurrentDorm] = useState<CurrentDormDetails | null>(null);
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);

  const verified = true;

  useEffect(() => {
    let cancelled = false;

    const loadDormState = async () => {
      const [rentalsResponse, applicationsResponse] = await Promise.allSettled([
        UserService.getMyRentals(),
        UserService.getMyApplications(),
      ]);

      if (cancelled) return;

      if (rentalsResponse.status === 'fulfilled') {
        const rentals = getDataArray<RentalSummary>(rentalsResponse.value);
        const currentRental =
          rentals.find((rental) => rental.status === 'active') ??
          rentals.find((rental) => rental.status === 'inactive');
        if (currentRental) setCurrentDorm(getRentalDormDetails(currentRental));
      }

      if (applicationsResponse.status === 'fulfilled') {
        const fetchedApplications = getDataArray<ApplicationSummary>(applicationsResponse.value);
        const approvedApplication = fetchedApplications.find(
          (application) => application.status === 'approved',
        );

        setApplications(
          fetchedApplications.filter((application) => application.status !== 'approved'),
        );
        if (approvedApplication) setCurrentDorm(getApprovedDormDetails(approvedApplication));
      }
    };

    void loadDormState();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="user-profile-shell w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-inter dark:bg-[#0f1010] dark:text-[#edf6f4]">
      <PageBackground />
      <div className="relative z-10 w-full max-w-[1440px] flex items-start">
        <div className="sticky top-0 left-0 h-screen w-[200px] hidden md:block shrink-0 z-10">
          <Sidebar />
        </div>

        <div className="w-full flex flex-col items-start justify-between gap-20 px-6 md:px-8">
          <div className="self-stretch flex flex-col items-start py-num-0 pr-20">
            <div className="bg-white/35  self-stretch min-h-[800px] rounded-2xl  flex flex-col items-start gap-3 text-center text-dimgray font-inter pb-10 dark:bg-transparent dark:text-[#a4acba]">
              <div
                className="self-stretch pt-15 px-8 shrink-0 flex items-end box-border gap-2.5"
                data-scroll-to="searchBarContainer"
              >
                <BreadcrumbHeader
                  routes={[
                    { name: 'Home', url: '/home' },
                    { name: 'User Profile', url: '/profile-switcher' },
                    {
                      name: activeTab === 'dorm' ? 'Current Dorm' : 'Verification Status',
                    },
                  ]}
                />
              </div>

              <ProfileInfo />

              <div className="self-stretch flex flex-col items-start gap-12">
                <Switch activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="self-stretch w-full">
                  {activeTab === 'dorm' ? (
                    currentDorm ? (
                      <CurrentDormCard
                        propertyImageSrc={currentDorm.propertyImageSrc}
                        propertyName={currentDorm.propertyName}
                        unitNumber={currentDorm.unitNumber}
                        contractDuration={currentDorm.contractDuration}
                        leaseEndDate={currentDorm.leaseEndDate}
                        verified={verified}
                      />
                    ) : (
                      <CurrentApplicationsList applications={applications} />
                    )
                  ) : (
                    <UserVerif verificationStep={0} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProfileSwitcher;
