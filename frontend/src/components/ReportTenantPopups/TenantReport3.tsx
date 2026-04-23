import { FunctionComponent, useState } from 'react';

interface MaintenanceViolation {
  id: string;
  label: string;
  description: string;
}

interface StepProps {
    onNext: () => void;
    onCancel: () => void;
}

const MAINTENANCE_VIOLATIONS: MaintenanceViolation[] = [
  { id: 'damage', label: 'Property Damage', description: 'Significant damage to property, due to negligence or intent.' },
  { id: 'alteration', label: 'Unauthorized Alteration', description: 'Unauthorized changes made to the property.' },
  { id: 'upkeep', label: 'Failure of Upkeep', description: 'Sanitation Issues, Excessive hoarding, incorrect trash disposal.' },
];

const ReportTenant3: FunctionComponent<StepProps> = ({ onNext , onCancel}) => {
  const [selectedViolations, setSelectedViolations] = useState<string[]>([]);

  const isNothingSelected = selectedViolations.length === 0;

  const toggleViolation = (id: string) => {
    setSelectedViolations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedViolations.length === MAINTENANCE_VIOLATIONS.length) {
      setSelectedViolations([]);
    } else {
      setSelectedViolations(MAINTENANCE_VIOLATIONS.map((v) => v.id));
    }
  };

  const handleCancel = () => {
    console.log("Reporting cancelled");
    setSelectedViolations([]);
    onCancel(); 
  };

  const handleNext = () => {
    if (isNothingSelected) return;
    onNext();
    console.log("Proceeding with violations:", selectedViolations);
  };

  const isAllSelected = selectedViolations.length === MAINTENANCE_VIOLATIONS.length;

  return (
    // Scaled text from 32px to 22px
    <div className="relative rounded-tl-[24px] bg-white w-full flex items-center text-left text-[22px] text-white font-poppins shadow-xl">
      {/* Container width reduced to 428px */}
      <div className="w-[428px] flex flex-col items-center justify-center pt-0 px-0 pb-6 box-border gap-[30px]">
        <div className="self-stretch flex flex-col items-center">
          <div className="self-stretch rounded-tl-[24px] [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-8 pl-10 pr-6">
            <div className="w-full flex flex-col items-start justify-center pt-4 px-0 pb-1 box-border shrink-0">
              <b className="self-stretch relative">Report Tenant</b>
              <b className="self-stretch relative text-[13px] tracking-[-0.01em] font-inter text-aliceblue">Report your tenant</b>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start pt-6 px-8 pb-4 gap-8 text-[12px] text-dimgray font-inter">
            <div className="self-stretch flex flex-col items-start gap-2">
              <b className="self-stretch relative text-[11px]">Email Address</b>
              <div className="self-stretch h-9 rounded-lg border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start justify-center py-1 px-3 text-slategray">
                <div className="relative leading-5 font-medium">ncunanan@gmail.com</div>
              </div>
              <div className="self-stretch flex items-center justify-center py-0 px-1 text-[13px] text-black">
                <b className="flex-1 relative tracking-[-0.01em]">You are reporting Nathaniel Cunanan. Please select all that apply:</b>
              </div>
            </div>

            <div className="self-stretch flex flex-col items-start gap-2">
              <div className="self-stretch flex items-end py-0 pl-0 pr-4">
                <b className="self-stretch flex-1 relative flex items-center text-[12px]">{`Property Maintenance & Damage`}</b>
                <button 
                  onClick={handleSelectAll}
                  className="flex items-center gap-[8px] text-[10px] text-slategray border-none bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <div className="relative font-medium">{isAllSelected ? 'Deselect All' : 'Select All'}</div>
                  <div className="h-4 w-4 relative">
                    <div className={`absolute h-full w-full rounded-sm transition-colors ${
                      isAllSelected ? 'bg-teal' : 'bg-whitesmoke-100 border border-gray-200'
                    }`} />
                    {isAllSelected && <CheckMark />}
                  </div>
                </button>
              </div>

              <div className="self-stretch flex flex-col items-start text-black">
                <div className="self-stretch flex flex-col items-start gap-[14px]">
                  {MAINTENANCE_VIOLATIONS.map((violation) => {
                    const isChecked = selectedViolations.includes(violation.id);
                    return (
                      <label 
                        key={violation.id} 
                        className="self-stretch rounded-lg flex items-center py-2 pl-4 pr-4 gap-3 cursor-pointer hover:bg-zinc-50 transition-colors border border-transparent hover:border-gray-100"
                      >
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={isChecked}
                          onChange={() => toggleViolation(violation.id)}
                        />
                        <div className="flex-1 flex items-center">
                          <div className="flex flex-col items-start justify-center gap-0.5">
                            <b className="relative text-[12px]">{violation.label}</b>
                            <div className="relative text-[10px] font-medium text-dimgray">{violation.description}</div>
                          </div>
                        </div>
                        <div className="h-5 w-5 relative overflow-hidden shrink-0">
                          <div className={`absolute h-full w-full rounded-sm transition-colors ${
                            isChecked ? 'bg-teal' : 'bg-whitesmoke-100 border border-gray-200'
                          }`} />
                          {isChecked && <CheckMark />}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[12px] text-crimson font-inter">
          <button 
            onClick={handleCancel}
            className="rounded-lg flex items-center justify-center py-1.5 px-5 cursor-pointer bg-transparent border-none text-crimson hover:bg-red-50 active:scale-95 transition-all"
          >
            <div className="relative font-semibold inline-block">Cancel</div>
          </button>
          
          <button 
            onClick={handleNext}
            disabled={isNothingSelected} 
            className={`rounded-lg overflow-hidden flex items-center justify-center py-1.5 px-5 border-none transition-all duration-300 ${
              isNothingSelected 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-70' 
                : 'bg-lightcyan text-teal cursor-pointer hover:bg-opacity-80 active:scale-95' 
            }`}
          >
            <div className="relative font-semibold inline-block">Next</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckMark = () => (
  <svg 
    className="absolute h-[70%] w-[70%] top-[15%] left-[15%]" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="4" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ReportTenant3;