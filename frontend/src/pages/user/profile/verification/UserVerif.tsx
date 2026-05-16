import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import { isAxiosError } from 'axios';
import ProgressBar, { type VerificationStep } from '../../../../components/user/ProgressBar';
import TutorialBubble from '../../../../components/user/Tutorials';
import TutorialIcon from '../../../../../assets/help-chat.svg';
import UserDocumentsSubmissionHeader from '../../../../components/user/user-verification/UserDocumentsSubmissionHeader';
import UserDocumentsList from '../../../../components/user/user-verification/UserDocumentsList';
import { userDocuments } from '../../../../components/user/user-verification/UserDocumentsData';
import { FileService } from '../../../../service/FileService';
import { UserService } from '../../../../service/UserService';
import { useAuthStore } from '../../../../store/useAuthStore';

interface UserVerifProps {
  verificationStep: number;
  onStepComplete?: () => void; // Added to notify parent to increment step
}

// Map the numeric prop to the string union type required by ProgressBar
const STEP_MAP: Record<number, VerificationStep> = {
  0: 'submit',
  1: 'reviewing',
  2: 'finish',
};

const UserVerif: FunctionComponent<UserVerifProps> = ({ verificationStep, onStepComplete }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [uploads, setUploads] = useState<Record<string, File | undefined>>({});
  const [existingDocuments, setExistingDocuments] = useState<
    {
      docId: string;
      name: string;
      status: 'accepted' | 'rejected' | 'pending';
      message?: string;
      files: string[];
    }[]
  >([]);
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'submitted' | 'rejected' | 'approved'
  >('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fetchMe = useAuthStore((state) => state.fetchMe);

  const uploadedCount = useMemo(
    () =>
      userDocuments.filter(
        (doc) =>
          uploads[doc.id] ||
          existingDocuments.some((item) => item.docId === doc.id && item.files.length > 0),
      ).length,
    [uploads, existingDocuments],
  );

  // at least 1 document must be uploaded to proceed
  const canSubmit =
    Object.values(uploads).filter(Boolean).length >= 1 &&
    !isSubmitting &&
    verificationStatus !== 'approved';

  const currentStepKey =
    verificationStatus === 'approved'
      ? 'finish'
      : verificationStatus === 'submitted'
        ? 'reviewing'
        : STEP_MAP[verificationStep] || 'submit';

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
        const user = response.data;
        setExistingDocuments(user.documents ?? []);
        setVerificationStatus(user.verificationStatus ?? 'pending');
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
  }, []);

  const handleFile = (id: string, file: File) => {
    setUploads((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = async () => {
    const selectedDocuments = userDocuments.filter((doc) => uploads[doc.id]);
    if (selectedDocuments.length === 0) return;

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const documents = await Promise.all(
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

      const response = await UserService.submitVerification({ documents });
      setExistingDocuments(response.data.documents ?? []);
      setVerificationStatus(response.data.verificationStatus ?? 'submitted');
      setUploads({});
      setSuccessMessage('Your verification application has been sent for admin review.');
      await fetchMe();

      if (onStepComplete) {
        onStepComplete();
      }
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

  const handleEdit = (id: string) => {
    console.log('Edit document:', id);
  };

  const handleDelete = (id: string) => {
    setUploads((prev) => {
      const newUploads = { ...prev };
      delete newUploads[id];
      return newUploads;
    });
  };

  return (
    <div
      className="relative self-stretch flex flex-col items-start gap-12 shrink-0"
      data-scroll-to="searchBarContainer"
    >
      <div className="self-stretch flex flex-col items-center justify-center text-darkslategray-200 font-poppins">
        {/* Pass the mapped string status */}
        <ProgressBar currentStep={currentStepKey} />
      </div>

      <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />

      {isLoading && (
        <div className="self-stretch px-num-32 text-left text-sm font-semibold text-slategray">
          Loading verification status...
        </div>
      )}

      {error && (
        <div className="mx-num-32 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mx-num-32 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-left text-sm font-semibold text-emerald-700">
          {successMessage}
        </div>
      )}

      <UserDocumentsSubmissionHeader
        uploadedCount={uploadedCount}
        totalCount={userDocuments.length}
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <UserDocumentsList
        documents={userDocuments}
        uploads={uploads}
        statuses={documentStatuses}
        fileNames={fileNames}
        onFileSelected={handleFile}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ======= FLOATING ICON FOR TUTORIAL ======= */}
      <button
        type="button"
        className="help-button-animated z-1000 cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img src={TutorialIcon} alt="Help" className="w-16 h-16 drop-shadow-lg" />
      </button>
    </div>
  );
};

export default UserVerif;
