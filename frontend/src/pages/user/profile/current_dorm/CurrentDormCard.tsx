import { Icon } from '@iconify/react';
import placeholder from '../../../../../assets/one_sapphire_place.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DefaultAvatar from '../../../../../assets/default_avatar.svg';
import { RentalService } from '../../../../service/RentalService';
import { ReviewService } from '../../../../service/ReviewService';
import { ReportService } from '../../../../service/ReportService';
import { UserService } from '../../../../service/UserService';
import { useCurrentDormReviewDetails } from './useCurrentDormReviewDetails';

interface Roommate {
  id?: string;
  name: string;
  avatarSrc?: string;
}

interface CurrentDormCardProps {
  propertyImageSrc?: string;
  propertyName?: string;
  unitNumber?: string;
  contractDuration?: string;
  leaseEndDate?: string;
  allowTransfer?: boolean;
  verified?: true;
  roommates?: Roommate[];
}

type ListingReportSummary = {
  _id?: string;
  id?: string;
  __t?: string;
  listingId?: string | Record<string, unknown>;
  status?: 'pending' | 'resolved' | 'dismissed';
  createdAt?: string;
};

type ReportStatusState = {
  status: 'pending' | 'resolved' | 'dismissed' | null;
  isLoading: boolean;
};

type RentalUser = {
  id?: string;
  _id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  profilePicture?: string | null;
};

type UnitRental = {
  id?: string;
  _id?: string;
  status?: 'active' | 'ended' | 'on_waitlist' | 'inactive';
  userId?: string | RentalUser;
  facilityId?: string | Record<string, unknown>;
  unitId?: string | Record<string, unknown>;
};

const getDisplayName = (user: RentalUser) =>
  [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' ') || 'Roommate';

export default function CurrentDormCard({
  propertyImageSrc = placeholder,
  propertyName = 'One Sapphire Place',
  unitNumber = 'Room 31',
  contractDuration = '1 Year',
  leaseEndDate = 'May 18, 2026',
  allowTransfer = false,
  verified = true,
  roommates,
  // default values for props, can be overridden when using the component
}: CurrentDormCardProps) {
  const [activeTab, setActiveTab] = useState('Contract Information');
  const [hasExistingReview, setHasExistingReview] = useState(false);
  const [fetchedRoommates, setFetchedRoommates] = useState<Roommate[]>([]);
  const [isLoadingRoommates, setIsLoadingRoommates] = useState(false);
  const [reportStatus, setReportStatus] = useState<ReportStatusState>({
    status: null,
    isLoading: false,
  });
  const { details } = useCurrentDormReviewDetails();

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const loadReviewStatus = async () => {
      if (!details?.listingId) {
        setHasExistingReview(false);
        return;
      }

      try {
        const [selfResponse, reviewsResponse] = await Promise.all([
          UserService.getSelf(),
          ReviewService.getListingReviews(details.listingId),
        ]);

        if (cancelled) return;

        const self = getDataObject<Record<string, unknown>>(selfResponse);
        const selfId = getEntityId(self);
        const reviews = getDataArray<ReviewSummary>(reviewsResponse);

        setHasExistingReview(
          Boolean(selfId) && reviews.some((review) => getEntityId(review.userId) === selfId),
        );
      } catch {
        if (!cancelled) setHasExistingReview(false);
      }
    };

    void loadReviewStatus();
    return () => {
      cancelled = true;
    };
  }, [details?.listingId]);

  useEffect(() => {
    let cancelled = false;

    const loadRoommates = async () => {
      if (!details?.unitId) {
        setFetchedRoommates([]);
        return;
      }

      setIsLoadingRoommates(true);

      try {
        const [selfResponse, rentalsResponse] = await Promise.all([
          UserService.getSelf(),
          RentalService.getRentalByUnit(details.unitId),
        ]);

        if (cancelled) return;

        const self = getDataObject<Record<string, unknown>>(selfResponse);
        const selfId = getEntityId(self);
        const rentals = getDataArray<UnitRental>(rentalsResponse);

        const roommatesById = new Map<string, Roommate>();
        rentals
          .filter(
            (rental) => rental.status !== 'ended' && getEntityId(rental.unitId) === details.unitId,
          )
          .forEach((rental) => {
            if (!rental.userId || typeof rental.userId === 'string') return;

            const roommateId = getEntityId(rental.userId);
            if (!roommateId || roommateId === selfId || roommatesById.has(roommateId)) return;

            roommatesById.set(roommateId, {
              id: roommateId,
              name: getDisplayName(rental.userId),
              avatarSrc: rental.userId.profilePicture ?? undefined,
            });
          });

        setFetchedRoommates([...roommatesById.values()]);
      } catch {
        if (!cancelled) setFetchedRoommates([]);
      } finally {
        if (!cancelled) setIsLoadingRoommates(false);
      }
    };

    void loadRoommates();
    return () => {
      cancelled = true;
    };
  }, [details?.unitId]);

  useEffect(() => {
    let cancelled = false;

    const loadReportStatus = async () => {
      if (!details?.listingId) {
        setReportStatus({ status: null, isLoading: false });
        return;
      }

      setReportStatus((current) => ({ ...current, isLoading: true }));

      try {
        const response = await ReportService.getMyReports();
        if (cancelled) return;

        const reports = getDataArray<ListingReportSummary>(response);
        const latestListingReport = reports.find(
          (report) =>
            report.__t === 'ListingReport' && getEntityId(report.listingId) === details.listingId,
        );

        setReportStatus({
          status: latestListingReport?.status ?? null,
          isLoading: false,
        });
      } catch {
        if (!cancelled) setReportStatus({ status: null, isLoading: false });
      }
    };

    void loadReportStatus();
    return () => {
      cancelled = true;
    };
  }, [details?.listingId]);

  const handleViewDetails = () => {
    navigate(details?.facilityId ? `/facilities/${details.facilityId}` : '/current-dorm');
  };

  const displayedRoommates = roommates ?? fetchedRoommates;
  const hasPendingReport = reportStatus.status === 'pending';
  const reportStatusMessage =
    reportStatus.status === 'pending'
      ? 'Your report is still pending. You cannot submit another report for this listing yet.'
      : reportStatus.status === 'dismissed'
        ? 'Your previous report was dismissed. You may submit another report if needed.'
        : reportStatus.status === 'resolved'
          ? 'Your previous report was resolved. You may submit another report if needed.'
          : "You haven't submitted any reports yet.";

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto dark:text-[#edf6f4]">
      <div className="max-w-4xl mx-auto rounded-xl border border-[#f0f0f0] bg-white overflow-hidden shadow-sm text-black dark:border-[#303331] dark:bg-[#101111] dark:text-[#edf6f4] dark:shadow-none">
        {/* Property Image */}
        <img
          src={propertyImageSrc}
          alt={propertyName}
          className="w-[1200px] h-[400px] object-cover"
        />

        <div className="p-6">
          {/* Property Title */}
          <h2 className="text-center text-3xl font-extrabold mb-8">{propertyName}</h2>

          {/* Information Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Unit Box */}
            <div className="text-center border border-[#f0f0f0] rounded-lg p-4 dark:border-[#303331] dark:bg-[#101111]">
              <p className="text-xl font-bold text-teal-700">{unitNumber}</p>
              <p className="text-xs">Unit</p>
            </div>

            {/* Contract Box */}
            <div className="text-center border border-[#f0f0f0] rounded-lg p-4 dark:border-[#303331] dark:bg-[#101111]">
              <p className="text-xl font-bold text-teal-700">{contractDuration}</p>
              <p className="text-xs">Contract</p>
            </div>

            {/* Lease End Box */}
            <div className="text-center border border-[#f0f0f0] rounded-lg p-4 dark:border-[#303331] dark:bg-[#101111]">
              <p className="text-xl font-bold text-teal-700">{leaseEndDate}</p>
              <p className="text-xs">Lease End</p>
            </div>
          </div>

          {/* Roommates Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-center">Your Roommates</h3>

            {isLoadingRoommates ? (
              <p className="text-center text-sm font-semibold text-slategray">
                Loading roommates...
              </p>
            ) : displayedRoommates.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4">
                {displayedRoommates.map((roommate, index) => (
                  <div
                    key={roommate.id ?? roommate.name}
                    className="w-[180px] flex flex-col items-center border border-[#f0f0f0] rounded-lg p-4 dark:border-[#303331] dark:bg-[#101111]"
                  >
                    <img
                      src={roommate.avatarSrc || DefaultAvatar}
                      alt={roommate.name}
                      className="w-16 h-16 rounded-full object-cover mb-2"
                    />

                    <p className="text-sm font-semibold text-center">{roommate.name}</p>

                    <p className="text-xs">Roommate {index + 1}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm font-semibold text-slategray">
                No roommates found for this unit.
              </p>
            )}
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleViewDetails}
            className="w-full border border-[#f0f0f0] text-teal-700 text-sm font-semibold rounded-md py-3 flex items-center justify-center gap-2 hover:border-teal-500 cursor-pointer transition dark:border-[#303331] dark:text-[#72cbb8] dark:hover:border-[#72cbb8]"
          >
            View Details
            <Icon icon="heroicons:arrow-top-right-on-square" className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="self-stretch flex items-start justify-center pt-num-24 px-num-32 pb-20 gap-6 text-num-14 text-black dark:text-[#edf6f4]">
        {/* left sidebar */}
        <div className="h-[168px] w-[280px] rounded-2xl border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex flex-col items-start py-3 px-4 dark:border-[#303331] dark:bg-[#101111]">
          <div className="self-stretch flex flex-col items-end py-1 px-0 gap-1">
            {/* contract info */}
            <button
              type="button"
              className="self-stretch flex items-center justify-end py-1 px-3 cursor-pointer group bg-transparent border-0 text-right"
              onClick={() => setActiveTab('Contract Information')}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`relative font-semibold transition-colors ${activeTab === 'Contract Information' ? 'text-[#096C5B]' : 'text-black'} cursor-pointer`}
                >
                  Contract Information
                </div>
                <Icon
                  icon="iconamoon:arrow-right-2"
                  className={`h-6 w-6 transition-colors ${activeTab === 'Contract Information' ? 'text-[#096C5B]' : 'text-black'}`}
                />
              </div>
            </button>

            {/* rate and review */}
            <button
              type="button"
              className="self-stretch flex items-center justify-end py-1 px-3 cursor-pointer group bg-transparent border-0 text-right"
              onClick={() => setActiveTab('Rate and Review')}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`relative font-semibold transition-colors ${activeTab === 'Rate and Review' ? 'text-[#096C5B]' : 'text-black'} cursor-pointer`}
                >
                  Rate and Review
                </div>
                <Icon
                  icon="iconamoon:arrow-right-2"
                  className={`h-6 w-6 transition-colors ${activeTab === 'Rate and Review' ? 'text-[#096C5B]' : 'text-black'}`}
                />
              </div>
            </button>

            {/* report listing */}
            <button
              type="button"
              className="self-stretch flex items-center justify-end py-1 px-3 cursor-pointer group bg-transparent border-0 text-right"
              onClick={() => setActiveTab('Report Listing')}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`relative font-semibold transition-colors ${activeTab === 'Report Listing' ? 'text-[#096C5B]' : 'text-black'} cursor-pointer`}
                >
                  Report Listing
                </div>
                <Icon
                  icon="iconamoon:arrow-right-2"
                  className={`h-6 w-6 transition-colors ${activeTab === 'Report Listing' ? 'text-[#096C5B]' : 'text-black'}`}
                />
              </div>
            </button>

            {/* pasalo unit */}
            <button
              type="button"
              className="self-stretch flex items-center justify-end py-1 px-3 cursor-pointer group bg-transparent border-0 text-right"
              onClick={() => setActiveTab('Pasalo Unit')}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`relative font-semibold transition-colors ${activeTab === 'Pasalo Unit' ? 'text-[#096C5B]' : 'text-black'} cursor-pointer`}
                >
                  Pasalo Unit
                </div>
                <Icon
                  icon="iconamoon:arrow-right-2"
                  className={`h-6 w-6 transition-colors ${activeTab === 'Pasalo Unit' ? 'text-[#096C5B]' : 'text-black'}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* right sidebar: contents */}
        <div className="h-[168px] w-[612px] rounded-lg border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex items-center px-8 text-center dark:border-[#303331] dark:bg-[#101111]">
          {activeTab === 'Contract Information' && (
            <div className="flex-1 flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <Icon icon="line-md:file" className="h-10 w-10 text-black dark:text-[#edf6f4]" />
                <div className="flex flex-col items-start justify-center">
                  <b className="text-[16px] text-black dark:text-[#edf6f4]">tenancy_contract.pdf</b>
                  <div className="text-[12px] font-semibold text-slategray">
                    Submitted: 02 April 2026
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                <b className="text-[14px] text-[#096C5B]">Download Tenancy Contract</b>
                <Icon icon="material-symbols:download-rounded" className="h-6 w-6 text-[#096C5B]" />
              </div>
            </div>
          )}

          {activeTab === 'Rate and Review' && verified && (
            <div className="flex-1 flex flex-col items-center py-5 justify-between h-full">
              <p className="text-2xl font-bold  text-[#024338]">Accommodation Review</p>

              <p className="text-[14px] text-slategray">
                {hasExistingReview
                  ? 'You already reviewed this dormitory. Proceeding will update your existing review.'
                  : "You haven't rated or reviewed this property yet."}
              </p>

              <button
                type="button"
                className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full dark:bg-[#0d3a32] dark:text-[#72cbb8]"
                onClick={() => {
                  navigate('/rate-review');
                }}
              >
                {hasExistingReview ? 'Update Review' : 'Proceed'}
              </button>
            </div>
          )}

          {activeTab === 'Rate and Review' && !verified && (
            <div className="flex-1 flex flex-col items-center justify-between h-full py-5">
              <p className="text-2xl font-bold  text-[#024338]">Accommodation Review</p>

              <p className="text-[14px] text-slategray">
                {' '}
                You are not eligible to review this property. Please verify your account first.
              </p>

              <button
                type="button"
                className="px-4 py-1 text-gray-100 bg-[#f1f5f9] rounded-full dark:bg-[#202123] dark:text-[#a4acba] cursor-pointer"
                onClick={() => {}}
              >
                Proceed
              </button>
            </div>
          )}

          {activeTab === 'Report Listing' && verified && (
            <div className="flex-1 flex flex-col items-center  justify-between h-full py-5">
              <p className="text-2xl font-bold  text-[#024338]">Report Status</p>

              <p className="text-[14px] text-slategray">
                {reportStatus.isLoading ? 'Checking report status...' : reportStatusMessage}
              </p>

              <button
                type="button"
                disabled={reportStatus.isLoading || hasPendingReport || !details?.listingId}
                className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#0d3a32] dark:text-[#72cbb8]"
                onClick={() => {
                  navigate('/report-dorm');
                }}
              >
                Proceed
              </button>
            </div>
          )}

          {activeTab === 'Report Listing' && !verified && (
            <div className="flex-1 flex flex-col items-center  justify-between h-full py-5">
              <p className="text-2xl font-bold  text-[#024338]">Report Status</p>

              <p className="text-[14px] text-slategray">
                {' '}
                You are not eligible to submit reports for this property. Please verify your account
                first.
              </p>

              <button
                type="button"
                className="px-4 py-1 text-gray-100 bg-[#f1f5f9] rounded-full dark:bg-[#202123] dark:text-[#a4acba] cursor-pointer"
                onClick={() => {}}
              >
                Proceed
              </button>
            </div>
          )}

          {activeTab === 'Pasalo Unit' && verified && (
            <div className="flex-1 flex flex-col items-center  justify-between h-full py-5">
              <p className="text-2xl font-bold  text-[#024338]">Pasalo Unit</p>

              <p className="text-[14px] text-slategray">
                {allowTransfer
                  ? 'Proceed to transfer your lease to someone else.'
                  : 'Pasalo is not available for this property.'}
              </p>

              <button
                type="button"
                disabled={!allowTransfer}
                className={`px-4 py-1 rounded-full ${
                  allowTransfer
                    ? 'cursor-pointer text-[#096c5b] bg-[#f1f5f9] dark:bg-[#0d3a32] dark:text-[#72cbb8]'
                    : 'cursor-not-allowed text-gray-100 bg-[#f1f5f9] opacity-60 dark:bg-[#202123] dark:text-[#a4acba]'
                }`}
                onClick={() => {
                  if (allowTransfer) navigate('/lease-transfer');
                }}
              >
                Proceed
              </button>
            </div>
          )}

          {activeTab === 'Pasalo Unit' && !verified && (
            <div className="flex-1 flex flex-col items-center  justify-between h-full py-5">
              <p className="text-2xl font-bold  text-[#024338]">Pasalo Unit</p>

              <p className="text-[14px] text-slategray ">
                {' '}
                You are not eligible to transfer your lease for this property. Please verify your
                account first.
              </p>

              <button
                type="button"
                className="px-4 py-1  text-gray-100  bg-[#f1f5f9] rounded-full cursor-pointer"
                onClick={() => {}}
              >
                Proceed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type ReviewSummary = {
  userId?: string | Record<string, unknown>;
};

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const getDataObject = <T,>(response: unknown): T | undefined => {
  if (!response || typeof response !== 'object') return undefined;
  if ('data' in response) return (response as { data?: T }).data;
  return response as T;
};

const getEntityId = (value: unknown) => {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return undefined;
  const id = (value as { id?: unknown; _id?: unknown }).id ?? (value as { _id?: unknown })._id;
  return typeof id === 'string' ? id : id ? String(id) : undefined;
};
