import CurrentDormInfoCard from '../../../../components/CurrentDormInfoCard';
import StepIndicator from '../../../../components/StepIndicator';
import DormitoryImg from '../../../../../assets/image.png';
import SideBar from '../../../../components/user/SideBar';
import Header from '../../../../components/user/user-report/Header';
import BreadcrumbHeader from '../../../../components/general/Breadcrumb';
import ReasonContent from '../../../../components/user/lease-transfer/ReasonContent';

import { useState } from 'react';
import DocumentsContent from '../../../../components/user/lease-transfer/DocumentsContent';
import FinalizeContent from '../../../../components/user/lease-transfer/FinalizeContent';
export default function LeaseTransfer() {
  const LandlordName = 'Quevin Custodio';
  const ManagerName = 'Nathaniel Cunanan';
  const DormitoryName = 'One Sapphire Place';
  const DormitoryAddress = 'Batong Malake, Los Banos, Laguna';
  const RoomNumber = 'Room 31';
  const DormitoryImage = DormitoryImg;
  const DormitoryTags = ['Single Room', '~18 sqm', 'Contract: April 2026 - April 2027'];
  const StepIndicatorStages = ['Reason', 'Documents', 'Finalize'];

  const [leaseTransferStages, setLeaseTransferStages] = useState(1);

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex flex-col max-w-[1128px] md:ml-10 py-10">
          {/* <Header /> */}
          <BreadcrumbHeader
            routes={[
              { name: 'User Profile', url: '/profile-switcher' },
              { name: 'Current Dorm', url: '/current-dorm' },
              { name: 'Pasalo Unit' },
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
            <StepIndicator currentStep={leaseTransferStages} steps={StepIndicatorStages} />
            <div className="w-full px-25 my-15">
              {leaseTransferStages == 1 && (
                <ReasonContent
                  leaseTransferStages={leaseTransferStages}
                  setLeaseTransferStages={setLeaseTransferStages}
                />
              )}
              {leaseTransferStages == 2 && (
                <DocumentsContent
                  leaseTransferStages={leaseTransferStages}
                  setLeaseTransferStages={setLeaseTransferStages}
                />
              )}
              {leaseTransferStages == 3 && (
                <FinalizeContent
                  leaseTransferStages={leaseTransferStages}
                  setLeaseTransferStages={setLeaseTransferStages}
                  DormitoryName={DormitoryName}
                  RoomNumber={RoomNumber}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
