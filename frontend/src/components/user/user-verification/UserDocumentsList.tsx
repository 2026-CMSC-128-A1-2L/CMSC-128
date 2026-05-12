import UserDocumentCard from './UserDocumentCard';
import type { UserDocumentSlot } from './UserDocumentsData';

interface UserDocumentsListProps {
  documents: UserDocumentSlot[];
  uploads: Record<string, File | undefined>;
  statuses?: Record<string, 'missing' | 'uploaded' | 'accepted' | 'rejected'>;
  fileNames?: Record<string, string>;
  onFileSelected: (id: string, file: File) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const UserDocumentsList = ({
  documents,
  uploads,
  statuses = {},
  fileNames = {},
  onFileSelected,
  onEdit,
  onDelete,
}: UserDocumentsListProps) => {
  const getStatus = (id: string): 'uploaded' | 'missing' | 'accepted' | 'rejected' =>
    uploads[id] ? 'uploaded' : (statuses[id] ?? 'missing');

  return (
    <>
      {documents.map((doc) => (
        <UserDocumentCard
          key={doc.id}
          title={doc.title}
          subtitle={doc.subtitle}
          acceptedHint={doc.acceptedHint}
          accept={doc.accept}
          status={getStatus(doc.id)}
          fileName={uploads[doc.id]?.name ?? fileNames[doc.id]}
          onFileSelected={(file) => onFileSelected(doc.id, file)}
          onEdit={() => onEdit?.(doc.id)}
          onDelete={() => onDelete?.(doc.id)}
        />
      ))}
    </>
  );
};

export default UserDocumentsList;
