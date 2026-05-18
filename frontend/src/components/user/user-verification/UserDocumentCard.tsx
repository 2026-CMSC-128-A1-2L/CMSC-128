import { Icon } from '@iconify/react';

interface UserDocumentCardProps {
  title: string;
  subtitle?: string; // Made optional to match the clean look
  acceptedHint: string;
  accept: string;
  status: 'missing' | 'uploaded' | 'accepted' | 'rejected'; // Expanded types
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
  // 1. Logic to match the colors of the second component
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'uploaded':
      case 'accepted':
        return {
          label: status.charAt(0).toUpperCase() + status.slice(1),
          gradient: 'from-[#5dc2a8] to-[#0c8873]', // Green gradient
          darkText: 'dark:text-[#5dc2a8]',
        };
      default:
        return {
          label: status.charAt(0).toUpperCase() + status.slice(1),
          gradient: 'from-[#c00f0f] to-[#e44f4f]', // Red gradient
          darkText: 'dark:text-[#e44f4f]',
        };
    }
  };

  const { label, gradient, darkText } = getStatusConfig(status);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div className="self-stretch flex flex-col items-center justify-center py-0 px-8 shrink-0 text-left">
      <div className="w-full rounded-[16px] bg-white border-[#f0f0f0] border-solid border box-border overflow-hidden flex flex-col items-start justify-center py-[10px] px-[32px] gap-2.5 dark:bg-[#101111] dark:border-[#303331]">
        <div className="self-stretch flex items-center justify-between pr-6">
          <div className="flex-1 flex items-center gap-4">
            <b className="font-['Inter'] text-[14px] text-[#2f3136] dark:text-[#edf6f4]">{title}</b>
            {subtitle && <b className="text-dimgray text-[14px] dark:text-[#a4acba]">{subtitle}</b>}

            {/* 2. Updated Status Badge with the new Gradient */}
            <div className="h-8 w-24 rounded-[16px] bg-white flex items-center justify-center px-3 box-border text-center dark:bg-transparent">
              <b
                className={`relative bg-clip-text text-transparent bg-gradient-to-b ${gradient} ${darkText} font-['Inter'] text-[14px] dark:bg-none dark:bg-clip-border dark:[-webkit-text-fill-color:currentColor]`}
              >
                {label}
              </b>
            </div>
          </div>

          <div className="w-[72px] flex items-center gap-6">
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="hover:opacity-70 transition-opacity text-[#2f3136] cursor-pointer dark:text-[#edf6f4]"
              >
                <Icon icon="mdi:pencil" className="w-6 h-6" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="hover:opacity-70 transition-opacity text-[#2f3136] cursor-pointer dark:text-[#edf6f4]"
              >
                <Icon icon="mdi:delete" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        <label className="w-full cursor-pointer">
          <div className="w-full rounded-[16px] border-[#666] border-dashed border box-border overflow-hidden flex items-center py-3 px-4 text-black hover:bg-[#f9fafb] transition-colors dark:border-[#303331] dark:text-[#edf6f4] dark:hover:bg-[#151717]">
            <div className="h-16 flex items-center gap-6">
              {/* 3. Updated Upload Icon to match the grey style of the second code */}
              <Icon icon="icons8:upload-2" className="w-16 h-16 text-[#666] dark:text-[#a7a7a7]" />
              <div className="flex flex-col items-start justify-center gap-2">
                <b className="font-['Inter'] text-[14px]">
                  {fileName ? fileName : 'Upload the document'}
                </b>
                <div className="text-[12px] tracking-wide font-semibold font-lora text-[#64748b] dark:text-[#8d9bb4]">
                  {acceptedHint}
                </div>
              </div>
            </div>
          </div>
          <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default UserDocumentCard;
