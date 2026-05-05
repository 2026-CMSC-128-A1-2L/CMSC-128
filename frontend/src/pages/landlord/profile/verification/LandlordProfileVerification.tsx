import { useMemo, useState } from 'react';
import LandlordLayout from '../../../../components/landlord/LandlordLayout';
import LandlordInfoCard, {
  type LandlordInfo,
} from '../../../../components/landlord/LandlordInfoCard';
import VerificationProgress, {
  type VerificationStep,
} from '../../../../components/landlord/VerificationProgress';
import DocumentsSubmissionHeader from '../../../../components/landlord/LandlordVerification/DocumentsSubmissionHeader';
import DocumentsUploadList from '../../../../components/landlord/LandlordVerification/DocumentsUploadList';
import { documents } from '../../../../components/landlord/LandlordVerification/DocumentsData';
import { useNavigate } from 'react-router-dom';
import LandlordProfileSwitch from '../component/LandlordProfileSwitch';

const landlord: LandlordInfo = {
  displayName: 'Quevin Custodio',
  email: 'qacustodio@up.edu.ph',
  fullName: 'Quevin James A. Custodio',
  role: 'Landlord',
  employees: ['Nathaniel Cunanan', 'Lance De Jesus'],
  verified: false,
};

const LandlordProfileVerification = () => {
  const navigate=useNavigate()
  const [uploads, setUploads] = useState<Record<string, File | undefined>>({});

  const step: VerificationStep = 'submit';

  const uploadedCount = useMemo(() => Object.values(uploads).filter(Boolean).length, [uploads]);

  const canSubmit = uploadedCount === documents.length;

  const handleFile = (id: string, file: File) => {
    setUploads((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = () => {
    // TODO: Implement submit logic
    console.log('Submitting documents:', uploads);
  };

  return (
    <LandlordLayout
      breadcrumbs={[
        { label: 'User Profile', to: '/landlord/profile' },
        { label: 'Verification Status' },
      ]}
    >
      <div className="flex w-full flex-col gap-[12px] rounded-[16px] bg-white/70 p-[8px] pb-[32px]">
        <LandlordInfoCard info={landlord} />
        <LandlordProfileSwitch
  activeTab="verification"
  setActiveTab={(tab) => {
    if (tab === 'info') {
      navigate('/landlord/profile');
    }
  }}
/>

        <div className="flex w-full flex-col items-center px-[32px] py-[12px]">
          <VerificationProgress currentStep={step} />
        </div>

        <DocumentsSubmissionHeader
          uploadedCount={uploadedCount}
          totalCount={documents.length}
          canSubmit={canSubmit}
          onSubmit={handleSubmit}
        />

        <DocumentsUploadList documents={documents} uploads={uploads} onFileSelected={handleFile} />
      </div>
    </LandlordLayout>
  );
};

export default LandlordProfileVerification;
