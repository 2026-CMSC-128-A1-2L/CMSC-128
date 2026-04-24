import { FunctionComponent, useCallback } from 'react';

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
          <img src="" alt="view" className="w-5 h-5 icon-eye" />
        </button>
        <button className="hover:opacity-70 transition-opacity">
          <img src="" alt="more" className="w-5 h-5 icon-dots-vertical" />
        </button>
      </div>
    </div>
    {/* File row */}
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
        <img src="" alt="file" className="w-5 h-5 icon-file" />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-xs text-gray-800">{filename}</span>
        <span className="text-xs text-gray-400 font-medium mt-0.5">Submitted: {date}</span>
      </div>
    </div>
  </div>
);

const steps = [
  { label: 'Requirements', active: true },
  { label: 'Building Information', active: false },
  { label: 'Finalize', active: false },
];

const AddBuilding: FunctionComponent = () => {
  const onCancelClick = useCallback(() => { }, []);
  const onNextClick = useCallback(() => { }, []);

  return (
    <div className="w-screen font-sans">
      <div className="  px-20 pt-4 pb-12">

        {/* Cancel button */}
        <div className="flex items-center gap-1.5 py-4 cursor-pointer w-fit" onClick={onCancelClick}>
          <img src="" alt="back" className="w-4 h-4 icon-chevron-left" />
          <span className="text-sm font-semibold text-gray-700">Cancel</span>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 px-10 pt-8 pb-10">

          {/* Title */}
          <h1 className="text-2xl font-bold" style={{ color: '#1a5c50' }}>Add a New Building</h1>
          <p className="text-sm font-semibold text-gray-500 mt-1">Follow 3 simple steps and you're ready to go!</p>

          {/* Divider */}
          <div className="w-full h-px my-6" />

          {/* Body: stepper + content */}
          <div className="flex gap-40 px-20">

            {/* Stepper — dot column + label beside it */}
            <div className="flex flex-col" style={{ minWidth: '160px' }}>
              {steps.map((step, i) => (
                <div key={i} className="flex">
                  {/* Left: dot + line */}
                  <div className="flex flex-col items-center mr-3">
                    <div
                      className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
                      style={{ background: step.active ? '#1a5c50' : '#d1d5db' }}
                    >
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="w-0.5"
                        style={{
                          flex: 1,
                          minHeight: '150px',
                          background: i === 0
                            ? 'linear-gradient(to bottom, rgba(26,92,80,0.7), #b5c8c5)'
                            : '#d1d5db',
                        }}
                      />
                    )}
                  </div>
                  {/* Right: label */}
                  <div className="flex items-start pt-1.5 pb-4">
                    <span
                      className="text-sm font-semibold whitespace-pre-line leading-5"
                      style={{ color: step.active ? '#1a5c50' : '#9ca3af' }}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content */}
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
                  <img src="" alt="next" className="w-5 h-5 icon-arrow-right" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBuilding;
