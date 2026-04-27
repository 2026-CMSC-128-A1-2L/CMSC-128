import type { FunctionComponent } from 'react';

const AboutDetails: FunctionComponent = () => {
  return (
    <div className="w-full relative flex flex-col items-start gap-[29px] text-left text-[24px] text-gray font-inter">
      <div className="self-stretch flex items-center py-num-0 pl-num-20 pr-[17px] text-[14px] font-lora">
        <div className="w-[793px] relative font-medium inline-block shrink-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          <br />
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start text-black">
        <div className="self-stretch flex items-center py-2.5 px-num-20">
          <b className="relative leading-8">Unit Details</b>
        </div>
        <div className="self-stretch flex flex-col items-start justify-center py-num-0 px-num-20 gap-3 text-num-12 text-darkslategray-100 font-lora">
          <div className="self-stretch h-16 flex items-center gap-3">
            <div className="h-[76px] w-64 relative shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <div className="absolute h-[26.32%] w-[48.59%] top-[15.79%] left-[4%] tracking-num-0_02 font-semibold flex items-center">
                ROOM TYPE
              </div>
              <b className="absolute h-[26.32%] w-[78.59%] top-[42.11%] left-[4%] text-num-18 tracking-num--0_01 flex font-inter text-gray items-center">
                Transient
              </b>
            </div>
            <div className="h-[76px] w-64 relative shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <div className="absolute h-[26.32%] w-[48.59%] top-[15.79%] left-[4%] tracking-num-0_02 font-semibold flex items-center">
                FLOOR AREA
              </div>
              <b className="absolute h-[26.32%] w-[78.59%] top-[42.11%] left-[4%] text-num-18 tracking-num--0_01 flex font-inter text-gray items-center">
                18 sqm
              </b>
            </div>
            <div className="h-[76px] w-64 relative shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <div className="absolute h-[26.32%] w-[48.59%] top-[15.79%] left-[4%] tracking-num-0_02 font-semibold flex items-center">
                FLOOR LEVELS
              </div>
              <b className="absolute h-[26.32%] w-[78.59%] top-[42.11%] left-[4%] text-num-18 tracking-num--0_01 flex font-inter text-gray items-center">
                2 Floors
              </b>
            </div>
          </div>
          <div className="self-stretch h-16 flex items-center gap-3">
            <div className="h-[76px] w-64 relative shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <div className="absolute h-[26.32%] w-[48.59%] top-[15.79%] left-[4%] tracking-num-0_02 font-semibold flex items-center">
                MAX OCCUPANCY
              </div>
              <b className="absolute h-[26.32%] w-[78.59%] top-[42.11%] left-[4%] text-num-18 tracking-num--0_01 flex font-inter text-gray items-center">
                4 Person
              </b>
            </div>
            <div className="h-[76px] w-64 relative shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <div className="absolute h-[26.32%] w-[48.59%] top-[15.79%] left-[4%] tracking-num-0_02 font-semibold flex items-center">
                BATHROOM
              </div>
              <b className="absolute h-[26.32%] w-[78.59%] top-[42.11%] left-[4%] text-num-18 tracking-num--0_01 flex font-inter text-gray items-center">
                Shared (Floor)
              </b>
            </div>
            <div className="h-[76px] w-64 relative shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <div className="absolute h-[26.32%] w-[48.59%] top-[15.79%] left-[4%] tracking-num-0_02 font-semibold flex items-center">
                FURNISHING
              </div>
              <b className="absolute h-[26.32%] w-[78.59%] top-[42.11%] left-[4%] text-num-18 tracking-num--0_01 flex font-inter text-gray items-center">
                Semi-Furnished
              </b>
            </div>
          </div>
          <div className="self-stretch h-16 flex items-center gap-3">
            <div className="h-[76px] w-64 relative shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <div className="absolute h-[26.32%] w-[48.59%] top-[15.79%] left-[4%] tracking-num-0_02 font-semibold flex items-center">
                GENDER POLICY
              </div>
              <b className="absolute h-[26.32%] w-[78.59%] top-[42.11%] left-[4%] text-num-18 tracking-num--0_01 flex font-inter text-gray items-center">
                Female Only
              </b>
            </div>
            <div className="h-[76px] w-64 relative shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <div className="absolute h-[26.32%] w-[48.59%] top-[15.79%] left-[4%] tracking-num-0_02 font-semibold flex items-center">
                LEASE TERM
              </div>
              <b className="absolute h-[26.32%] w-[78.59%] top-[42.11%] left-[4%] text-num-18 tracking-num--0_01 flex font-inter text-gray items-center">
                Min. 6 months
              </b>
            </div>
            <div className="h-[76px] w-64 relative shrink-0">
              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white border-whitesmoke border-solid border-[1px] box-border" />
              <div className="absolute h-[26.32%] w-[48.59%] top-[15.79%] left-[4%] tracking-num-0_02 font-semibold flex items-center">
                MOVE-IN DATE
              </div>
              <b className="absolute h-[26.32%] w-[78.59%] top-[42.11%] left-[4%] text-num-18 tracking-num--0_01 flex font-inter text-gray items-center">
                Min. 6 months
              </b>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-end gap-[11px] text-black">
        <div className="self-stretch flex items-center py-num-0 px-num-20">
          <b className="relative leading-8">What’s Included?</b>
        </div>
        <div className="self-stretch h-12 flex items-center py-num-0 px-num-20 box-border gap-3 text-center text-num-16 text-darkslategray-200 font-lora">
          <div className="h-12 w-[132px] relative">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-lightcyan border-teal-200 border-solid border-[1px] box-border" />
            <div className="absolute h-[56.25%] w-[92.5%] top-[20.83%] left-[3.76%] font-medium flex items-center justify-center">
              Wi-Fi
            </div>
          </div>
          <div className="h-12 w-40 relative bg-white">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-lightcyan border-teal-200 border-solid border-[1px] box-border" />
            <div className="absolute h-[56.25%] w-[92.5%] top-[20.83%] left-[3.76%] font-medium flex items-center justify-center">
              Water (shared)
            </div>
          </div>
          <div className="h-12 w-40 relative bg-white">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-lightcyan border-teal-200 border-solid border-[1px] box-border" />
            <div className="absolute h-[56.25%] w-[92.5%] top-[20.83%] left-[3.76%] font-medium flex items-center justify-center">
              Trash Collection
            </div>
          </div>
          <div className="h-12 w-32 relative text-silver">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 border-silver border-solid border-[1px] box-border" />
            <div className="absolute h-[56.25%] w-[81.17%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
              Electricity
            </div>
          </div>
          <div className="h-12 w-[120px] relative text-silver">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 border-silver border-solid border-[1px] box-border" />
            <div className="absolute h-[56.25%] w-[81.17%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
              Laundry
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDetails;
