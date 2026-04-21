import { FunctionComponent } from 'react';

type Props = {
  onNext: () => void;
  onCancel: () => void;
  className?: string;
}

const ReportManager1: FunctionComponent<Props> = ({
  onNext,
  onCancel,
  className = "",
}) => {
  return (
    /* Main container scaled to 80% width */
    <div className={`relative rounded-tl-[25.6px] rounded-tr-0 rounded-b-0 bg-white w-full flex items-center text-left text-[32px] text-white font-poppins ${className}`}>
      {/* Width 612px * 0.8 = 490px; gap 42px * 0.8 = 33.6px */}
      <div className="w-[490px] flex flex-col items-center justify-center pt-0 px-0 pb-[25.6px] box-border gap-[33.6px]">
        <div className="self-stretch flex flex-col items-center">
          {/* Header section: py-3 * 0.8 = 2.4, pl-57 * 0.8 = 45.6 */}
          <div className="self-stretch rounded-tl-[25.6px] rounded-tr-0 rounded-b-0 [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-[9.6px] pl-[45.6px] pr-[25.6px]">
            {/* Inner Header: w-533 * 0.8 = 426.4px; pt-8 * 0.8 = 6.4 */}
            <div className="w-[426.4px] flex flex-col items-start justify-center pt-[25.6px] px-0 pb-[6.4px] box-border shrink-0">
              <b className="self-stretch relative">Report Manager</b>
              <b className="self-stretch relative text-[18px] tracking-[-0.01em] font-inter text-aliceblue">Report your dorm manager</b>
            </div>
          </div>

          {/* Content Body: px-12 * 0.8 = 38.4px; gap-12 * 0.8 = 38.4px */}
          <div className="self-stretch flex flex-col items-start pt-[25.6px] px-[38.4px] pb-[16px] gap-[38.4px] text-num-14 text-dimgray font-inter">
            <div className="self-stretch flex flex-col items-start gap-[9.6px]">
              <b className="self-stretch relative">Email Address</b>
              {/* Input Box: h-12 * 0.8 = 9.6 (38.4px total) */}
              <div className="self-stretch h-[38.4px] rounded-[9.6px] border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start justify-center py-[3.2px] px-[12.8px] text-slategray">
                <div className="relative leading-6 font-medium">{`ncunanan@gmail.com `}</div>
              </div>
              <div className="self-stretch flex items-center justify-center py-0 px-[6.4px] text-num-18 text-black">
                <b className="flex-1 relative tracking-[-0.008em]">You are reporting Nathaniel Cunanan. Please select all that apply:</b>
              </div>
            </div>

            <div className="self-stretch flex flex-col items-start gap-[9.6px]">
              <div className="self-stretch flex items-end py-0 pl-0 pr-[17.6px]">
                <b className="self-stretch flex-1 relative flex items-center">{`Administrative & Management Issues`}</b>
                <div className="flex items-center gap-[8.8px] text-[12px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  {/* Icon Box: 24px * 0.8 = 19.2px */}
                  <div className="h-[19.2px] w-[19.2px] relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_1.6px_rgba(0,_0,_0,_0.25)] rounded-[3.2px] bg-whitesmoke-200" />
                  </div>
                </div>
              </div>

              {/* Checklist Items Container: gap 21 * 0.8 = 16.8 */}
              <div className="self-stretch flex flex-col items-start text-black">
                <div className="self-stretch flex flex-col items-start gap-[16.8px]">

                  {/* Repeated Item Structure (Multiplied numeric paddings/radii by 0.8) */}
                  {[
                    { title: "Mismanagement of Tenant Records", desc: "Lost, incomplete, or falsified data", checked: true },
                    { title: "Failure to Enforce Dorm Policies", desc: "Ignoring curfews, guest rules, etc.", checked: false },
                    { title: "Unauthorized Decision-Making", desc: "Acting without landlord approval", checked: true },
                    { title: "Negligence in Duties", desc: "Not responding to tenant concerns or issues", checked: true },
                    { title: "Conflict of Interest", desc: "Favoring certain tenants unfairly", checked: true }
                  ].map((item, index) => (
                    <div key={index} className="self-stretch rounded-[9.6px] flex items-center py-[9.6px] pl-[19.2px] pr-[17.6px] gap-[12.8px]">
                      <div className="flex-1 flex items-center">
                        <div className="flex flex-col items-start justify-center gap-[3.2px]">
                          <b className="relative">{item.title}</b>
                          <div className="relative text-[12px] font-medium text-dimgray">{item.desc}</div>
                        </div>
                      </div>
                      <div className="h-[19.2px] w-[19.2px] relative shrink-0">
                        <div className={`absolute h-full w-full rounded-[3.2px] shadow-[0px_0px_1.6px_rgba(0,_0,_0,_0.25)] ${item.checked ? 'bg-teal' : 'bg-whitesmoke-200'}`} />
                        {item.checked && (
                          <img className="absolute h-[83.33%] w-[83.33%] top-[12.5%] right-[8.33%] bottom-[4.17%] left-[8.33%] max-w-full overflow-hidden max-h-full" alt="" />
                        )}
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons: gap 16 * 0.8 = 12.8 */}
        <div className="flex items-center gap-[12.8px] text-num-14 text-crimson font-inter">
          <div className="rounded-[9.6px] flex items-center justify-center py-[6.4px] px-[19.2px]">
            <button className="relative font-semibold inline-block max-w-[215.3px]" onClick={onCancel}>Cancel</button>
          </div>
          <div className="rounded-[9.6px] bg-lightcyan overflow-hidden flex items-center justify-center py-[6.4px] px-[19.2px] text-teal">
            <button className="relative font-semibold inline-block max-w-[215.3px]" onClick={onNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManager1;
