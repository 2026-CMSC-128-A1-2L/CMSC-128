import { type FunctionComponent, useState, useMemo } from "react";
import ProgressBar, {
  type VerificationStep,
} from "../../../../components/user/ProgressBar";
import TutorialBubble from "../../../../components/user/Tutorials";
import TutorialIcon from "../../../../../assets/help-chat.svg";
import UserDocumentsSubmissionHeader from "../../../../components/user/user-verification/UserDocumentsSubmissionHeader";
import UserDocumentsList from "../../../../components/user/user-verification/UserDocumentsList";
import { userDocuments } from "../../../../components/user/user-verification/UserDocumentsData";

interface UserVerifProps {
  verificationStep: number;
  onStepComplete?: () => void; // Added to notify parent to increment step
}

// Map the numeric prop to the string union type required by ProgressBar
const STEP_MAP: Record<number, VerificationStep> = {
  0: "submit",
  1: "reviewing",
  2: "finish",
};

const UserVerif: FunctionComponent<UserVerifProps> = ({
  verificationStep,
  onStepComplete,
}) => {
  const [showHelp, setShowHelp] = useState(false);
  const [uploads, setUploads] = useState<Record<string, File | undefined>>({});

  const uploadedCount = useMemo(
    () => Object.values(uploads).filter(Boolean).length,
    [uploads],
  );

  // at least 1 document must be uploaded to proceed
  const canSubmit = uploadedCount >= 1;

  const currentStepKey = STEP_MAP[verificationStep] || "submit";

  const handleFile = (id: string, file: File) => {
    setUploads((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = () => {
    console.log("Submitting documents:", uploads);

    if (onStepComplete) {
      onStepComplete();
    }
  };

  const handleEdit = (id: string) => {
    console.log("Edit document:", id);
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
        className="fixed bottom-10 right-10 z-1000 cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img
          src={TutorialIcon}
          alt="Help"
          className="w-16 h-16 drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default UserVerif;
