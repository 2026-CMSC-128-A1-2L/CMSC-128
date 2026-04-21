import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import LandlordLayout from '../../../components/landlord/LandlordLayout';
import LandlordInfoCard, {
  type LandlordInfo,
} from '../../../components/landlord/LandlordInfoCard';
import VerificationProgress, {
  type VerificationStep,
} from '../../../components/landlord/VerificationProgress';
import DocumentUploadCard, {
  type DocumentStatus,
} from '../../../components/landlord/DocumentUploadCard';

const landlord: LandlordInfo = {
  displayName: 'Quevin Custodio',
  email: 'qacustodio@up.edu.ph',
  fullName: 'Quevin James A. Custodio',
  role: 'Landlord',
  employees: ['Nathaniel Cunanan', 'Lance De Jesus'],
  verified: false,
};

type DocumentSlot = {
  id: 'valid-id' | 'business-permit';
  title: string;
  acceptedHint: string;
  accept: string;
};

const documents: DocumentSlot[] = [
  {
    id: 'valid-id',
    title: 'Valid ID',
    acceptedHint: '.jpg or .png less than 500KB',
    accept: 'image/png,image/jpeg',
  },
  {
    id: 'business-permit',
    title: 'Business Permit',
    acceptedHint: '.pdf less than 500KB',
    accept: 'application/pdf',
  },
];

const LandlordProfileVerification = () => {
  const [uploads, setUploads] = useState<Record<string, File | undefined>>({});

  const step: VerificationStep = 'submit';

  const uploadedCount = useMemo(
    () => Object.values(uploads).filter(Boolean).length,
    [uploads],
  );

  const canSubmit = uploadedCount === documents.length;

  const handleFile = (id: string, file: File) => {
    setUploads((prev) => ({ ...prev, [id]: file }));
  };

  const getStatus = (id: string): DocumentStatus =>
    uploads[id] ? 'uploaded' : 'missing';

  return (
    <LandlordLayout
      breadcrumbs={[
        { label: 'User Profile', to: '/landlord/profile' },
        { label: 'Verification Status' },
      ]}
    >
      <div className="flex w-full flex-col gap-[12px] rounded-[16px] bg-white/70 pb-[32px]">
        <LandlordInfoCard info={landlord} />

        <div className="flex w-full flex-col items-center px-[32px] py-[12px]">
          <VerificationProgress currentStep={step} />
        </div>

        <div className="flex w-full items-center gap-[24px] px-[32px]">
          <div className="flex flex-1 items-center">
            <div className="flex items-center gap-[8px]">
              <Icon
                icon="material-symbols:info-outline"
                className="h-[24px] w-[24px] text-[#2f3136]"
                aria-hidden="true"
              />
              <h2 className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] whitespace-nowrap text-[#2f3136]">
                Submit Documents
              </h2>
              <span className="font-['Inter',sans-serif] text-[14px] font-bold whitespace-nowrap text-[#666]">
                {uploadedCount} out of {documents.length} Documents Uploaded
              </span>
            </div>
          </div>
          <button
            type="button"
            disabled={!canSubmit}
            className={[
              'flex h-[32px] w-[96px] items-center justify-center rounded-[16px] px-[12px]',
              'font-["Inter",sans-serif] text-[14px] font-bold transition-colors duration-200',
              canSubmit
                ? 'cursor-pointer bg-[#096c5b] text-white hover:bg-[#075a4c]'
                : 'cursor-not-allowed bg-[#f1f5f9] text-[#64748b]',
            ].join(' ')}
          >
            Submit
          </button>
        </div>

        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex w-full flex-col items-center justify-center px-[32px]"
          >
            <DocumentUploadCard
              title={doc.title}
              acceptedHint={doc.acceptedHint}
              accept={doc.accept}
              status={getStatus(doc.id)}
              fileName={uploads[doc.id]?.name}
              onFileSelected={(file) => handleFile(doc.id, file)}
            />
          </div>
        ))}
      </div>
    </LandlordLayout>
  );
};

export default LandlordProfileVerification;
