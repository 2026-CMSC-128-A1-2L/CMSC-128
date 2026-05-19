import { useEffect, useMemo, useState } from 'react';
import { isAxiosError } from 'axios';
import VerificationProgress, {
  type VerificationStep,
} from '../../../../components/landlord/VerificationProgress';
import DocumentsSubmissionHeader from '../../../../components/landlord/LandlordVerification/DocumentsSubmissionHeader';
import DocumentsUploadList from '../../../../components/landlord/LandlordVerification/DocumentsUploadList';
import { documents } from '../../../../components/landlord/LandlordVerification/DocumentsData';
import { FileService } from '../../../../service/FileService';
import { UserService } from '../../../../service/UserService';
import { useAuthStore } from '../../../../store/useAuthStore';

type VerificationStatus = 'pending' | 'submitted' | 'rejected' | 'approved';

type ExistingDocument = {
  docId: string;
  name: string;
  status: 'accepted' | 'rejected' | 'pending';
  message?: string;
  files: string[];
};

export type LandlordVerificationUser = {
  verificationStatus?: VerificationStatus;
  documents?: ExistingDocument[];
};

type LandlordProfileVerificationProps = {
  onVerificationUpdated?: (user: LandlordVerificationUser) => void;
};

const LandlordProfileVerification = ({
  onVerificationUpdated,
}: LandlordProfileVerificationProps) => {
  const [uploads, setUploads] = useState<Record<string, File | undefined>>({});
  const [existingDocuments, setExistingDocuments] = useState<ExistingDocument[]>([]);
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  const uploadedCount = useMemo(
    () =>
      documents.filter(
        (doc) =>
          uploads[doc.id] ||
          existingDocuments.some((item) => item.docId === doc.id && item.files.length > 0),
      ).length,
    [uploads, existingDocuments],
  );

  const canSubmit =
    Object.values(uploads).filter(Boolean).length >= 1 &&
    !isSubmitting &&
    verificationStatus !== 'approved';

  const currentStepKey: VerificationStep =
    verificationStatus === 'approved'
      ? 'finish'
      : verificationStatus === 'submitted'
        ? 'reviewing'
        : 'submit';

  const documentStatuses = useMemo(
    () =>
      existingDocuments.reduce<Record<string, 'missing' | 'uploaded' | 'accepted' | 'rejected'>>(
        (acc, doc) => {
          if (doc.status === 'accepted' || doc.status === 'rejected') {
            acc[doc.docId] = doc.status;
          } else if (doc.files.length > 0) {
            acc[doc.docId] = 'uploaded';
          }
          return acc;
        },
        {},
      ),
    [existingDocuments],
  );

  const fileNames = useMemo(
    () =>
      existingDocuments.reduce<Record<string, string>>((acc, doc) => {
        if (doc.files.length > 0) {
          acc[doc.docId] =
            doc.files.length === 1 ? doc.files[0] : `${doc.files.length} submitted files`;
        }
        return acc;
      }, {}),
    [existingDocuments],
  );

  useEffect(() => {
    let cancelled = false;

    const loadVerification = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await UserService.getSelf();
        if (cancelled) return;

        const user = response.data as LandlordVerificationUser;
        setExistingDocuments(user.documents ?? []);
        setVerificationStatus(user.verificationStatus ?? 'pending');
        onVerificationUpdated?.(user);
      } catch (err) {
        if (!cancelled) {
          setError(
            isAxiosError(err) && err.response?.data?.error?.message
              ? err.response.data.error.message
              : 'Could not load your verification status.',
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadVerification();

    return () => {
      cancelled = true;
    };
  }, [onVerificationUpdated]);

  const handleFile = (id: string, file: File) => {
    setUploads((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = async () => {
    const selectedDocuments = documents.filter((doc) => uploads[doc.id]);
    if (selectedDocuments.length === 0) return;

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const verificationDocuments = await Promise.all(
        selectedDocuments.map(async (doc) => {
          const file = uploads[doc.id];
          if (!file) throw new Error(`Missing file for ${doc.title}`);
          const uploadedFile = await FileService.uploadFile(file);
          return {
            docId: doc.id,
            name: doc.title,
            fileIds: [uploadedFile.key],
          };
        }),
      );

      const response = await UserService.submitVerification({
        documents: verificationDocuments,
      });
      const user = response.data as LandlordVerificationUser;

      setExistingDocuments(user.documents ?? []);
      setVerificationStatus(user.verificationStatus ?? 'submitted');
      setUploads({});
      setSuccessMessage('Your verification application has been sent for admin review.');
      onVerificationUpdated?.(user);
      await fetchMe();
    } catch (err) {
      setError(
        isAxiosError(err) && err.response?.data?.error?.message
          ? err.response.data.error.message
          : 'Could not submit your verification application.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-[44px] px-[32px] pb-[32px]">
      <div className="flex w-full flex-col items-center justify-center pt-[32px] text-darkslategray-200 font-poppins">
        <VerificationProgress currentStep={currentStepKey} />
      </div>

      {isLoading && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:border-[#303331] dark:bg-[#1f2022] dark:text-[#a4acba]">
          Loading verification status...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-left text-sm font-semibold text-emerald-700 dark:border-[#1f5145] dark:bg-[#10201d] dark:text-[#5dc2a8]">
          {successMessage}
        </div>
      )}

      <DocumentsSubmissionHeader
        uploadedCount={uploadedCount}
        totalCount={documents.length}
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        statefulVerificationStep={currentStepKey}
        onSubmit={handleSubmit}
      />

      <div className="flex w-full flex-col gap-[16px]">
        <DocumentsUploadList
          documents={documents}
          uploads={uploads}
          statuses={documentStatuses}
          fileNames={fileNames}
          onFileSelected={handleFile}
        />
      </div>
    </div>
  );
};

export default LandlordProfileVerification;
