import { Icon } from '@iconify/react';
import placeholder from '../../../../../assets/one_sapphire_place.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReviewService } from '../../../../service/ReviewService';
import { UserService } from '../../../../service/UserService';
import { useCurrentDormReviewDetails } from './useCurrentDormReviewDetails';

interface CurrentDormCardProps {
  propertyImageSrc?: string;
  propertyName?: string;
  unitNumber?: string;
  contractDuration?: string;
  leaseEndDate?: string;
  verified?: true;
}

export default function CurrentDormCard({
  propertyImageSrc = placeholder,
  propertyName = 'One Sapphire Place',
  unitNumber = 'Room 31',
  contractDuration = '1 Year',
  leaseEndDate = 'May 18, 2026',
  verified = true,
  // default values for props, can be overridden when using the component
}: CurrentDormCardProps) {
  const [activeTab, setActiveTab] = useState('Contract Information');
  const [hasExistingReview, setHasExistingReview] = useState(false);
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
                  className={`relative font-semibold transition-colors ${activeTab === 'Contract Information' ? 'text-[#096C5B]' : 'text-black'}`}
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
                  className={`relative font-semibold transition-colors ${activeTab === 'Rate and Review' ? 'text-[#096C5B]' : 'text-black'}`}
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
                  className={`relative font-semibold transition-colors ${activeTab === 'Report Listing' ? 'text-[#096C5B]' : 'text-black'}`}
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
                  className={`relative font-semibold transition-colors ${activeTab === 'Pasalo Unit' ? 'text-[#096C5B]' : 'text-black'}`}
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
                className="px-4 py-1 text-gray-100 bg-[#f1f5f9] rounded-full dark:bg-[#202123] dark:text-[#a4acba]"
                onClick={() => {}}
              >
                Proceed
              </button>
            </div>
          )}

          {activeTab === 'Report Listing' && verified && (
            <div className="flex-1 flex flex-col items-center  justify-between h-full py-5">
              <p className="text-2xl font-bold  text-[#024338]">Report Status</p>

              <p className="text-[14px] text-slategray"> You haven't submitted any reports yet.</p>

              <button
                type="button"
                className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full dark:bg-[#0d3a32] dark:text-[#72cbb8]"
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
                className="px-4 py-1 text-gray-100 bg-[#f1f5f9] rounded-full dark:bg-[#202123] dark:text-[#a4acba]"
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
                {' '}
                Proceed to transfer your lease to someone else.
              </p>

              <button
                type="button"
                className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full dark:bg-[#0d3a32] dark:text-[#72cbb8]"
                onClick={() => {
                  navigate('/lease-transfer');
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
                className="px-4 py-1  text-gray-100  bg-[#f1f5f9] rounded-full"
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
