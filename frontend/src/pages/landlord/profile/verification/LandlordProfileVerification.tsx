import { useMemo, useState } from 'react';
import VerificationProgress, {
  type VerificationStep,
} from '../../../../components/landlord/VerificationProgress';
import DocumentsSubmissionHeader from '../../../../components/landlord/LandlordVerification/DocumentsSubmissionHeader';
import DocumentsUploadList from '../../../../components/landlord/LandlordVerification/DocumentsUploadList';
import { documents } from '../../../../components/landlord/LandlordVerification/DocumentsData';
import { useNavigate } from 'react-router-dom';
import LandlordProfileSwitch from '../component/LandlordProfileSwitch';
const LandlordProfileVerification = () => {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState<Record<string, File | undefined>>({});
  const [error] = useState<string | null>('Could not load your verification status.');
  const [step, setStep] = useState<VerificationStep>('submit'); // ← now stateful

  const uploadedCount = useMemo(() => Object.values(uploads).filter(Boolean).length, [uploads]);
  const canSubmit = uploadedCount === documents.length;

  const handleFile = (id: string, file: File) => {
    setUploads((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = () => {
    console.log('Submitting documents:', uploads);
    setStep('reviewing'); // ← advance step on submit
  };

  return (
    <div className="flex w-full flex-col items-start gap-[44px] px-[32px] pb-[32px]">
      <div className="flex w-full flex-col items-center justify-center pt-[32px] text-darkslategray-200 font-poppins">
        <VerificationProgress currentStep={step} />
      </div>

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {error}
        </div>
      )}

      <DocumentsSubmissionHeader
        uploadedCount={uploadedCount}
        totalCount={documents.length}
        canSubmit={canSubmit}
        statefulVerificationStep={step} // ← now passed down
        onSubmit={handleSubmit}
      />

      <div className="flex w-full flex-col gap-[16px]">
        <DocumentsUploadList documents={documents} uploads={uploads} onFileSelected={handleFile} />
      </div>
    </div>
  );
};

export default LandlordProfileVerification;
