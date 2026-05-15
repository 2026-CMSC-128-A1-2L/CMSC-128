import type React from 'react';
import { type FunctionComponent, useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useBuildingStore } from './useBuildingStore';
import type { RequirementItem } from './useBuildingStore';
import { FileService } from '../../../service/FileService';

// ─── Document Card ────────────────────────────────────────────────────────────

interface DocumentCardProps extends RequirementItem {
  onUpload: (file: File) => Promise<void>;
  onRemove: () => void;
}

const DocumentCard: FunctionComponent<DocumentCardProps> = ({
  label,
  file,
  date,
  onUpload,
  onRemove,
}) => {
  const isUploaded = !!file;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await onUpload(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  };

  const handleRemove = () => {
    onRemove();
    setIsMenuOpen(false);
  };

  const handleViewExample = () => {
    alert(`Showing example file for ${label}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full rounded-2xl bg-white/75 dark:bg-[#1f2022] px-8 py-4 flex flex-col gap-5 shadow-sm">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-black dark:text-white text-sm">{label}</span>
          <span
            className={`text-xs font-semibold rounded-2xl px-3 py-1 ${
              isUploaded ? 'text-slate-500 bg-slate-100 dark:bg-[#303331] dark:text-[#a4acba]' : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            {isUploaded ? 'Uploaded' : 'Missing'}
          </span>
        </div>

        {isUploaded && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="hover:opacity-70 transition-opacity"
              title="View File"
            >
              <Icon icon="iconamoon:eye" className="w-5 h-5 text-[#096C5B] dark:text-[#72cbb8]" />
            </button>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="hover:opacity-70 transition-opacity flex items-center"
              >
                <Icon icon="qlementine-icons:menu-dots-16" className="w-5 h-5 text-[#096C5B] dark:text-[#72cbb8]" />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#141515] rounded-lg shadow-lg border border-gray-100 dark:border-[#303331] z-10 overflow-hidden flex flex-col text-sm">
                  <button
                    onClick={handleViewExample}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-[#1f2022] text-gray-700 dark:text-[#a4acba] transition-colors"
                  >
                    View Example File
                  </button>
                  <button
                    onClick={handleDownload}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-[#1f2022] text-gray-700 dark:text-[#a4acba] transition-colors border-t border-gray-100 dark:border-[#303331]"
                  >
                    Download File
                  </button>
                  <button
                    onClick={handleRemove}
                    className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors border-t border-gray-100 dark:border-[#303331] font-medium"
                  >
                    Remove File
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* File / Upload row */}
      <div className="flex items-center gap-3">
        {isUploaded ? (
          <>
            <div className="w-11 h-11 rounded-lg border border-gray-200 dark:border-[#303331] bg-gray-50 dark:bg-[#141515] flex items-center justify-center shrink-0">
              <Icon icon="material-symbols:image-outline" className="w-8 h-8 text-gray-500 dark:text-[#a4acba]" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs text-gray-800 dark:text-[#d7e0ef] truncate max-w-[200px]">
                {file.name}
              </span>
              <span className="text-xs text-gray-400 dark:text-[#6b7280] font-medium mt-0.5">Submitted: {date}</span>
            </div>
          </>
        ) : (
          <label className="flex items-center gap-2 cursor-pointer bg-teal-50 hover:bg-teal-100 dark:bg-[#12342e] dark:hover:bg-[#1f3a34] transition-colors text-[#096C5B] dark:text-[#72cbb8] px-4 py-2 rounded-lg w-full justify-center">
            <Icon icon="material-symbols:upload-rounded" className="w-5 h-5" />
            <span className="text-sm font-semibold">Upload File</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
            />
          </label>
        )}
      </div>

      {isLightboxOpen && file && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={[{ src: URL.createObjectURL(file) }]}
        />
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface BuildingRequirementsProps {
  onNextClick: () => void;
}

const BuildingRequirements: FunctionComponent<BuildingRequirementsProps> = ({ onNextClick }) => {
  const { buildingInfo, updateRequirement } = useBuildingStore();
  const documents = buildingInfo.requirements;

  const handleFileUpload = async (id: string, uploadedFile: File) => {
    try {
      await FileService.uploadFile(uploadedFile);

      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date());

      updateRequirement(id, uploadedFile, formattedDate);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleFileRemove = (id: string) => {
    updateRequirement(id, null, null);
  };

  return (
    <div className="flex-1 flex flex-col gap-3">
      <h2 className="text-sm font-bold text-black dark:text-white mb-1">Building Requirements</h2>

      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          {...doc}
          onUpload={(file) => handleFileUpload(doc.id, file)}
          onRemove={() => handleFileRemove(doc.id)}
        />
      ))}

      <div className="flex justify-center mt-5">
        <button
          onClick={onNextClick}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90"
          style={{ background: '#1a5c50' }}
        >
          Next
          <Icon icon="material-symbols-light:owl-rounded" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default BuildingRequirements;
