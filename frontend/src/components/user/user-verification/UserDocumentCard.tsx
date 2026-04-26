import { Icon } from '@iconify/react';

interface UserDocumentCardProps {
  title: string;
  subtitle: string;
  acceptedHint: string;
  accept: string;
  status: 'missing' | 'uploaded';
  fileName?: string;
  onFileSelected: (file: File) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const UserDocumentCard = ({
  title,
  subtitle,
  acceptedHint,
  accept,
  status,
  fileName,
  onFileSelected,
  onEdit,
  onDelete,
}: UserDocumentCardProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 shrink-0 text-left">
      <div className="w-full rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
        <div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-6 gap-0">
          <div className="flex-1 flex items-center gap-4">
            <b className="relative">{title}</b>
            <b className="relative text-dimgray">{subtitle}</b>
            <div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border text-center">
              <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                {status === 'uploaded' ? 'Uploaded' : 'Missing'}
              </b>
            </div>
          </div>
          <div className="w-[72px] flex items-center gap-6">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="hover:opacity-70 transition-opacity"
              >
                <Icon icon="mdi:pencil" className="w-6 h-6" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="hover:opacity-70 transition-opacity"
              >
                <Icon icon="mdi:delete" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
        <label className="w-full cursor-pointer">
          <div className="w-full rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden flex items-center py-num-12 px-4 text-black hover:bg-whitesmoke-100 transition-colors">
            <div className="h-16 flex items-center gap-6">
              <Icon icon="mdi:cloud-upload" className="w-16 h-16" />
              <div className="flex flex-col items-start justify-center gap-2">
                <b className="relative">
                  {fileName ? `${fileName}` : 'Upload the document'}
                </b>
                <div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">
                  {acceptedHint}
                </div>
              </div>
            </div>
          </div>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default UserDocumentCard;
