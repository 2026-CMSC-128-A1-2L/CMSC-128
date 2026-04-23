import { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

export type SubmitReceiptType = {
  className?: string;
};

const SubmitReceipt: FunctionComponent<SubmitReceiptType> = ({ className = '' }) => {
  return (
    <div
      className={`w-[480px] h-[480px] relative rounded-num-16 bg-white overflow-hidden flex flex-col items-start p-num-32 box-border max-w-full max-h-full text-left text-num-24 text-black font-inter ${className}`}
    >
      <div className="h-[416px] flex flex-col items-start gap-1">
        <div className="self-stretch flex flex-col items-start justify-center gap-2">
          <div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-[5px] gap-5">
            <div className="flex items-center">
              <div className="flex items-center gap-2.5">
                <div className="overflow-hidden flex items-center">
                  <Icon icon="boxicons:receipt" className="w-5 h-5 relative z-[0]" />
                </div>
                <b className="relative leading-num-32">Submit Receipt</b>
              </div>
              <div className="flex items-center justify-center text-center text-num-14 text-dimgray">
                <b className="relative">
                  <ul className="m-0 font-inherit text-[length:inherit] pl-[19px]">
                    <li>April 15, 2026</li>
                  </ul>
                </b>
              </div>
            </div>
            <div className="overflow-hidden flex flex-col items-end justify-center">
              <Icon icon="fontisto:close" className="w-8 h-8 relative" color="red" />
            </div>
          </div>
          <div className="w-[416px] flex flex-col items-start">
            <div className="self-stretch h-0.5 relative bg-whitesmoke-200" />
          </div>
        </div>
        <div className="self-stretch h-[370px] overflow-hidden shrink-0 flex flex-col items-center py-3 px-num-10 box-border gap-4 text-center text-num-14 text-dimgray">
          <div className="w-96 flex flex-col items-start gap-2 shrink-0 text-left">
            <div className="self-stretch flex items-center">
              <div className="w-96 flex items-center">
                <b className="relative">
                  <span>Due:</span>
                  <span className="text-num-18 tracking-num--0_01 text-teal">
                    <span className="text-black">{` `}</span>
                    <span>4500.00 php</span>
                  </span>
                </b>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-[13px] font-lora">
              <div className="self-stretch rounded-num-8 bg-white border-whitesmoke-200 border-solid border-[2px] flex items-center p-2">
                <div className="relative font-medium">Reference/Transaction No.</div>
              </div>
              <div className="self-stretch rounded-num-8 bg-white border-whitesmoke-200 border-solid border-[2px] flex items-center justify-between p-2 gap-5">
                <div className="flex items-center justify-center py-px px-num-0">
                  <div className="relative font-medium">Payment Method Used</div>
                </div>
                <Icon icon="mdi-light:chevron-down" className="h-6 w-6 relative" />
              </div>
            </div>
          </div>
          <div className="w-96 rounded-num-16 bg-white border-whitesmoke-200 border-dashed border-[2px] box-border flex flex-col items-center py-6 px-num-0 gap-1 shrink-0 text-silver">
            <div className="overflow-hidden flex flex-col items-start">
              <Icon icon="mdi-light:cloud-upload" className="w-10 h-10 relative" />
            </div>
            <div className="self-stretch flex items-center justify-center p-num-10">
              <b className="relative">Upload receipt screenshot</b>
            </div>
          </div>
          <div className="self-stretch h-[50px] overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-10 box-border text-teal">
            <div className="w-full rounded-num-12 bg-lightcyan-100 overflow-hidden flex items-center justify-center p-num-10 box-border max-w-full shrink-0">
              <div className="relative font-semibold">Submit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitReceipt;
