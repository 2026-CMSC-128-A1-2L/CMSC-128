import { Icon } from '@iconify/react';
import { FunctionComponent } from 'react';

const InboxMessage: FunctionComponent = () => {
  return (
    <div className="w-[180px] relative rounded-xl bg-white border-whitesmoke border-solid border-[1px] box-border flex items-start pt-[0.5rem] px-[0.75rem] pb-[1rem] gap-[0.5rem] text-right text-[0.5rem] text-slategray font-lora">
      <div className="self-stretch flex items-center">
        <img className="w-[0.313rem] relative max-h-full" alt="" />
      </div>
      <div className="flex-1 flex flex-col items-start gap-[0.125rem]">
        <div className="self-stretch overflow-hidden flex items-start justify-end">
          <div className="flex-1 relative tracking-[0.04em] font-semibold">2m ago</div>
        </div>
        <div className="self-stretch flex items-start gap-[0.25rem] text-left text-[0.813rem] text-darkslategray font-inter">
          <div className="self-stretch overflow-hidden flex items-start py-[0.25rem] px-[0.187rem]">
            <Icon icon="iconamoon:notification" className="w-5 h-5" />
          </div>
          <div className="flex-1 flex flex-col items-start gap-[0.25rem]">
            <div className="self-stretch flex items-center">
              <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
                Verification Status
              </b>
            </div>
            <div className="self-stretch relative text-[0.625rem] tracking-[0.02em] font-semibold font-lora text-dimgray [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              Hi Daphne! Your verification has been approved!
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxMessage;
