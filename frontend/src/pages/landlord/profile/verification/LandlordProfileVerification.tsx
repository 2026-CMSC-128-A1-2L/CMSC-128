import { useMemo, useState } from 'react';
import VerificationProgress, {
  type VerificationStep,
} from '../../../../components/landlord/VerificationProgress';
import DocumentsSubmissionHeader from '../../../../components/landlord/LandlordVerification/DocumentsSubmissionHeader';
import DocumentsUploadList from '../../../../components/landlord/LandlordVerification/DocumentsUploadList';
import { documents } from '../../../../components/landlord/LandlordVerification/DocumentsData';

const LandlordVerificationView = () => {
  const [uploads, setUploads] = useState<Record<string, File | undefined>>({});

  const step: VerificationStep = 'submit';

  const uploadedCount = useMemo(
    () => Object.values(uploads).filter(Boolean).length,
    [uploads]
  );

  const canSubmit = uploadedCount === documents.length;

  const handleFile = (id: string, file: File) => {
    setUploads((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = () => {
    // TODO: Implement actual API submit logic
    console.log('Submitting documents:', uploads);
  };

  return (
    <div className="flex flex-col gap-[12px]">
      {/* Progress Stepper Section */}
      <div className="flex w-full flex-col items-center px-[32px] py-[12px]">
        <VerificationProgress currentStep={step} />
      </div>

      {/* Submission Control Header */}
      <DocumentsSubmissionHeader
        uploadedCount={uploadedCount}
        totalCount={documents.length}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      {/* Main Upload List */}
      <div className="px-[8px]">
        <DocumentsUploadList 
          documents={documents} 
          uploads={uploads} 
          onFileSelected={handleFile} 
        />
      </div>
    </div>
  );
};

export default LandlordVerificationView;