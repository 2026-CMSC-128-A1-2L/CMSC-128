// pages/user/ProfileSwitcher.tsx
import { useState, useCallback, useEffect } from 'react';
import CurrentDormCard from './current_dorm/CurrentDormCard';
import UserVerif from './verification/UserVerif';
import Sidebar from '../../../components/user/SideBar';
import Footer from '../../../components/general/Footer';
import PageBackground from '../../../components/general/PageBackground';
import Switch from '../../../components/user/CurrentDormToVerificationSwitch';
import ProfileInfo from '../../../components/user/ProfileInfo';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { UserService } from '../../../service/UserService';

type RentalSummary = { status?: string };
type ApplicationSummary = {
  _id?: string;
  id?: string;
  status?: string;
  facilityId?: string | { name?: string };
  listingId?: string | { roomType?: string };
};

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const CurrentApplicationsList = ({ applications }: { applications: ApplicationSummary[] }) => (
  <div className="w-full px-8 text-left text-darkslategray-100">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <b className="text-num-18">Current Applications</b>
        <b className="text-num-14 text-dimgray">{applications.length} active</b>
      </div>
      <Link
        to="/applications"
        className="rounded-2xl bg-lightcyan px-4 py-2 text-sm font-bold text-teal"
      >
        View all
      </Link>
    </div>
    <div className="overflow-hidden rounded-2xl border border-whitesmoke bg-white">
      {applications.length === 0 ? (
        <div className="p-8 text-center font-bold text-dimgray">
          No dorm yet. Your applications will appear here.
        </div>
      ) : (
        applications.slice(0, 5).map((application) => {
          const facilityName =
            typeof application.facilityId === 'object'
              ? application.facilityId.name
              : 'Dorm application';
          const roomType =
            typeof application.listingId === 'object'
              ? application.listingId.roomType
              : 'Selected room';

          return (
            <div
              key={application.id ?? application._id}
              className="flex items-center justify-between border-t border-whitesmoke px-6 py-4 first:border-t-0"
            >
              <div>
                <b>{facilityName}</b>
                <div className="text-sm text-dimgray">{roomType}</div>
              </div>
              <b className="text-sm text-teal">{application.status ?? 'pending'}</b>
            </div>
          );
        })
      )}
    </div>
  </div>
);

const ProfileSwitcher = () => {
  const [activeTab, setActiveTab] = useState<'dorm' | 'verification'>('dorm');
  const [hasCurrentDorm, setHasCurrentDorm] = useState(false);
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);

  const onArrowUpClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='searchBarContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  const propertyImageSrc = undefined;
  const propertyName = undefined;
  const unitNumber = undefined;
  const contractDuration = undefined;
  const leaseEndDate = undefined;
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
        setHasCurrentDorm(rentals.some((rental) => rental.status === 'active'));
      }

      if (applicationsResponse.status === 'fulfilled') {
        setApplications(getDataArray<ApplicationSummary>(applicationsResponse.value));
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

        <div className="w-full flex flex-col items-start justify-between gap-20 pl-5">
          <div className="self-stretch flex flex-col items-start py-num-0 pr-20">
            <div
              className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5"
              data-scroll-to="searchBarContainer"
            >
              <div className="h-6 flex items-center gap-1.5">
                <div className="relative font-semibold">User Profile</div>
                <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                <div className="relative font-semibold">
                  {activeTab === 'dorm' ? 'Current Dorm' : 'Verification Status'}
                </div>
              </div>
            </div>

            <div className="bg-white/35  self-stretch min-h-[800px] rounded-2xl  flex flex-col items-start gap-3 text-center text-dimgray font-inter pb-10 dark:bg-transparent dark:text-[#a4acba]">
              <ProfileInfo />

              <div className="self-stretch flex flex-col items-start gap-12">
                <Switch activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="self-stretch w-full">
                  {activeTab === 'dorm' ? (
                    hasCurrentDorm ? (
                      <CurrentDormCard
                        propertyImageSrc={propertyImageSrc}
                        propertyName={propertyName}
                        unitNumber={unitNumber}
                        contractDuration={contractDuration}
                        leaseEndDate={leaseEndDate}
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
            {/* ======= SCROLL UP ICON ======= */}
            <button
              type="button"
              className="fixed bottom-32 right-10 w-[60px] h-[60px] rounded-[30px] [background:linear-gradient(183.48deg,#096c5b,#16917c)] flex items-center justify-center cursor-pointer z-1000 shadow-lg transition-all hover:scale-110 active:scale-95"
              onClick={onArrowUpClick}
            >
              <Icon icon="mdi:arrow-up" className="w-[27.7px] h-[27.7px] text-white" />
            </button>
            {/* ======= SCROLL UP ICON ======= */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProfileSwitcher;
