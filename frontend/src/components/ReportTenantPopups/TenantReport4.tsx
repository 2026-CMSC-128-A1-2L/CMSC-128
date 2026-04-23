import { FunctionComponent, useState } from 'react';

interface SecurityConcern {
  id: string;
  label: string;
  description?: string;
}

const SECURITY_CONCERNS: SecurityConcern[] = [
  {
    id: 'unauthorized_access',
    label: 'Allowing Unauthorized Access',
    description: 'Sharing of property keys, extended guest stay.',
  },
  {
    id: 'failure_report',
    label: 'Failure to Report Incidents',
  },
  {
    id: 'tampering',
    label: 'Tampering with Surveillance Systems',
  },
];

const ReportTenant4: FunctionComponent = () => {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const toggleConcern = (id: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedConcerns.length === SECURITY_CONCERNS.length) {
      setSelectedConcerns([]);
    } else {
      setSelectedConcerns(SECURITY_CONCERNS.map((c) => c.id));
    }
  };

  const isAllSelected = selectedConcerns.length === SECURITY_CONCERNS.length;

  // Button Handlers
  const handleCancel = () => {
    console.log('Reporting cancelled');
    setSelectedViolations([]);
    // pag nag cancel
  };

  const handleNext = () => {
    if (selectedViolations.length === 0) {
      //if walang clincik
      return;
    }
    console.log('Proceeding with violations:', selectedViolations);
    // next popup
  };

  return (
    <div className="relative rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 bg-white w-full flex items-center text-left text-[32px] text-white font-poppins">
      <div className="w-[612px] flex flex-col items-center justify-center pt-0 px-0 pb-8 box-border gap-[42px]">
        <div className="self-stretch flex flex-col items-center">
          <div className="self-stretch rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-3 pl-[57px] pr-8">
            <div className="w-[533px] flex flex-col items-start justify-center pt-8 px-0 pb-2 box-border shrink-0">
              <b className="self-stretch relative">Report Tenant</b>
              <b className="self-stretch relative text-[18px] tracking-[-0.01em] font-inter text-aliceblue">
                Report your tenant
              </b>
            </div>
          </div>

          <div className="self-stretch flex flex-col items-start pt-8 px-12 pb-5 gap-12 text-num-14 text-dimgray font-inter">
            <div className="self-stretch flex flex-col items-start gap-3">
              <b className="self-stretch relative">Email Address</b>
              <div className="self-stretch h-12 rounded-num-12 border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start justify-center py-1 px-4 text-slategray">
                <div className="relative leading-6 font-medium">ncunanan@gmail.com</div>
              </div>
              <div className="self-stretch flex items-center justify-center py-0 px-2 text-[18px] text-black">
                <b className="flex-1 relative tracking-[-0.01em]">
                  You are reporting Nathaniel Cunanan. Please select all that apply:
                </b>
              </div>
            </div>

            <div className="self-stretch flex flex-col items-start gap-3">
              <div className="self-stretch flex items-end py-0 pl-0 pr-[22px]">
                <b className="self-stretch flex-1 relative flex items-center">{`Security & Safety Concerns`}</b>
                <button
                  onClick={handleSelectAll}
                  className="flex items-center gap-[11px] text-[12px] text-slategray border-none bg-transparent cursor-pointer"
                >
                  <div className="relative font-medium">
                    {isAllSelected ? 'Deselect All' : 'Select All'}
                  </div>
                  <div className="h-6 w-6 relative">
                    <div
                      className={`absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded ${
                        isAllSelected ? 'bg-teal' : 'bg-whitesmoke-100'
                      }`}
                    />
                    {isAllSelected && <CheckMark />}
                  </div>
                </button>
              </div>

              <div className="self-stretch flex flex-col items-start text-black">
                <div className="self-stretch flex flex-col items-start gap-[21px]">
                  {SECURITY_CONCERNS.map((concern) => {
                    const isChecked = selectedConcerns.includes(concern.id);
                    return (
                      <label
                        key={concern.id}
                        className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-[22px] gap-4 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={() => toggleConcern(concern.id)}
                        />
                        <div className="flex-1 flex items-center">
                          <div className="flex flex-col items-start justify-center gap-1">
                            <b className="relative">{concern.label}</b>
                            {concern.description && (
                              <div className="relative text-[12px] font-medium text-dimgray">
                                {concern.description}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="h-6 w-6 relative overflow-hidden shrink-0">
                          <div
                            className={`absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded ${
                              isChecked ? 'bg-teal' : 'bg-whitesmoke-100'
                            }`}
                          />
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

        <div className="flex items-center gap-4 text-num-14 text-crimson font-inter">
          <button
            onClick={handleCancel}
            className="rounded-num-12 flex items-center justify-center py-2 px-num-24 cursor-pointer bg-transparent border-none text-crimson hover:bg-red-50 active:scale-95 transition-all"
          >
            <div className="relative font-semibold inline-block max-w-[269.11px]">Cancel</div>
          </button>

          <button
            onClick={handleNext}
            className="rounded-num-12 bg-lightcyan overflow-hidden flex items-center justify-center py-2 px-num-24 text-teal cursor-pointer border-none hover:bg-opacity-80 active:scale-95 transition-all"
          >
            <div className="relative font-semibold inline-block max-w-[269.11px]">Next</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckMark = () => (
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
);

export default ReportTenant4;
