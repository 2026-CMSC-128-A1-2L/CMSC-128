
import { FunctionComponent, useCallback } from 'react';



const BuildingInformation: FunctionComponent = () => {

  const onButtonContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className="relative w-full flex flex-col items-start justify-center gap-2.5 text-center text-num-18 text-teal-200 font-inter">
      <div className="w-[880px] flex flex-col items-start">
        <div className="w-[880px] rounded-2xl bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start py-8 px-12 gap-3">
          <div className="self-stretch flex flex-col items-start gap-6">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">Building Information</b>
            </div>
            <div className="self-stretch flex flex-col items-start gap-5 text-left text-num-14 text-dimgray">
              <div className="self-stretch flex items-start gap-10">
                <div className="flex-1 flex flex-col items-start gap-3">
                  <b className="relative">Name</b>
                  <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex flex-col items-start justify-center py-3 px-num-16 text-slategray">
                    <div className="relative leading-num-24 font-medium">Aa</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start gap-3">
                  <b className="self-stretch h-[15.2px] relative flex items-center shrink-0">Type of Building</b>
                  <div className="self-stretch h-12 rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start py-[21px] pl-[326px] pr-[17px]">
                    <img className="w-3.5 h-1.5 relative" alt="" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-3">
                <b className="relative">Location</b>
                <div className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex flex-col items-start justify-center py-3 px-num-16 text-slategray">
                  <div className="relative leading-num-24 font-medium">Aa</div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[152px] overflow-hidden shrink-0 flex flex-col items-start py-num-10 px-0 box-border gap-2.5">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">About</b>
            </div>
            <div className="self-stretch flex-1 rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex flex-col items-start py-3 px-num-16 text-left text-num-14 text-slategray">
              <div className="relative leading-num-24 font-medium">Aa</div>
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">Add Photos</b>
            </div>
            <div className="self-stretch overflow-hidden flex items-start flex-wrap content-start py-num-10 px-0">
              <div className="h-[100px] w-[100px] rounded-num-12 border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-10">
                <img className="w-8 h-8 relative" alt="" />
              </div>
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">{`Room Types `}</b>
            </div>
            <div className="self-stretch overflow-hidden flex items-start flex-wrap content-start text-left text-num-14 text-gray">
              <div className="w-[764px] rounded-num-12 overflow-hidden shrink-0 flex flex-col items-center py-2 px-0 box-border gap-8">
                <div className="self-stretch flex flex-col items-start">
                  <div className="self-stretch flex items-start">
                    <div className="flex-1 flex items-start gap-3">
                      <div className="self-stretch flex-1 flex items-center">
                        <b className="relative">2 Pax Room</b>
                      </div>
                      <div className="flex items-center justify-center py-1 px-num-16 text-teal-100">
                        <div className="relative leading-num-24 font-medium">Show</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[764px] h-[100px] rounded-num-12 border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-10">
                  <img className="w-8 h-8 relative" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
            <div className="self-stretch flex items-center">
              <b className="relative tracking-num--0_01">Add Managers</b>
            </div>
            <div className="rounded-num-12 bg-aliceblue border-whitesmoke border-solid border-[1px] flex items-center py-2 px-num-16 gap-2.5 text-left text-num-14 text-slategray">
              <div className="relative leading-num-24 font-medium">Invite Managers</div>
              <img className="h-4 w-4 relative" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[903px] overflow-hidden flex items-center justify-center py-0 px-num-10 box-border gap-2.5 text-num-14 text-dimgray">
        <div className="rounded-[45px] flex items-center justify-center py-2 px-8 cursor-pointer" onClick={onButtonContainerClick}>
          <b className="relative">Back</b>
        </div>
        <div className="rounded-[45px] bg-darkslategray flex items-center justify-center py-2 px-8 gap-2.5 text-white">
          <b className="relative">Next</b>
          <img className="h-6 w-6 relative" alt="" />
        </div>
      </div>
    </div>);
};

export default BuildingInformation;
