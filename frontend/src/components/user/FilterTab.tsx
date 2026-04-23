import { FunctionComponent } from "react";

const Filter: FunctionComponent = () => {
  return (
    <div className="relative rounded-[14.1px] bg-white w-130 h-fit overflow-hidden flex flex-col items-start py-[2.643rem] px-[1.762rem] box-border gap-[0.881rem] text-left text-[0.771rem] text-teal font-inter">
      <div className="self-stretch overflow-hidden flex items-center py-[0rem] pl-[0rem] pr-[0.662rem] gap-[0.55rem] text-center text-[1.322rem] text-gray">
        <div className="flex-1 flex items-center">
          <b className="relative leading-[1.763rem]">Select filter</b>
        </div>
        <div className="rounded-[39.66px] bg-aliceblue flex items-center justify-center py-[0.218rem] px-[0.662rem] text-[0.771rem] text-slategray">
          <b className="relative">Reset Filter</b>
        </div>
      </div>
      <div className="flex flex-col items-start gap-[1.1rem]">
        <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.55rem] px-[0rem] gap-[0.55rem]">
          <div className="self-stretch flex items-center">
            <b className="relative">Property Type</b>
          </div>
          <div className="self-stretch flex flex-col items-start text-center text-dimgray">
            <div className="self-stretch overflow-hidden flex items-center justify-between p-[0.55rem] gap-[0.862rem]">
              <div className="w-[5.344rem] rounded-[10.57px] border-whitesmoke border-solid border-[0.9px] box-border overflow-hidden shrink-0 flex flex-col items-start p-[0.55rem] gap-[0.437rem]">
                <img className="w-[1.319rem] h-[1.319rem] relative" alt="" />
                <div className="relative leading-[1.322rem] font-medium">
                  Apartment
                </div>
              </div>
              <div className="h-[4.625rem] w-[5.506rem] rounded-[10.93px] bg-lightcyan-300 overflow-hidden shrink-0 flex flex-col items-start justify-center p-[0.568rem] box-border gap-[0.456rem] text-teal">
                <img className="w-[1.319rem] h-[1.319rem] relative" alt="" />
                <div className="relative leading-[1.322rem] font-medium">
                  Dormitory
                </div>
              </div>
              <div className="w-[5.344rem] rounded-[10.57px] border-whitesmoke border-solid border-[0.9px] box-border overflow-hidden shrink-0 flex flex-col items-start p-[0.55rem] gap-[0.437rem]">
                <img className="w-[1.319rem] h-[1.319rem] relative" alt="" />
                <div className="relative leading-[1.322rem] font-medium">
                  Transient
                </div>
              </div>
              <div className="rounded-[10.57px] border-whitesmoke border-solid border-[0.9px] overflow-hidden flex flex-col items-start p-[0.55rem] gap-[0.437rem]">
                <img className="w-[1.319rem] h-[1.319rem] relative" alt="" />
                <div className="relative leading-[1.322rem] font-medium">
                  Bed Spacer
                </div>
              </div>
            </div>
            <div className="self-stretch overflow-hidden flex items-start p-[0.55rem] gap-[0.55rem] text-left">
              <div className="flex-1 flex items-center">
                <b className="relative">Pax</b>
              </div>
              <div className="flex items-center gap-[0.55rem] text-teal">
                <img className="w-[1.1rem] relative max-h-full" alt="" />
                <div className="overflow-hidden flex flex-col items-center justify-center py-[0rem] px-[0.218rem]">
                  <b className="self-stretch relative">Any</b>
                </div>
                <img className="w-[1.1rem] relative max-h-full" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start gap-[0.662rem]">
          <div className="w-[16.525rem] h-[1.6rem] flex items-center py-[0.55rem] px-[0rem] box-border">
            <b className="relative shrink-0">Price Range</b>
          </div>
          <img className="w-[25.225rem] h-[0.913rem] relative" alt="" />
          <div className="self-stretch flex items-center justify-center gap-[0.881rem] text-[0.661rem] text-dimgray font-lora">
            <div className="flex-1 flex flex-col items-start py-[0.218rem] px-[0rem] gap-[0.218rem]">
              <div className="self-stretch h-[0.331rem] relative tracking-num-0_02 font-semibold flex items-center shrink-0">
                Min Price
              </div>
              <div className="w-[6.606rem] h-[1.763rem] rounded-[7.05px] border-whitesmoke border-solid border-[0.9px] box-border overflow-hidden shrink-0 flex flex-col items-start p-[0.55rem]" />
            </div>
            <div className="flex-1 flex flex-col items-end justify-center py-[0.218rem] px-[0rem] gap-[0.218rem] text-right">
              <div className="self-stretch h-[0.331rem] relative tracking-num-0_02 font-semibold flex items-center justify-end shrink-0">
                Max Price
              </div>
              <div className="w-[6.606rem] h-[1.763rem] rounded-[7.05px] border-whitesmoke border-solid border-[0.9px] box-border overflow-hidden shrink-0 flex flex-col items-start p-[0.55rem]" />
            </div>
          </div>
        </div>
        <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.55rem] px-[0.218rem] gap-[0.55rem] text-slategray">
          <div className="self-stretch overflow-hidden flex items-start py-[0.55rem] px-[0rem] gap-[0.55rem] text-teal">
            <b className="flex-1 relative shrink-0">Essentials</b>
            <div className="overflow-hidden hidden items-center justify-center py-[0.112rem] px-[0.55rem] gap-[0.437rem] shrink-0 text-[0.661rem]">
              <div className="relative font-medium text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c29722,_#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{`Double ellipse tags are special tags. `}</div>
              <img className="h-[0.881rem] w-[0.881rem] relative" alt="" />
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start gap-[0.881rem] text-[0.661rem] font-lora">
            <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.218rem] px-[0rem]">
              <div className="self-stretch rounded-[10.57px] bg-aliceblue overflow-hidden flex items-center py-[0.662rem] px-[0.881rem] gap-[0.55rem]">
                <img className="w-[0.881rem] relative max-h-full" alt="" />
                <div className="flex-1 relative tracking-num-0_02 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                  Search tags (ex. With Service, With Study Lounge)
                </div>
              </div>
            </div>
            <div className="self-stretch flex items-center flex-wrap content-center gap-[0.55rem] text-teal">
              <div className="rounded-num-88_12 bg-white border-whitesmoke border-solid border-[0.9px] flex items-center justify-center py-[0.331rem] px-[0.55rem] gap-[0.331rem]">
                <img className="h-[0.881rem] w-[0.881rem] relative" alt="" />
                <div className="relative tracking-num-0_02 font-semibold">
                  Wi-Fi
                </div>
              </div>
              <div className="rounded-num-88_12 bg-white border-whitesmoke border-solid border-[0.9px] flex items-center justify-center py-[0.331rem] px-[0.55rem] gap-[0.331rem]">
                <img className="h-[0.881rem] w-[0.881rem] relative" alt="" />
                <div className="relative tracking-num-0_02 font-semibold">
                  With Aircon
                </div>
              </div>
              <div className="rounded-num-88_12 bg-white border-whitesmoke border-solid border-[0.9px] flex items-center justify-center py-[0.331rem] px-[0.55rem] gap-[0.331rem]">
                <img className="h-[0.881rem] w-[0.881rem] relative" alt="" />
                <div className="relative tracking-num-0_02 font-semibold">
                  Bed Mattress
                </div>
              </div>
              <div className="rounded-num-88_12 bg-white border-whitesmoke border-solid border-[0.9px] flex items-center justify-center py-[0.331rem] px-[0.55rem] gap-[0.331rem]">
                <img className="h-[0.881rem] w-[0.881rem] relative" alt="" />
                <div className="relative tracking-num-0_02 font-semibold">
                  Bed Mattress
                </div>
              </div>
              <div className="rounded-num-88_12 bg-white border-whitesmoke border-solid border-[0.9px] flex items-center justify-center py-[0.331rem] px-[0.55rem] gap-[0.331rem] text-dimgray">
                <div className="h-[0.881rem] w-[0.881rem] relative rounded-num-50 bg-gainsboro" />
                <div className="relative tracking-num-0_02 font-semibold">
                  With CCTV/Security
                </div>
              </div>
              <div className="rounded-num-88_12 bg-white border-whitesmoke border-solid border-[0.9px] flex items-center justify-center py-[0.331rem] px-[0.55rem] gap-[0.331rem] text-dimgray">
                <div className="h-[0.881rem] w-[0.881rem] relative rounded-num-50 bg-gainsboro" />
                <div className="relative tracking-num-0_02 font-semibold">
                  Own CR
                </div>
              </div>
              <div className="rounded-num-88_12 bg-white border-whitesmoke border-solid border-[0.9px] flex items-center justify-center py-[0.331rem] px-[0.55rem] gap-[0.331rem] text-dimgray">
                <div className="h-[0.881rem] w-[0.881rem] relative rounded-num-50 bg-gainsboro" />
                <div className="relative tracking-num-0_02 font-semibold">
                  Appliances Allowed
                </div>
              </div>
            </div>
            <div className="self-stretch flex items-start flex-wrap content-start gap-[0.55rem] text-dimgray">
              <div className="rounded-num-88_12 border-whitesmoke border-solid border-[0.9px] flex items-center justify-center p-[0.218rem]">
                <div className="rounded-num-88_12 border-whitesmoke border-solid border-[0.9px] flex items-center py-[0.331rem] px-[0.55rem] gap-[0.331rem]">
                  <div className="h-[0.881rem] w-[0.881rem] relative rounded-num-50 bg-gainsboro" />
                  <div className="relative tracking-num-0_02 font-semibold">
                    Visitors
                  </div>
                </div>
              </div>
              <div className="rounded-num-88_12 border-whitesmoke border-solid border-[0.9px] flex items-center justify-center p-[0.218rem]">
                <div className="rounded-num-88_12 border-whitesmoke border-solid border-[0.9px] flex items-center py-[0.331rem] px-[0.55rem] gap-[0.331rem]">
                  <div className="h-[0.881rem] w-[0.881rem] relative rounded-num-50 bg-gainsboro" />
                  <div className="relative tracking-num-0_02 font-semibold">
                    Cooking
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex items-center py-[0.55rem] px-[0rem]">
            <div className="flex items-center justify-center">
              <b className="relative">Show More...</b>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-center relative isolate gap-[0.55rem]">
          <div className="self-stretch h-[1.6rem] flex items-center pt-[0.55rem] px-[0rem] pb-[0.275rem] box-border z-[0]">
            <b className="self-stretch w-[9.475rem] relative flex items-center shrink-0">
              Distance from Campus
            </b>
          </div>
          <img
            className="self-stretch h-[13.794rem] max-w-full overflow-hidden shrink-0 object-cover z-[1]"
            alt=""
          />
          <img className="w-[25.225rem] h-[0.913rem] relative z-[2]" alt="" />
          <div className="self-stretch flex items-center justify-between py-[0rem] px-[0.881rem] gap-[1.25rem] z-[3] text-dimgray">
            <b className="relative">Kilometers</b>
            <div className="rounded-[7.05px] border-darkslategray-100 border-solid border-[0.9px] flex flex-col items-start py-[0.218rem] pl-[2.643rem] pr-[0.437rem] gap-[0.881rem]">
              <img className="w-[0.55rem] h-[0.275rem] relative" alt="" />
              <img
                className="w-[0.55rem] h-[0.275rem] relative object-contain"
                alt=""
              />
            </div>
          </div>
          <div className="w-[6.775rem] h-[6.719rem] absolute !!m-[0 important] top-[5.698rem] left-[9.473rem] rounded-num-50 bg-lightcyan-200 border-darkslategray-200 border-solid border-[0.9px] box-border z-[4]" />
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex items-center justify-center p-[0.55rem]">
        <div className="flex-1 rounded-[14.1px] bg-lightcyan-100 flex items-center justify-center py-[0.662rem] px-[0.881rem] box-border max-w-full">
          <b className="relative">Apply</b>
        </div>
      </div>
    </div>
  );
};

export default Filter;
