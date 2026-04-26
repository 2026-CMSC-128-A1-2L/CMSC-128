import { type FunctionComponent, useCallback } from 'react';

export type CalendarPopoutType = {
  className?: string;
};

const CalendarPopout: FunctionComponent<CalendarPopoutType> = ({ className = '' }) => {
  const onStatusContainerClick = useCallback(() => {}, []);

  return (
    <div
      className={`w-[687px] relative rounded-num-10 bg-white flex flex-col items-center justify-center py-6 px-0 box-border gap-3 max-w-full max-h-full overflow-auto text-center text-num-14 text-dimgray font-inter ${className}`}
    >
      <div className="self-stretch flex flex-col items-start gap-2">
        <div className="self-stretch h-[103px] flex flex-col items-center justify-center gap-1">
          <div className="self-stretch flex items-center justify-center">
            <b className="relative">Booking a visit for</b>
          </div>
          <div className="self-stretch flex flex-col items-center justify-center gap-1 text-num-24 text-darkslategray-200">
            <b className="relative leading-num-32">Two Sapphire Place</b>
            <div className="w-[299px] relative text-num-12 tracking-num-0_02 font-semibold font-lora text-black flex items-center justify-center">
              Sapphire Street, Umali Subdivision, Batong Malake, Los Banos, Laguna
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start py-0 px-12">
          <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-300 overflow-hidden shrink-0 flex items-start pt-2.5 px-12 pb-0 box-border" />
        </div>
      </div>
      <div className="self-stretch flex items-start justify-center py-0 px-[50px] text-num-18 text-black">
        <div className="w-[324px] flex flex-col items-start gap-2.5">
          <b className="relative tracking-num--0_01">Your booking details</b>
          <div className="w-[298px] flex flex-col items-start text-num-14 text-dimgray">
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-col items-start gap-[5px]">
                <b className="relative">First name</b>
                <div className="w-[297px] h-[39px] relative text-left text-gray-400">
                  <div className="absolute h-[761.54%] w-[13.13%] top-[100%] right-[86.87%] bottom-[-761.54%] left-[0%] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-num-16 bg-white [transform:_rotate(-90deg)] [transform-origin:0_0]" />
                  <div className="absolute h-[88.72%] w-[95.89%] top-[6.34%] left-[2.43%] leading-6 font-medium flex items-center">
                    First name
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-[5px]">
                <b className="relative">Last name</b>
                <div className="w-[297px] h-[39px] relative text-left text-gray-400">
                  <div className="absolute h-[761.54%] w-[13.13%] top-[100%] right-[86.87%] bottom-[-761.54%] left-[0%] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-num-16 bg-white [transform:_rotate(-90deg)] [transform-origin:0_0]" />
                  <div className="absolute h-[88.72%] w-[95.89%] top-[6.34%] left-[2.43%] leading-6 font-medium flex items-center">
                    Last name
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-[5px]">
                <b className="relative">Email address</b>
                <div className="w-[297px] h-[39px] relative text-left text-gray-400">
                  <div className="absolute h-[761.54%] w-[13.13%] top-[100%] right-[86.87%] bottom-[-761.54%] left-[0%] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-num-16 bg-white [transform:_rotate(-90deg)] [transform-origin:0_0]" />
                  <div className="absolute h-[88.72%] w-[95.89%] top-[6.34%] left-[2.43%] leading-6 font-medium flex items-center">
                    Email addr.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[221px] flex flex-col items-start justify-center gap-[15px] text-left">
          <b className="self-stretch relative tracking-num--0_01">Date and Time</b>
          <div className="flex flex-col items-center gap-[7px] text-center text-num-8_36 text-gray-100 font-geist">
            <div className="w-[221.6px] h-[215px] relative rounded-[11.15px] bg-white border-gainsboro border-solid border-[0.7px] box-border">
              <div className="absolute top-[36.24px] left-[11.15px] flex flex-col items-center pt-num-11_1 px-0 pb-0">
                <div className="self-stretch flex items-center justify-center gap-[0.7px]">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative leading-num-13_94">Su</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative leading-num-13_94">Mo</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative leading-num-13_94">Tu</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative leading-num-13_94">We</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative leading-num-13_94">Th</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative leading-num-13_94">Fr</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative leading-num-13_94">Sa</div>
                  </div>
                </div>
                <div className="flex flex-col items-center isolate gap-[0.7px] text-num-11_15 text-black">
                  <div className="flex items-center gap-[0.7px] z-[4] text-gray-200">
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-num-16_83 hidden shrink-0">1</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-num-16_83 hidden shrink-0">1</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-num-16_83 hidden shrink-0">1</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border text-black">
                      <div className="relative leading-num-16_83 shrink-0">1</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border text-black">
                      <div className="relative leading-num-16_83 shrink-0">2</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 bg-lightcyan flex items-center justify-center p-num-11_1 box-border text-teal-200 font-inter">
                      <b className="relative leading-[140%] shrink-0">3</b>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border text-black">
                      <div className="relative leading-num-16_83 shrink-0">4</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[0.7px] z-[3]">
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border opacity-num-0_3">
                      <div className="relative leading-[140%] shrink-0">5</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">6</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">7</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">8</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">9</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">10</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">11</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[0.7px] z-[2]">
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] opacity-num-0_3 shrink-0">12</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">13</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">14</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">15</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">16</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">17</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">18</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[0.7px] z-[1]">
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] opacity-num-0_3 shrink-0">19</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">20</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">21</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">22</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">23</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">24</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">25</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[0.7px] z-[0]">
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] opacity-num-0_3 shrink-0">26</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">27</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">28</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">29</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border">
                      <div className="relative leading-[140%] shrink-0">30</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border text-gray-200">
                      <div className="relative leading-[140%] hidden shrink-0">24</div>
                    </div>
                    <div className="h-num-27_9 w-num-27_9 rounded-num-5_57 flex items-center justify-center p-num-11_1 box-border text-gray-200">
                      <div className="relative leading-[140%] hidden shrink-0">25</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[calc(100%_-_22.3px)] top-[11.15px] right-[11.15px] left-[11.15px] h-[25.1px] flex items-center gap-[11.1px] text-left text-num-11_15 text-black font-inter">
                <img className="h-[25.1px] w-[25.1px] rounded-[22.3px]" alt="" />
                <div className="flex-1 flex items-start isolate gap-[5.6px]">
                  <div className="flex-1 flex flex-col items-start z-[1]">
                    <div className="self-stretch rounded-num-5_57 bg-white border-gainsboro border-solid border-[0.7px] flex items-center p-[4.2px] relative isolate gap-[5.6px]">
                      <div className="flex-1 relative leading-[100%] z-[0] shrink-0">Apr</div>
                      <img className="h-[11.1px] w-[11.1px] relative z-[1] shrink-0" alt="" />
                      <div className="!!m-[0 important] absolute top-[5.58px] left-[5.57px] shadow-[0px_1px_4px_rgba(12,_12,_13,_0.1),_0px_1px_4px_rgba(12,_12,_13,_0.05)] rounded-num-5_57 bg-white border-gainsboro border-solid border-[0.7px] hidden flex-col items-center p-[5.6px] gap-[5.6px] z-[2] shrink-0 text-gray-200">
                        <div className="relative leading-[140%]">January</div>
                        <div className="relative leading-[140%]">February</div>
                        <div className="relative leading-[140%]">March</div>
                        <div className="relative leading-[140%]">April</div>
                        <div className="relative leading-[140%]">May</div>
                        <div className="relative leading-[140%]">June</div>
                        <div className="relative leading-[140%]">July</div>
                        <div className="relative leading-[140%]">August</div>
                        <div className="relative leading-[140%] font-semibold">September</div>
                        <div className="relative leading-[140%]">October</div>
                        <div className="relative leading-[140%]">November</div>
                        <div className="relative leading-[140%]">December</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-start z-[0]">
                    <div className="self-stretch rounded-num-5_57 bg-white border-gainsboro border-solid border-[0.7px] flex items-center p-[4.2px] relative isolate gap-[5.6px]">
                      <div className="flex-1 relative leading-[100%] z-[0] shrink-0">2026</div>
                      <img className="h-[11.1px] w-[11.1px] relative z-[1] shrink-0" alt="" />
                      <div className="!!m-[0 important] absolute top-[5.58px] left-[5.58px] shadow-[0px_1px_4px_rgba(12,_12,_13,_0.1),_0px_1px_4px_rgba(12,_12,_13,_0.05)] rounded-num-5_57 bg-white border-gainsboro border-solid border-[0.7px] hidden flex-col items-start p-[5.6px] gap-[5.6px] z-[2] shrink-0 text-gray-200">
                        <div className="relative leading-[140%]">2026</div>
                        <div className="relative leading-[140%] font-semibold">2025</div>
                        <div className="relative leading-[140%]">2024</div>
                        <div className="relative leading-[140%]">2023</div>
                        <div className="relative leading-[140%]">2022</div>
                        <div className="relative leading-[140%]">2021</div>
                        <div className="relative leading-[140%]">2020</div>
                        <div className="relative leading-[140%]">2019</div>
                        <div className="relative leading-[140%]">2018</div>
                        <div className="relative leading-[140%]">2017</div>
                        <div className="relative leading-[140%]">2016</div>
                        <div className="relative leading-[140%]">2015</div>
                        <div className="relative leading-[140%]">2014</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img className="h-[25.1px] w-[25.1px] rounded-[22.3px]" alt="" />
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-left text-[12.25px] text-dimgray font-lora">
              <img className="h-6 w-6" alt="" />
              <div className="flex flex-col items-start">
                <div className="w-[108px] h-num-37 relative">
                  <div className="absolute top-[0px] left-[0px] rounded-[7.66px] bg-white border-whitesmoke-300 border-solid border-[0.8px] box-border w-[108px] h-[36.8px]" />
                  <img
                    className="absolute w-[9.44%] top-[calc(50%_-_2.16px)] right-[5.89%] left-[84.67%] max-w-full overflow-hidden h-[4.1px]"
                    alt=""
                  />
                  <div className="absolute top-[0px] left-[5.29px] font-medium flex items-center w-[80.7px] h-num-37">
                    9 am - 10 am
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex items-center justify-center gap-[43px] text-teal-200">
        <div className="h-8 w-[67px] rounded-num-16 flex items-center justify-center py-0 px-4 box-border">
          <div className="h-8 w-[67px] rounded-num-16 flex items-center justify-center py-0 px-4 box-border shrink-0">
            <div className="relative font-medium text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] shrink-0">
              Cancel
            </div>
          </div>
        </div>
        <div
          className="h-8 rounded-num-16 bg-aliceblue flex items-center justify-center py-0 px-4 box-border cursor-pointer"
          onClick={onStatusContainerClick}
        >
          <b className="relative">Book</b>
        </div>
      </div>
    </div>
  );
};

export default CalendarPopout;
