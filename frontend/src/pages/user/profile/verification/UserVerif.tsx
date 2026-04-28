import { type FunctionComponent, useState, useMemo } from 'react';
import ProgressBar from '../../../../components/user/ProgressBar';
import TutorialBubble from '../../../../components/user/Tutorials';
import TutorialIcon from '../../../../../assets/help-chat.svg';
import UserDocumentsSubmissionHeader from '../../../../components/user/user-verification/UserDocumentsSubmissionHeader';
import UserDocumentsList from '../../../../components/user/user-verification/UserDocumentsList';
import { userDocuments } from '../../../../components/user/user-verification/UserDocumentsData';

interface UserVerifProps {
  verificationStep: number;
}

const UserVerif: FunctionComponent<UserVerifProps> = ({ verificationStep }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [uploads, setUploads] = useState<Record<string, File | undefined>>({});

  const uploadedCount = useMemo(() => Object.values(uploads).filter(Boolean).length, [uploads]);

  const canSubmit = uploadedCount === userDocuments.length;

  const handleFile = (id: string, file: File) => {
    setUploads((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = () => {
    // TODO: Implement submit logic
    console.log('Submitting documents:', uploads);
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
        <ProgressBar currentStep={verificationStep} />
      </div>

      <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />

      <UserDocumentsSubmissionHeader
        uploadedCount={uploadedCount}
        totalCount={userDocuments.length}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <UserDocumentsList
        documents={userDocuments}
        uploads={uploads}
        onFileSelected={handleFile}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ======= FLOATING ICON FOR TUTORIAL ======= */}
      <div
        className="fixed bottom-10 right-10 z-[1000] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img src={TutorialIcon} alt="Help" className="w-16 h-16 drop-shadow-lg" />
      </div>
    </div>
  );
};

export default UserVerif;
