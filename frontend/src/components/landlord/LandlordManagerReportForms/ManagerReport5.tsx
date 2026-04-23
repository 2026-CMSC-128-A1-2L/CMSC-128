import { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

const ReportManager5: FunctionComponent<Props> = ({ onSubmit, onCancel }) => {
  return (
    <div className="relative rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 bg-white w-full flex items-center text-left text-[32px] text-white font-inter">
      <div className="w-[612px] flex flex-col items-center justify-center pt-0 px-0 pb-8 box-border gap-[42px]">
        <div className="self-stretch flex flex-col items-center">
          <div className="self-stretch rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-3 pl-[57px] pr-8">
            <div className="w-[533px] flex flex-col items-start justify-center pt-8 px-0 pb-2 box-border shrink-0">
              <b className="self-stretch relative">Report Manager</b>
              <b className="self-stretch relative text-lg tracking-[-0.01em] font-inter text-aliceblue">
                Report your dorm manager
              </b>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start pt-8 px-12 pb-5 text-center text-sm text-black font-inter">
            <div className="self-stretch flex items-center justify-center py-0 px-2 gap-2.5">
              <div className="self-stretch flex items-start py-1 px-0">
                <div className="h-[18px] w-[18px] relative overflow-hidden shrink-0">
                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded bg-teal" />
                  <img
                    className="absolute h-[83.33%] w-[83.33%] top-[12.5%] right-[8.33%] bottom-[4.17%] left-[8.33%] max-w-full overflow-hidden max-h-full"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex-1 relative leading-[25px]">
                <span className="font-medium text-num-14">{`I declare that all information and reports submitted are `}</span>
                <b className="text-teal text-num-14">truthful</b>
                <span className="font-medium text-num-14">{`, `}</span>
                <b className="text-teal text-num-14">complete</b>
                <span className="font-medium text-num-14">{`, and `}</span>
                <b className="text-teal text-num-14">based on verified facts</b>
                <span className="font-medium text-num-14">
                  {' '}
                  to the best of my knowledge. I acknowledge that any false or misleading
                  information may lead to consequences in accordance with applicable rules and
                  regulations.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-crimson font-inter">
          <div className="rounded-xl flex items-center justify-center py-2 px-6">
            <button
              className="relative font-semibold inline-block max-w-[269.11px]"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
          <div className="rounded-xl bg-lightcyan overflow-hidden flex items-center justify-center py-2 px-6 text-teal">
            <button
              className="relative font-semibold inline-block max-w-[269.11px]"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManager5;
