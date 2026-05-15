import type React from 'react';
import { useRef } from 'react'; // 1. Added useRef to trigger the hidden file input
import UploadIcon from '../../../assets/upload_media_icon.svg';
import EyeIcon from '../../../assets/iconamoon_eye.svg';
import MoreIcon from '../../../assets/qlementine-icons_menu-dots-16.svg';

interface FileUploadCardProps {
  title: string;
  isRequired?: boolean;
  desc?: string;
  fileName?: string; // 2. Accept the active file name from parent state
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 3. Action prop
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  isRequired = false,
  desc = '.jpg or .png',
  fileName,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Triggers the hidden click behavior when clicking the styled div
  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col w-full border border-[#f0f0f0] rounded-[12px] p-[16px] bg-white shadow-sm mb-[16px] font-inter text-black">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-[16px]">
        {/* Title and Badge */}
        <div className="flex items-center gap-[12px]">
          <h3 className="font-bold text-[15px]">{title}</h3>
          {!isRequired && (
            <span className="bg-[#FFF4E5] text-[#FFA000] px-[12px] py-[4px] rounded-full text-[12px] font-bold">
              Not - Required
            </span>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-[4px] text-gray-600">
          <button className="p-[6px] hover:bg-gray-100 rounded-full transition-colors">
            <img src={EyeIcon} alt="" />
          </button>
          <button className="p-[6px] hover:bg-gray-100 rounded-full transition-colors">
            <img src={MoreIcon} alt="" />
          </button>
        </div>
      </div>

      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/png, image/jpeg"
        className="hidden"
      />

      {/* Upload Dropzone (Now interactive with onClick) */}
      <div 
        onClick={handleDropzoneClick}
        className={`flex items-center gap-[16px] border-2 border-dashed rounded-[12px] p-[20px] transition-colors cursor-pointer group ${
          fileName ? 'border-teal-500 bg-teal-50/20' : 'border-gray-300 hover:bg-gray-50'
        }`}
      >
        <img src={UploadIcon} alt="" />
        <div className="flex flex-col text-left">
          {/* Dynamically swap titles out if a file has been uploaded */}
          <span className="font-bold text-[14px]">
            {fileName ? 'File Selected' : 'Upload the document'}
          </span>
          <span className={`text-[12px] font-medium ${fileName ? 'text-teal-600 font-semibold' : 'text-[#64748b]'}`}>
            {fileName ? fileName : desc}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadCard;