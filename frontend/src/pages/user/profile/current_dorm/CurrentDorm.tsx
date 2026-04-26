import { FunctionComponent, useCallback } from 'react';
import { Icon } from '@iconify/react';
import placeholder from '../../../../../assets/logo_atlas_text.svg';
import { Link } from 'react-router-dom';

const CurrentDorm: FunctionComponent = () => {
  const onContractInformationContainerClick = useCallback(() => {
    // Add logic for button clicks here
  }, []);

  return (
    <div className="self-stretch h-[680px] flex flex-col items-start gap-12 text-white">
      {/* {<Switch />} */}
      <div className="self-stretch flex flex-col items-start gap-3 shrink-0 text-[24px] text-teal-200">
        <div className="w-[1128px] h-[520px] bg-white flex flex-col items-center justify-center">
          <div className="w-[916px] h-[520px] rounded-num-12 border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start">
            <img
              className="w-[916px] relative rounded-t-num-12 rounded-b-none max-h-full object-cover"
              alt=""
              src={placeholder}
            />
            <div className="self-stretch h-40 flex flex-col items-start">
              <div className="w-[916px] h-16 flex flex-col items-center justify-center py-5 px-[27px] box-border shrink-0 text-left text-black">
                <b className="relative leading-8 shrink-0">One Sapphire Place</b>
              </div>
              <div className="flex items-center py-num-0 px-[26px] gap-3 shrink-0 text-[18px]">
                <div className="h-20 w-[280px] rounded-num-12 bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center">
                  <div className="self-stretch flex items-center justify-center py-num-24 px-num-10">
                    <b className="relative tracking-[-0.01em]">Room 31</b>
                  </div>
                  <div className="flex items-center justify-center p-num-10 mt-[-32px] relative text-[8px] text-black font-lora">
                    <div className="relative tracking-[0.04em] font-semibold">UNIT</div>
                  </div>
                </div>
                <div className="h-20 w-[280px] rounded-num-12 bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center">
                  <div className="self-stretch flex items-center justify-center py-num-24 px-num-10">
                    <b className="relative tracking-[-0.01em]">1 Year</b>
                  </div>
                  <div className="flex items-center justify-center p-num-10 mt-[-32px] relative text-[8px] text-black font-lora">
                    <div className="relative tracking-[0.04em] font-semibold">Contract</div>
                  </div>
                </div>
                <div className="h-20 w-[280px] rounded-num-12 bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center">
                  <div className="self-stretch flex items-center justify-center py-num-24 px-num-10">
                    <b className="relative tracking-[-0.01em]">May 18, 2026</b>
                  </div>
                  <div className="flex items-center justify-center p-num-10 mt-[-32px] relative text-[8px] text-black font-lora">
                    <div className="relative tracking-[0.04em] font-semibold">Lease End</div>
                  </div>
                </div>
              </div>
              <div className="w-[916px] flex items-center justify-center py-num-10 px-num-0 box-border shrink-0 text-[12px]">
                <div className="h-10 w-[863px] rounded-num-12 border-whitesmoke-200 border-solid border-[1px] box-border flex items-center justify-center">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-1 text-[12px] text-teal-100 cursor-pointer hover:underline"
                  >
                    <div className="relative font-medium">View Details</div>
                    <Icon icon="solar:arrow-right-up-linear" className="h-6 w-6 relative" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex items-start justify-center pt-num-24 px-num-32 pb-20 gap-6 text-num-14 text-black">
          <div className="w-[280px] rounded-2xl border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start py-3 px-4">
            <div className="self-stretch flex flex-col items-end py-3 px-num-0 gap-2">
              
              <Link to="/contract-information" className="cursor-pointer hover:underline">
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={onContractInformationContainerClick}
              >
                <div className="relative font-semibold">Contract Information</div>
                <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
              </div>
              </Link>
              
              
              <Link to="/rate-review" className="cursor-pointer hover:underline">
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={onContractInformationContainerClick}
              >
                <div className="relative font-semibold">Rate and Review</div>
                <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
              </div>

</Link>
              


              <Link to="/report-dorm" className="cursor-pointer hover:underline">
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={onContractInformationContainerClick}
              >
                <div className="relative font-semibold">Report Listing</div>
                <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
              </div>
</Link>
              


              <Link to="/lease-transfer" className="cursor-pointer hover:underline">
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={onContractInformationContainerClick}
              >
                <div className="relative font-semibold">Pasalo Unit</div>
                <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
              </div>
</Link>
              


            </div>
          </div>
          <div className="h-[168px] w-[612px] rounded-lg border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex items-center px-8 text-left" />
        </div>
      </div>
    </div>
  );
};

export default CurrentDorm;
