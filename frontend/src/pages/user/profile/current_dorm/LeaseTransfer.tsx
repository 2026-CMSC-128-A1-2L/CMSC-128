import { useState } from 'react';
import CurrentDormInfoCard from '../../../../components/CurrentDormInfoCard';
import StepIndicator from '../../../../components/StepIndicator';
import DormitoryImg from '../../../../../assets/image.png';
import SideBar from '../../../../components/user/SideBar';
import BreadcrumbHeader from '../../../../components/general/Breadcrumb';
import ReasonContent from '../../../../components/user/lease-transfer/ReasonContent';
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

  // 1. Lifted State for Step 1: Reason Form
  const [reasonForm, setReasonForm] = useState({
    category: '',
    intendedDate: '',
    explanation: '',
  });

  // 2. Lifted State for Step 2: Financial/Details Form
  const [detailsForm, setDetailsForm] = useState({
    transferFee: '',
    depositHandling: '',
    advanceRentStatus: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<{
    leaseAgreement: File | null;
    requestLetter: File | null;
  }>({
    leaseAgreement: null,
    requestLetter: null,
  });

  return (
    <div className="flex">
      <div className="sticky top-0 left-0 h-screen w-[200px] hidden md:block shrink-0 z-10">
        <SideBar />
      </div>
      <div className="flex flex-col max-w-[1128px] md:ml-10 py-10">
        <BreadcrumbHeader
          routes={[
            { name: 'User Profile', url: '/profile-switcher' },
            { name: 'Current Dorm', url: '/profile-switcher' },
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
            {/* Step 1: Reason Content */}
            {leaseTransferStages === 1 && (
              <ReasonContent
                leaseTransferStages={leaseTransferStages}
                setLeaseTransferStages={setLeaseTransferStages}
                reasonForm={reasonForm}          // Passed down
                setReasonForm={setReasonForm}    // Updated handler state hook
              />
            )}

            {/* Step 2: Documents / Details Content */}
            {leaseTransferStages === 2 && (
              <DocumentsContent
                leaseTransferStages={leaseTransferStages}
                setLeaseTransferStages={setLeaseTransferStages}
                detailsForm={detailsForm}        // Passed down
                setDetailsForm={setDetailsForm}  // Updated handler state hook
                uploadedFiles={uploadedFiles}       // Pass file state down
                setUploadedFiles={setUploadedFiles} // Pass file handler down
              />
            )}

            {/* Step 3: Review and Finalize */}
            {leaseTransferStages === 3 && (
              <FinalizeContent
                leaseTransferStages={leaseTransferStages}
                setLeaseTransferStages={setLeaseTransferStages}
                DormitoryName={DormitoryName}
                RoomNumber={RoomNumber}
                formData={reasonForm}            // Review payload 1
                financialsDocsData={detailsForm} // Review payload 2
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}