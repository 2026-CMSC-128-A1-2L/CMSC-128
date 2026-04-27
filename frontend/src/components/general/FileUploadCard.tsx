import React from 'react';
import UploadIcon from '../../../assets/upload_media_icon.svg';
import EyeIcon from '../../../assets/iconamoon_eye.svg';
import MoreIcon from '../../../assets/qlementine-icons_menu-dots-16.svg';
//USAGE
//<FileUploadCard title="Current Lease Agreement" isRequired={true} desc=".jpg or .png less than 500KB"/>

interface FileUploadCardProps {
  title: string;
  isRequired?: boolean;
  desc?: string;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  isRequired = false,
  desc = '.jpg or .png',
}) => {
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
            {/* <Eye size={20} strokeWidth={2} /> */}
            <img src={EyeIcon} alt="" />
          </button>
          <button className="p-[6px] hover:bg-gray-100 rounded-full transition-colors">
            {/* <MoreVertical size={20} strokeWidth={2} /> */}
            <img src={MoreIcon} alt="" />
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="flex items-center gap-[16px] border-2 border-dashed border-gray-300 rounded-[12px] p-[20px] hover:bg-gray-50 transition-colors cursor-pointer group">
        {/* <CloudUpload 
                size={32} 
                className="text-gray-700 group-hover:text-darkslategray transition-colors" 
                strokeWidth={1.5} 
                /> */}
        <img src={UploadIcon} alt="" />
        <div className="flex flex-col">
          <span className="font-bold text-[14px]">Upload the document</span>
          <span className="text-[#64748b] text-[12px] font-medium">{desc}</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploadCard;
