import UserDocumentCard from './UserDocumentCard';
import type { UserDocumentSlot } from './UserDocumentsData';

interface UserDocumentsListProps {
  documents: UserDocumentSlot[];
  uploads: Record<string, File | undefined>;
  onFileSelected: (id: string, file: File) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const UserDocumentsList = ({
  documents,
  uploads,
  onFileSelected,
  onEdit,
  onDelete,
}: UserDocumentsListProps) => {
  const getStatus = (id: string): 'uploaded' | 'missing' => (uploads[id] ? 'uploaded' : 'missing');

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
          fileName={uploads[doc.id]?.name}
          onFileSelected={(file) => onFileSelected(doc.id, file)}
          onEdit={() => onEdit?.(doc.id)}
          onDelete={() => onDelete?.(doc.id)}
        />
      ))}
    </>
  );
};

export default UserDocumentsList;
