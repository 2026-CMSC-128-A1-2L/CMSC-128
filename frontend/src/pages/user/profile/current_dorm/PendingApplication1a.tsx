import { type FunctionComponent, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../../../components/user/SideBar';
import Footer from '../../../../components/general/Footer';
import ProfileInfo from '../../../../components/user/ProfileInfo';
import { ApplicationService } from '../../../../service/ApplicationService';
import { TableSkeletonRows } from '../../../../components/general/Skeleton';

type ApplicationSummary = {
  _id?: string;
  id?: string;
  status?: 'pending' | 'rejected' | 'waitlisted' | 'approved' | 'finalized';
  leaseDuration?: string;
  moveInDate?: string;
  createdAt?: string;
  facilityId?: string | { name?: string; location?: { text?: string } };
  listingId?: string | { roomType?: string; tags?: Record<string, string | number | boolean> };
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
  if (typeof application.facilityId === 'object') return application.facilityId.name ?? 'Dorm';
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

const statusLabel: Record<string, string> = {
  pending: 'Initial screening',
  waitlisted: 'Initial accepted',
  finalized: 'Submitted for final approval',
  approved: 'Approved',
  rejected: 'Rejected',
};

const PendingApplication1a: FunctionComponent = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadApplications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await ApplicationService.getMyApplications();
        if (!cancelled) setApplications(getDataArray<ApplicationSummary>(response));
      } catch {
        if (!cancelled) setError('Could not load your applications.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadApplications();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col text-left text-num-14 text-darkslategray-100 font-lora">
      <div className="flex w-full max-w-[1440px] items-start">
        <div className="sticky top-0 hidden h-screen w-[200px] shrink-0 md:block">
          <Sidebar />
        </div>

        <main className="flex min-h-screen flex-1 flex-col justify-between gap-12 px-5 pr-20">
          <div className="flex flex-col gap-3">
            <div className="h-16 flex items-end p-num-10">
              <div className="flex h-6 items-center gap-1.5">
                <div className="font-semibold">User Profile</div>
                <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6" />
                <div className="font-semibold">Applications</div>
              </div>
            </div>

            <section className="rounded-2xl bg-white/45 pb-10 text-center text-dimgray font-inter">
              <ProfileInfo />

              <div className="flex flex-col items-start gap-6 px-8 text-darkslategray-100">
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <b className="text-num-18">Your Applications</b>
                    <b className="text-num-18 text-dimgray">
                      {applications.length} out of 5 Dorm Applications
                    </b>
                  </div>
                  <Link
                    to="/home"
                    className="rounded-2xl bg-lightcyan px-4 py-2 text-sm font-bold text-teal"
                  >
                    Browse Listings
                  </Link>
                </div>

                <div className="w-full overflow-hidden rounded-2xl border border-whitesmoke bg-white text-sm">
                  <div className="grid grid-cols-[64px_1.2fr_1.4fr_160px_180px] bg-darkslategray-200 px-6 py-4 text-white">
                    <b>No.</b>
                    <b>Listing</b>
                    <b>Address</b>
                    <b>Status</b>
                    <b>Actions</b>
                  </div>

                  {isLoading ? (
                    <table className="w-full">
                      <tbody>
                        <TableSkeletonRows columns={5} rows={4} actionColumn />
                      </tbody>
                    </table>
                  ) : error ? (
                    <div className="px-6 py-8 text-center font-bold text-red-500">{error}</div>
                  ) : applications.length === 0 ? (
                    <div className="px-6 py-8 text-center font-bold text-teal">
                      You have no current dorm applications.
                    </div>
                  ) : (
                    applications.map((application, index) => {
                      const applicationId = getApplicationId(application);
                      const canFinalize = application.status === 'waitlisted';

                      return (
                        <div
                          key={applicationId || index}
                          className="grid grid-cols-[64px_1.2fr_1.4fr_160px_180px] items-center gap-2 border-t border-whitesmoke px-6 py-4 text-left text-black"
                        >
                          <span>{index + 1}</span>
                          <div className="flex flex-col">
                            <b>{getFacilityName(application)}</b>
                            <span className="text-xs text-dimgray">{getRoomType(application)}</span>
                          </div>
                          <span className="text-dimgray">{getAddress(application)}</span>
                          <b className="text-teal">
                            {statusLabel[application.status ?? 'pending'] ?? application.status}
                          </b>
                          <button
                            type="button"
                            disabled={!canFinalize}
                            onClick={() => navigate(`/finappli?applicationId=${applicationId}`)}
                            className="rounded-2xl bg-lightcyan px-4 py-2 text-sm font-bold text-teal disabled:cursor-not-allowed disabled:bg-aliceblue disabled:text-slategray"
                          >
                            {canFinalize ? 'Finalize' : 'View Status'}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default PendingApplication1a;
