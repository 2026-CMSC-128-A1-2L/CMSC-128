import CurrentDormInfoCard from '../../../../components/CurrentDormInfoCard';
import StepIndicator from '../../../../components/StepIndicator';
import SideBar from '../../../../components/user/SideBar';
import BreadcrumbHeader from '../../../../components/general/Breadcrumb';
import InfoContent from '../../../../components/user/user-report/InfoContent';
import ReviewContent from '../../../../components/user/user-report/ReviewContent';
import FinalizeContent from '../../../../components/user/user-report/FinalizeContent';
import { useState } from 'react';
import { useCurrentDormReviewDetails } from './useCurrentDormReviewDetails';
import { SkeletonBlock } from '../../../../components/general/Skeleton';

export default function Reportv2() {
  const StepIndicatorStages = ['Information', 'Reviewing', 'Finalize'];

  const [reportStages, setReportStages] = useState(1);
  const [reportJsonData, setReportJsonData] = useState('');
  const { details, isLoading, error } = useCurrentDormReviewDetails();

  return (
    <div className="flex">
      <div className="sticky top-0 left-0 h-screen w-[200px] hidden md:block shrink-0 z-10">
        <SideBar />
      </div>
      <div className="flex flex-col max-w-[1128px] ml-5 md:ml-10 py-10">
        <BreadcrumbHeader
          routes={[
            { name: 'Home', url: '/home' },
            { name: 'User Profile', url: '/profile-switcher' },
            { name: 'Current Dorm', url: '/profile-switcher' },
            { name: 'Report' },
          ]}
        />
        <div className="flex flex-col items-center max-w-[1128px] bg-white border border-whitesmoke-200 rounded-2xl overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="flex w-full flex-col gap-6 p-8">
              <div className="flex gap-6">
                <SkeletonBlock className="h-40 w-56 shrink-0 rounded-2xl" />
                <div className="flex flex-1 flex-col gap-4">
                  <SkeletonBlock className="h-7 w-2/5" />
                  <SkeletonBlock className="h-4 w-3/4" />
                  <SkeletonBlock className="h-4 w-1/2" />
                  <div className="flex gap-2 pt-2">
                    <SkeletonBlock className="h-8 w-20 rounded-full" />
                    <SkeletonBlock className="h-8 w-24 rounded-full" />
                    <SkeletonBlock className="h-8 w-16 rounded-full" />
                  </div>
                </div>
              </div>
              <SkeletonBlock className="h-16 w-full rounded-2xl" />
            </div>
          ) : error || !details ? (
            <div className="w-full py-20 text-center">
              <p className="text-[18px] font-bold text-[#024338]">No current dorm found</p>
              <p className="mt-2 text-[14px] font-medium text-[#62728b]">
                {error ?? 'You need an active dorm before you can report a listing.'}
              </p>
            </div>
          ) : (
            <>
              <CurrentDormInfoCard
                LandlordName={details.landlordName}
                ManagerName={details.managerName}
                DormitoryName={details.dormitoryName}
                DormitoryAddress={details.dormitoryAddress}
                RoomNumber={details.roomNumber}
                DormitoryImage={details.dormitoryImage}
                DormitoryTags={details.tags}
              />
              <StepIndicator currentStep={reportStages} steps={StepIndicatorStages} />

              {reportStages === 1 && (
                <InfoContent reportStages={reportStages} setReportStages={setReportStages} />
              )}
              {reportStages === 2 && (
                <ReviewContent
                  reportStages={reportStages}
                  setReportStages={setReportStages}
                  reportJsonData={reportJsonData}
                  setReportJsonData={setReportJsonData}
                />
              )}
              {reportStages === 3 && (
                <FinalizeContent
                  reportStages={reportStages}
                  setReportStages={setReportStages}
                  reportJsonData={reportJsonData}
                  listingId={details.listingId}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
