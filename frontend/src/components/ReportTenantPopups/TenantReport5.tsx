import { FunctionComponent, useState } from 'react';

interface StepProps {
    onNext: () => void;
    onCancel: () => void;
}

const ReportTenant5: FunctionComponent<StepProps> = ({ onNext , onCancel}) => {
  const [isDeclared, setIsDeclared] = useState(false);

  const handleToggleDeclaration = () => {
    setIsDeclared((prev) => !prev);
  };

  const handleCancel = () => {
    console.log("Submission cancelled");
    setIsDeclared(false);
    onCancel();
  };

  const handleSubmit = () => {
    if (!isDeclared) return;
    onNext(); 
    console.log("Report submitted successfully.");
  };

  return (
    // Scaled text and rounded corners
    <div className="relative rounded-tl-[24px] rounded-tr-none rounded-b-none bg-white w-full flex items-center text-left font-poppins shadow-xl">
      {/* Width constrained to 428px (approx 70% of 612px) */}
      <div className="w-[428px] flex flex-col items-center justify-center pt-0 px-0 pb-6 box-border gap-[30px]">
        <div className="self-stretch flex flex-col items-center">
          <div className="self-stretch rounded-tl-[24px] rounded-tr-none rounded-b-none [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-8 pl-10 pr-6">
            <div className="w-full flex flex-col items-start justify-center pt-4 px-0 pb-1 box-border shrink-0">
              <b className="self-stretch relative text-[22px] text-white">Report Tenant</b>
              <b className="self-stretch relative text-[13px] tracking-[-0.01em] font-inter text-aliceblue font-bold">
                Report your tenant
              </b>
            </div>
          </div>
          
          <div className="self-stretch flex flex-col items-start pt-6 px-8 pb-4 text-[12px] text-black font-inter">
            <div 
              className="self-stretch flex items-start justify-center py-0 px-1 gap-2 cursor-pointer select-none"
              onClick={handleToggleDeclaration}
            >
              <div className="flex items-start py-1 px-0">
                <div className="h-[14px] w-[14px] relative overflow-hidden shrink-0">
                  <div className={`absolute h-full w-full top-0 right-0 bottom-0 left-0 shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-sm transition-colors ${
                    isDeclared ? 'bg-teal' : 'bg-whitesmoke-100 border border-whitesmoke-200'
                  }`} />
                  {isDeclared && (
                    <svg 
                      className="absolute h-[80%] w-[80%] top-[10%] left-[10%]" 
                      viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex-1 relative leading-[18px] text-left text-[11px]">
                <span className="font-medium text-black">{`I declare that all information and reports submitted are `}</span>
                <span className="text-teal font-bold">truthful</span>
                <span className="font-medium text-black">{`, `}</span>
                <span className="text-teal font-bold">complete</span>
                <span className="font-medium text-black">{`, and `}</span>
                <span className="text-teal font-bold">based on verified facts</span>
                <span className="font-medium text-black">
                  {" "}to the best of my knowledge. I acknowledge that any false or misleading information may lead to consequences in accordance with applicable rules and regulations.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 text-[12px] font-inter">
          <button 
            onClick={handleCancel}
            className="rounded-lg border-none bg-transparent flex items-center justify-center py-1.5 px-5 cursor-pointer text-crimson hover:bg-crimson/5 transition-colors active:scale-95"
          >
            <div className="relative font-bold inline-block">Cancel</div>
          </button>

          <button 
            onClick={handleSubmit}
            disabled={!isDeclared}
            className={`rounded-lg border-none overflow-hidden flex items-center justify-center py-1.5 px-5 transition-all active:scale-95 ${
              isDeclared 
                ? 'bg-lightcyan text-teal cursor-pointer hover:bg-teal hover:text-white' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="relative font-bold inline-block">Submit</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportTenant5;