import DocumentUploadCard, { type DocumentStatus } from './DocumentUploadCard';
import type { DocumentSlot } from './DocumentsData';

interface DocumentsUploadListProps {
  documents: DocumentSlot[];
  uploads: Record<string, File | undefined>;
  onFileSelected: (id: string, file: File) => void;
}

const DocumentsUploadList = ({ documents, uploads, onFileSelected }: DocumentsUploadListProps) => {
  const getStatus = (id: string): DocumentStatus => (uploads[id] ? 'uploaded' : 'missing');

  return (
    <>
      {documents.map((doc) => (
        <div key={doc.id} className="flex w-full flex-col items-center justify-center px-[32px]">
          <DocumentUploadCard
            title={doc.title}
            acceptedHint={doc.acceptedHint}
            accept={doc.accept}
            status={getStatus(doc.id)}
            fileName={uploads[doc.id]?.name}
            onFileSelected={(file) => onFileSelected(doc.id, file)}
          />
        </div>
      ))}
    </>
  );
};

export default DocumentsUploadList;
