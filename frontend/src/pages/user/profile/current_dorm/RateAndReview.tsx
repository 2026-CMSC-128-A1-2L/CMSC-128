{
  /*interface InfoContentProps{
    reportStage:number,
    setReportStages: any
}

*/
}
import CurrentDormInfoCard from '../../../../components/CurrentDormInfoCard';
import StepIndicator from '../../../../components/StepIndicator';
import SideBar from '../../../../components/user/SideBar';
import BreadcrumbHeader from '../../../../components/general/Breadcrumb';
import RateInfoContent from '../../../../components/user/ratereview/RateInfoContent';

import { useState } from 'react';
import { useCurrentDormReviewDetails } from './useCurrentDormReviewDetails';

export default function RateAndReview() {
  const StepIndicatorStages = ['Information', 'Reviewing', 'Finalize'];

  const [rateStages, setRateStages] = useState(1);
  const { details, isLoading, error } = useCurrentDormReviewDetails();

  return (
    <div className="flex">
      <div className="sticky top-0 left-0 h-screen w-[200px] hidden md:block shrink-0 z-10">
          <SideBar />
      </div>
      <div className="flex flex-col max-w-[1128px] ml-5 md:ml-10 py-10">
        <BreadcrumbHeader
          routes={[
            { name: 'User Profile', url: '/profile-switcher' },
            { name: 'Current Dorm', url: '/profile-switcher' },
            { name: 'Rate and Review' },
          ]}
        />
        <div className="flex flex-col items-center max-w-[1128px] bg-white border border-whitesmoke-200 rounded-2xl overflow-hidden shadow-sm">
          {isLoading && (
            <div className="w-full px-10 py-20 text-center font-semibold text-dimgray">
              Loading your current dorm...
            </div>
          )}

          {!isLoading && error && (
            <div className="w-full px-10 py-20 text-center font-semibold text-crimson">{error}</div>
          )}

          {!isLoading && details && (
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
              <StepIndicator currentStep={rateStages} steps={StepIndicatorStages} />

              {rateStages === 1 && (
                <RateInfoContent rateStages={rateStages} setRateStages={setRateStages} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
