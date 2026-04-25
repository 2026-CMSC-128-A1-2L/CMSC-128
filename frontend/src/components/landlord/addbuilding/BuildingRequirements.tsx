import { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

interface DocumentItem {
  label: string;
  filename: string;
  date: string;
}

const documents: DocumentItem[] = [
  { label: 'Valid ID', filename: 'Valid_ID.png', date: '02 April 2026' },
  { label: 'Business Permit', filename: 'Business_Name_Permit.pdf', date: '02 April 2026' },
  { label: 'DTI Business Name Registration', filename: 'Business_Name_Permit.pdf', date: '02 April 2026' },
  { label: 'BIR Certificate of Registration', filename: 'Registration_Cert.pdf', date: '02 April 2026' },
  { label: 'Tenancy Contract Template', filename: 'tenancy_contract.pdf', date: '02 April 2026' },
];

const DocumentCard: FunctionComponent<DocumentItem> = ({ label, filename, date }) => (
  <div className="w-full rounded-2xl border border-gray-200 bg-white px-8 py-2 pb-7 flex flex-col gap-7">
    {/* Header row */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="font-bold text-gray-800 text-sm">{label}</span>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-2xl px-3 py-1">Uploaded</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="hover:opacity-70 transition-opacity">
          <Icon icon="iconamoon:eye" className='w-5 h-5' color='096C5B' />

        </button>
        <button className="hover:opacity-70 transition-opacity">
          <Icon icon="qlementine-icons:menu-dots-16" className='w-5 h-5' color='096C5B' />
        </button>
      </div>
    </div>
    {/* File row */}
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
        <Icon icon="material-symbols:image-outline" className='w-8 h-8' />

      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-xs text-gray-800">{filename}</span>
        <span className="text-xs text-gray-400 font-medium mt-0.5">Submitted: {date}</span>
      </div>
    </div>
  </div>
);

interface BuildingRequirementsProps {
  onNextClick: () => void;
}

const BuildingRequirements: FunctionComponent<BuildingRequirementsProps> = ({ onNextClick }) => {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <h2 className="text-sm font-bold text-gray-500 mb-1">Building Requirements</h2>

      {documents.map((doc, i) => (
        <DocumentCard key={i} {...doc} />
      ))}

      {/* Next button */}
      <div className="flex justify-center mt-5">
        <button
          onClick={onNextClick}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90"
          style={{ background: '#1a5c50' }}
        >
          Next
          <Icon icon="material-symbols-light:owl-rounded" className='w-7 h-7' />
        </button>
      </div>
    </div>
  );
};

export default BuildingRequirements;
