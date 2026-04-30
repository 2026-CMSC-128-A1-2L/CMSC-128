{
  /*interface InfoContentProps{
    reportStage:number,
    setReportStages: any
}

*/
}
import CurrentDormInfoCard from '../../../../components/CurrentDormInfoCard';
import StepIndicator from '../../../../components/StepIndicator';
import DormitoryImg from '../../../../../assets/image.png';
import SideBar from '../../../../components/user/SideBar';
import BreadcrumbHeader from '../../../../components/general/Breadcrumb';
import RateInfoContent from '../../../../components/user/ratereview/RateInfoContent';

import FAQ from '../../../../components/user/FAQ';
import { useState } from 'react';
export default function RateAndReview() {
  const LandlordName = 'Quevin Custodio';
  const ManagerName = 'Nathaniel Cunanan';
  const DormitoryName = 'One Sapphire Place';
  const DormitoryAddress = 'Batong Malake, Los Banos, Laguna';
  const RoomNumber = 'Room 31';
  const DormitoryImage = DormitoryImg;
  const DormitoryTags = ['Single Room', '~18 sqm', 'Contract: April 2026 - April 2027'];

  const StepIndicatorStages = ['Information', 'Reviewing', 'Finalize'];

  const [rateStages, setRateStages] = useState(1);
  const [rateJsonData, setRateJsonData] = useState('');

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col max-w-[1128px] ml-5 md:ml-10 py-10">
        <BreadcrumbHeader
          routes={[
            { name: 'User Profile', url: '/profile-switcher' },
            { name: 'Current Dorm', url: '/profile-switcher' },
            { name: 'Rate and Review' },
          ]}
        />
        <div className="flex flex-col items-center max-w-[1128px] bg-white border border-whitesmoke-200 rounded-2xl overflow-hidden shadow-sm">
          <CurrentDormInfoCard
            LandlordName={LandlordName}
            ManagerName={ManagerName}
            DormitoryName={DormitoryName}
            DormitoryAddress={DormitoryAddress}
            RoomNumber={RoomNumber}
            DormitoryImage={DormitoryImage}
            DormitoryTags={DormitoryTags}
          />
          <StepIndicator currentStep={rateStages} steps={StepIndicatorStages} />

          {rateStages === 1 && (
            <RateInfoContent rateStages={rateStages} setRateStages={setRateStages} />
          )}
          {rateStages === 2 && (
            <></>
            // <ReviewContent
            //   rateStages={rateStages}
            //   setRateStages={setRateStages}
            //   rateJsonData={rateJsonData}
            //   setRateJsonData={setRateJsonData}
            // />
          )}
          {rateStages === 3 && (
            <></>
            // <FinalizeContent
            //   rateStages={rateStages}
            //   setRateStages={setRateStages}
            //   rateJsonData={rateJsonData}
            // />
          )}
        </div>
      </div>
    </div>
  );
}
