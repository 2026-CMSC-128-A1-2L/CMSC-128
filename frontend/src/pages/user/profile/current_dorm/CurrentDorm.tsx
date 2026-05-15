import { type FunctionComponent, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import placeholder from '../../../../../assets/logo_atlas_text.svg';
import { Link } from 'react-router-dom';
import { ApplicationService } from '../../../../service/ApplicationService';

type ApprovedApplication = {
  status?: string;
  facilityId?: string | { name?: string; media?: { value?: string }[] };
  listingId?: string | { roomType?: string };
  unitId?: string | { roomNumber?: string };
  leaseDuration?: '6-months' | '12-months';
  moveInDate?: string;
};

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const formatDate = (date?: string | Date) => {
  if (!date) return 'Not available';
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return 'Not available';
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const getLeaseEndDate = (moveInDate?: string, leaseDuration?: '6-months' | '12-months') => {
  if (!moveInDate || !leaseDuration) return 'Not available';
  const parsedDate = new Date(moveInDate);
  if (Number.isNaN(parsedDate.getTime())) return 'Not available';
  parsedDate.setMonth(parsedDate.getMonth() + (leaseDuration === '6-months' ? 6 : 12));
  return formatDate(parsedDate);
};

const CurrentDorm: FunctionComponent = () => {
  const [approvedApplication, setApprovedApplication] = useState<ApprovedApplication | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadApprovedDorm = async () => {
      const response = await ApplicationService.getMyApplications({
        limit: 50,
        status: 'approved',
      });
      if (!cancelled) {
        setApprovedApplication(getDataArray<ApprovedApplication>(response)[0] ?? null);
      }
    };

    void loadApprovedDorm();
    return () => {
      cancelled = true;
    };
  }, []);

  const propertyName =
    typeof approvedApplication?.facilityId === 'object'
      ? approvedApplication.facilityId.name
      : 'Current Dorm';
  const propertyImageSrc =
    typeof approvedApplication?.facilityId === 'object'
      ? (approvedApplication.facilityId.media?.[0]?.value ?? placeholder)
      : placeholder;
  const unitNumber =
    typeof approvedApplication?.unitId === 'object'
      ? approvedApplication.unitId.roomNumber
      : typeof approvedApplication?.listingId === 'object'
        ? approvedApplication.listingId.roomType
        : 'Assigned Unit';
  const contractDuration =
    approvedApplication?.leaseDuration === '6-months'
      ? '6 Months'
      : approvedApplication?.leaseDuration === '12-months'
        ? '1 Year'
        : 'Not available';
  const leaseEndDate = getLeaseEndDate(
    approvedApplication?.moveInDate,
    approvedApplication?.leaseDuration,
  );

  return (
    <div className="self-stretch h-[680px] flex flex-col items-start gap-12 text-white">
      {/* {<Switch />} */}
      <div className="self-stretch flex flex-col items-start gap-3 shrink-0 text-[24px] text-teal-200">
        <div className="w-[1128px] h-[520px] bg-white flex flex-col items-center justify-center">
          <div className="w-[916px] h-[520px] rounded-num-12 border-whitesmoke-200 border-solid border box-border flex flex-col items-start">
            <img
              className="w-[916px] relative rounded-t-num-12 rounded-b-none max-h-full object-cover"
              alt=""
              src={propertyImageSrc}
            />
            <div className="self-stretch h-40 flex flex-col items-start">
              <div className="w-[916px] h-16 flex flex-col items-center justify-center py-5 px-[27px] box-border shrink-0 text-left text-black">
                <b className="relative leading-8 shrink-0">{propertyName}</b>
              </div>
              <div className="flex items-center py-num-0 px-[26px] gap-3 shrink-0 text-[18px]">
                <div className="h-20 w-[280px] rounded-num-12 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center">
                  <div className="self-stretch flex items-center justify-center py-num-24 px-num-10">
                    <b className="relative tracking-[-0.01em]">{unitNumber}</b>
                  </div>
                  <div className="flex items-center justify-center p-num-10 mt-[-32px] relative text-[8px] text-black font-lora">
                    <div className="relative tracking-[0.04em] font-semibold">UNIT</div>
                  </div>
                </div>
                <div className="h-20 w-[280px] rounded-num-12 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center">
                  <div className="self-stretch flex items-center justify-center py-num-24 px-num-10">
                    <b className="relative tracking-[-0.01em]">{contractDuration}</b>
                  </div>
                  <div className="flex items-center justify-center p-num-10 mt-[-32px] relative text-[8px] text-black font-lora">
                    <div className="relative tracking-[0.04em] font-semibold">Contract</div>
                  </div>
                </div>
                <div className="h-20 w-[280px] rounded-num-12 bg-white border-whitesmoke-200 border-solid border box-border flex flex-col items-center">
                  <div className="self-stretch flex items-center justify-center py-num-24 px-num-10">
                    <b className="relative tracking-[-0.01em]">{leaseEndDate}</b>
                  </div>
                  <div className="flex items-center justify-center p-num-10 mt-[-32px] relative text-[8px] text-black font-lora">
                    <div className="relative tracking-[0.04em] font-semibold">Lease End</div>
                  </div>
                </div>
              </div>
              <div className="w-[916px] flex items-center justify-center py-num-10 px-num-0 box-border shrink-0 text-[12px]">
                <div className="h-10 w-[863px] rounded-num-12 border-whitesmoke-200 border-solid border box-border flex items-center justify-center">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[12px] text-teal-100 cursor-pointer hover:underline"
                  >
                    <div className="relative font-medium">View Details</div>
                    <Icon icon="solar:arrow-right-up-linear" className="h-6 w-6 relative" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex items-start justify-center pt-num-24 px-num-32 pb-20 gap-6 text-num-14 text-black">
          <div className="w-[280px] rounded-2xl border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex flex-col items-start py-3 px-4">
            <div className="self-stretch flex flex-col items-end py-3 px-num-0 gap-2">
              <Link to="/contract-information" className="cursor-pointer hover:underline">
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                  <div className="relative font-semibold">Contract Information</div>
                  <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                </div>
              </Link>

              <Link to="/rate-review" className="cursor-pointer hover:underline">
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                  <div className="relative font-semibold">Rate and Review</div>
                  <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                </div>
              </Link>

              <Link to="/report-dorm" className="cursor-pointer hover:underline">
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                  <div className="relative font-semibold">Report Listing</div>
                  <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                </div>
              </Link>

              <Link to="/lease-transfer" className="cursor-pointer hover:underline">
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                  <div className="relative font-semibold">Pasalo Unit</div>
                  <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                </div>
              </Link>
            </div>
          </div>
          <div className="h-[168px] w-[612px] rounded-lg border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex items-center px-8 text-left" />
        </div>
      </div>
    </div>
  );
};

export default CurrentDorm;
