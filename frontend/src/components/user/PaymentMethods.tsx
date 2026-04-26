import { Icon } from '@iconify/react';
import { FunctionComponent } from 'react';

export type PaymentMethodsType = {
  className?: string;
};

const PaymentMethods: FunctionComponent<PaymentMethodsType> = ({ className = '' }) => {
  return (
    <div
      className={`w-full h-screen relative rounded-num-16 bg-white overflow-hidden flex flex-col items-start p-num-32 box-border max-w-full max-h-full text-left text-num-24 text-black font-inter ${className}`}
    >
      <div className="flex flex-col items-start gap-2.5">
        <div className="self-stretch flex flex-col items-start justify-center gap-2">
          <div className="flex items-center">
            <div className="w-96 flex items-center gap-2.5">
              <div className="overflow-hidden flex flex-col items-center justify-center relative isolate gap-2.5">
                <Icon icon="fluent:payment-16-regular" className="w-5 h-5 relative z-[0]" />
              </div>
              <b className="relative leading-num-32">Payment Methods</b>
            </div>
            <div className="overflow-hidden flex flex-col items-end justify-center">
              <Icon icon="fontisto:close" className="w-8 h-8 relative" color="red" />
            </div>
          </div>
          <div className="w-[416px] flex flex-col items-start">
            <div className="self-stretch h-0.5 relative bg-whitesmoke-200" />
          </div>
        </div>
        <div className="self-stretch h-[784px] overflow-hidden shrink-0 flex flex-col items-center py-3 px-num-10 box-border gap-4 text-num-18">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center">
              <div className="w-96 flex items-center">
                <b className="relative tracking-num--0_01">GCASH QR CODE</b>
              </div>
            </div>
            <div className="w-96 rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[2px] box-border flex flex-col items-center py-6 px-num-0 gap-3 text-center text-num-24 text-gray">
              <div className="self-stretch overflow-hidden flex items-center justify-center">
                <Icon icon="grommet-icons:qr" className="w-20 h-20 relative" />
              </div>
              <div className="self-stretch flex flex-col items-center">
                <div className="self-stretch flex items-center justify-center p-num-10">
                  <b className="relative leading-num-32">09604709398</b>
                </div>
                <div className="flex items-center justify-center p-num-10 mt-[-16px] relative text-num-18 text-silver">
                  <b className="relative tracking-num--0_01">{`Quevin Custodio `}</b>
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 flex flex-col items-start gap-2">
            <div className="self-stretch flex items-center">
              <div className="w-96 flex items-center">
                <b className="relative tracking-num--0_01">BANK TRANSFER</b>
              </div>
            </div>
            <div className="self-stretch rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] flex flex-col items-start py-3 px-1.5 text-num-14 text-silver">
              <div className="self-stretch h-[85px] flex flex-col items-center justify-between gap-2">
                <div className="w-[348px] flex flex-col items-start gap-1">
                  <div className="self-stretch flex items-center justify-between gap-5">
                    <div className="flex items-center justify-center">
                      <b className="relative">Bank</b>
                    </div>
                    <div className="flex items-center justify-center text-teal">
                      <b className="relative">BPI</b>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start">
                    <div className="self-stretch h-0.5 relative bg-whitesmoke-200" />
                  </div>
                </div>
                <div className="w-[348px] flex flex-col items-start gap-1">
                  <div className="self-stretch flex items-center justify-between gap-5">
                    <div className="flex items-center justify-center">
                      <b className="relative">Account Name</b>
                    </div>
                    <div className="flex items-center justify-center text-teal">
                      <b className="relative">Quevin Custodio</b>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start">
                    <div className="self-stretch h-0.5 relative bg-whitesmoke-200" />
                  </div>
                </div>
                <div className="w-[348px] flex flex-col items-start gap-1">
                  <div className="self-stretch flex items-center justify-between gap-5">
                    <div className="flex items-center justify-center">
                      <b className="relative">Account No.</b>
                    </div>
                    <div className="flex items-center justify-center text-teal">
                      <b className="relative whitespace-pre-wrap">0123 4567 8910</b>
                    </div>
                  </div>
                  <div className="self-stretch h-0.5 flex flex-col items-start" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 flex flex-col items-start gap-2">
            <div className="self-stretch flex items-center">
              <div className="w-96 flex items-center">
                <b className="relative tracking-num--0_01">SUBMIT PAYMENT DETAILS</b>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-[13px] text-num-14 text-dimgray font-lora">
              <div className="self-stretch rounded-num-8 bg-white border-whitesmoke-200 border-solid border-[2px] flex items-center p-2">
                <div className="relative font-medium">Account Name</div>
              </div>
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
          <div className="self-stretch flex-1 overflow-hidden flex flex-col items-center justify-center p-num-10 text-center text-num-14 text-teal">
            <div className="w-full rounded-num-12 bg-lightcyan-100 overflow-hidden flex items-center justify-center p-num-10 box-border max-w-full shrink-0">
              <div className="relative font-semibold">Submit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
