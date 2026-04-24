import { FunctionComponent } from 'react';
import allowed from '../../../../assets/allowed.svg';
import not_allowed from '../../../../assets/not_allowed.svg';

const RuleDetails: FunctionComponent = () => {
  return (
    <div className="w-full relative flex flex-col items-start gap-[29px] text-center text-num-18 text-gray font-inter">
      <div className="self-stretch flex flex-col items-start text-left text-black">
        <div className="self-stretch flex flex-col items-start gap-1">
          <div className="self-stretch flex items-center py-2.5 px-5">
            <b className="relative tracking-num--0_01">House Rules</b>
          </div>
          <div className="w-full flex flex-col items-start py-0 px-[21px] gap-3 text-num-14">
            <div className="self-stretch h-12 relative">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <img
                className="absolute h-[58.33%] w-[3.11%] top-[20.83%] right-[95.55%] bottom-[20.83%] left-[1.33%] max-w-full overflow-hidden max-h-full"
                alt=""
                src={not_allowed}
              />
              <div className="absolute h-[56.25%] w-[92.66%] top-[20.83%] left-[5.78%] leading-num-24 font-medium flex items-center">
                No overnight visitors of the opposite gender
              </div>
            </div>
            <div className="self-stretch h-12 relative">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <img
                className="absolute h-[58.33%] w-[3.11%] top-[20.83%] right-[95.55%] bottom-[20.83%] left-[1.33%] max-w-full overflow-hidden max-h-full"
                alt=""
                src={not_allowed}
              />
              <div className="absolute h-[56.25%] w-[92.66%] top-[20.83%] left-[5.78%] leading-num-24 font-medium flex items-center">
                No smoking inside the building
              </div>
            </div>
            <div className="self-stretch h-12 relative">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <img
                className="absolute h-[58.33%] w-[3.11%] top-[20.83%] right-[95.55%] bottom-[20.83%] left-[1.33%] max-w-full overflow-hidden max-h-full"
                alt=""
                src={allowed}
              />
              <div className="absolute h-[56.25%] w-[92.66%] top-[20.83%] left-[5.78%] leading-num-24 font-medium flex items-center">
                Curfew: 10 PM
              </div>
            </div>
            <div className="self-stretch h-12 relative">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <img
                className="absolute h-[58.33%] w-[3.11%] top-[20.83%] right-[95.55%] bottom-[20.83%] left-[1.33%] max-w-full overflow-hidden max-h-full"
                alt=""
                src={not_allowed}
              />
              <div className="absolute h-[56.25%] w-[92.66%] top-[20.83%] left-[5.78%] leading-num-24 font-medium flex items-center">
                No pets allowed
              </div>
            </div>
            <div className="self-stretch h-12 relative">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <img
                className="absolute h-[58.33%] w-[3.11%] top-[20.83%] right-[95.55%] bottom-[20.83%] left-[1.33%] max-w-full overflow-hidden max-h-full"
                alt=""
                src={allowed}
              />
              <div className="absolute h-[56.25%] w-[92.66%] top-[20.83%] left-[5.78%] leading-num-24 font-medium flex items-center">
                1-month advance + 2-month deposit on move-in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleDetails;
