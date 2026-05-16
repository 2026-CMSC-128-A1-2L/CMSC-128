import { type FunctionComponent, useState } from 'react';

const ReportTenant5: FunctionComponent = () => {
  const [isDeclared, setIsDeclared] = useState(false);

  const handleToggleDeclaration = () => {
    setIsDeclared((prev) => !prev);
  };

  const handleCancel = () => {
    console.log('Submission cancelled');
    setIsDeclared(false);
  };

  const handleSubmit = () => {
    if (!isDeclared) return;
    console.log('Report submitted successfully.');
  };

  return (
    <div className="relative rounded-tl-[32px] rounded-tr-none rounded-b-none bg-white w-full flex items-center text-left font-poppins">
      <div className="w-[612px] flex flex-col items-center justify-center pt-0 px-0 pb-8 box-border gap-[42px]">
        <div className="self-stretch flex flex-col items-center">
          {/* Header Section */}
          <div className="self-stretch rounded-tl-[32px] rounded-tr-none rounded-b-none [background:linear-gradient(183.48deg,#096c5b,#16917c)] flex flex-col items-start justify-center py-3 pl-[57px] pr-8">
            <div className="w-[533px] flex flex-col items-start justify-center pt-8 px-0 pb-2 box-border shrink-0">
              <b className="self-stretch relative text-[32px] text-white">Report Tenant</b>
              <b className="self-stretch relative text-lg tracking-[-0.01em] font-inter text-aliceblue font-bold">
                Report your tenant
              </b>
            </div>
          </div>

          {/* Declaration Content */}
          <div className="self-stretch flex flex-col items-start pt-8 px-12 pb-5 text-sm text-black font-inter">
            <div
              className="self-stretch flex items-start justify-center py-0 px-2 gap-2.5 cursor-pointer select-none"
              onClick={handleToggleDeclaration}
            >
              <div className="flex items-start py-1 px-0">
                <div className="h-[18px] w-[18px] relative overflow-hidden shrink-0">
                  <div
                    className={`absolute h-full w-full top-0 right-0 bottom-0 left-0 shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded transition-colors ${
                      isDeclared ? 'bg-teal' : 'bg-whitesmoke-100 border border-whitesmoke-200'
                    }`}
                  />
                  {isDeclared && (
                    <svg
                      className="absolute h-[83.33%] w-[83.33%] top-[12.5%] right-[8.33%] bottom-[4.17%] left-[8.33%]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex-1 relative leading-[25px] text-left text-sm">
                <span className="font-medium text-black">{`I declare that all information and reports submitted are `}</span>
                <span className="text-teal font-bold">truthful</span>
                <span className="font-medium text-black">{`, `}</span>
                <span className="text-teal font-bold">complete</span>
                <span className="font-medium text-black">{`, and `}</span>
                <span className="text-teal font-bold">based on verified facts</span>
                <span className="font-medium text-black">
                  {' '}
                  to the best of my knowledge. I acknowledge that any false or misleading
                  information may lead to consequences in accordance with applicable rules and
                  regulations.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 text-sm font-inter">
          <button
            onClick={handleCancel}
            className="rounded-xl border-none bg-transparent flex items-center justify-center py-2 px-6 cursor-pointer text-crimson hover:bg-crimson/5 transition-colors active:scale-95"
          >
            <div className="relative font-bold inline-block">Cancel</div>
          </button>

          <button
            onClick={handleSubmit}
            disabled={!isDeclared}
            className={`rounded-xl border-none overflow-hidden flex items-center justify-center py-2 px-6 transition-all active:scale-95 ${
              isDeclared
                ? 'bg-lightcyan text-teal cursor-pointer hover:bg-teal hover:text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="relative font-bold inline-block cursor-pointer">Submit</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportTenant5;
