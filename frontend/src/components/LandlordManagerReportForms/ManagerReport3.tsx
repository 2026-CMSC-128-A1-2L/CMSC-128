import { FunctionComponent } from 'react';

type Props = {
  onNext: () => void;
  onCancel: () => void;
};

const ReportManager3: FunctionComponent<Props> = ({ onNext, onCancel }) => {
  return (
    <div className="relative rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 bg-white w-full flex items-center text-left text-[32px] text-white font-poppins">
      <div className="w-[612px] flex flex-col items-center justify-center pt-0 px-0 pb-8 box-border gap-[42px]">
        <div className="self-stretch flex flex-col items-center">
          <div className="self-stretch rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-3 pl-[57px] pr-8">
            <div className="w-[533px] flex flex-col items-start justify-center pt-8 px-0 pb-2 box-border shrink-0">
              <b className="self-stretch relative">Report Manager</b>
              <b className="self-stretch relative text-[18px] tracking-[-0.01em] font-inter text-aliceblue">
                Report your dorm manager
              </b>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start pt-8 px-12 pb-5 gap-12 text-num-14 text-dimgray font-inter">
            <div className="self-stretch flex flex-col items-start gap-3">
              <b className="self-stretch relative">Email Address</b>
              <div className="self-stretch h-12 rounded-num-12 border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start justify-center py-1 px-4 text-slategray">
                <div className="relative leading-6 font-medium">ncunanan@gmail.com</div>
              </div>
              <div className="self-stretch flex items-center justify-center py-0 px-2 text-[18px] text-black">
                <b className="flex-1 relative tracking-[-0.01em]">{`You are reporting Nathaniel Cunanan. Please select all that apply: `}</b>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-4">
              <div className="self-stretch flex items-end py-0 pl-0 pr-num-22">
                <b className="self-stretch flex-1 relative flex items-center">{`Property & Maintenance Issues`}</b>
                <div className="flex items-center gap-[11px] text-[12px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start text-black">
                <div className="self-stretch flex flex-col items-start gap-2">
                  <div className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-num-22 gap-4">
                    <div className="flex-1 flex items-center">
                      <div className="flex flex-col items-start justify-center gap-1">
                        <b className="relative shrink-0">Failure to Maintain Cleanliness</b>
                        <div className="relative text-[12px] font-medium text-dimgray hidden shrink-0">
                          Delayed deposits, missing payments
                        </div>
                      </div>
                    </div>
                    <div className="h-6 w-6 relative overflow-hidden shrink-0">
                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-teal" />
                      <img
                        className="absolute h-[83.33%] w-[83.33%] top-[12.5%] right-[8.33%] bottom-[4.17%] left-[8.33%] max-w-full overflow-hidden max-h-full"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-num-22 gap-4">
                    <div className="flex-1 flex items-center">
                      <div className="flex flex-col items-start justify-center gap-1">
                        <b className="relative shrink-0">Ignoring Repair Requests</b>
                        <div className="relative text-[12px] font-medium text-dimgray hidden shrink-0">
                          Collects payments not related to tenant’s financial duties
                        </div>
                      </div>
                    </div>
                    <div className="h-6 w-6 relative">
                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-whitesmoke" />
                    </div>
                  </div>
                  <div className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-num-22 gap-4">
                    <div className="flex-1 flex items-center">
                      <div className="flex flex-col items-start justify-center gap-1">
                        <b className="relative shrink-0">Improper Handling of Maintenance Staff</b>
                        <div className="relative text-[12px] font-medium text-dimgray hidden shrink-0">
                          Maintenance funds, deposits, etc.
                        </div>
                      </div>
                    </div>
                    <div className="h-6 w-6 relative">
                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-whitesmoke" />
                    </div>
                  </div>
                  <div className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-num-22 gap-4">
                    <div className="flex-1 flex items-center">
                      <div className="flex flex-col items-start justify-center gap-1">
                        <b className="relative shrink-0">Safety Hazards Not Addressed</b>
                        <div className="relative text-[12px] font-medium text-dimgray hidden shrink-0">
                          Maintenance funds, deposits, etc.
                        </div>
                      </div>
                    </div>
                    <div className="h-6 w-6 relative">
                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-whitesmoke" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-num-14 text-crimson font-inter">
          <div className="rounded-num-12 flex items-center justify-center py-2 px-num-24">
            <button
              className="relative font-semibold inline-block max-w-[269.11px]"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
          <div className="rounded-num-12 bg-lightcyan overflow-hidden flex items-center justify-center py-2 px-num-24 text-teal">
            <button
              className="relative font-semibold inline-block max-w-[269.11px]"
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManager3;
