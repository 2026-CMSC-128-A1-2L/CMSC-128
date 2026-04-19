import type { FunctionComponent } from 'react';

const DmsLanding: FunctionComponent = () => {
  return (
    <div className="w-full relative overflow-hidden flex flex-col items-start isolate gap-[0.625rem] text-left text-[1rem] text-slategray font-inter">
      <img
        className="w-[90rem] h-[74.5rem] absolute !!m-[0 important] top-[0rem] left-[0rem] z-[0] shrink-0"
        alt=""
      />
      <div className="w-[90rem] h-[64rem] overflow-hidden shrink-0 flex items-start gap-[2rem] z-[1]">
        <div className="h-[57.75rem] w-[12.5rem] rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-none bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center">
          <div className="w-[12.5rem] h-[57.75rem] bg-white overflow-hidden shrink-0 flex flex-col items-start py-[3.75rem] px-[0.625rem] box-border gap-[0.625rem]">
            <div className="self-stretch flex flex-col items-start gap-[1.875rem]">
              <div className="self-stretch flex items-center gap-[0.75rem] text-[0.875rem]">
                <img className="w-[1rem] relative max-h-full" alt="" />
                <div className="flex-1 rounded-num-12 bg-aliceblue flex items-center p-[0.5rem]">
                  <div className="relative font-medium">Search messages</div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-[0.75rem] font-lora">
                <div className="self-stretch flex items-end py-[0.75rem] px-[1.375rem] font-inter">
                  <b className="self-stretch flex-1 relative flex text-transparent !bg-clip-text [background:rgba(0,_0,_0,_0.2),_#001d18] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center">
                    System
                  </b>
                </div>
                <div className="w-[11.25rem] flex flex-col items-start gap-[0.625rem] text-right text-[0.5rem]">
                  <div className="w-[11.25rem] rounded-num-12 bg-white border-whitesmoke-100 border-solid border-[1px] box-border flex items-start pt-[0.5rem] px-[0.75rem] pb-[1rem] gap-[0.5rem]">
                    <div className="self-stretch flex items-center">
                      <img className="w-[0.313rem] relative max-h-full" alt="" />
                    </div>
                    <div className="flex-1 flex flex-col items-start gap-[0.125rem]">
                      <div className="self-stretch overflow-hidden flex items-start justify-end">
                        <div className="flex-1 relative tracking-num-0_04 font-semibold">
                          2m ago
                        </div>
                      </div>
                      <div className="self-stretch flex items-start gap-[0.25rem] text-left text-[0.813rem] text-darkslategray font-inter">
                        <div className="self-stretch overflow-hidden flex items-start py-[0.25rem] px-[0.187rem]">
                          <img className="h-[0.831rem] w-[0.669rem] relative" alt="" />
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
                  <div className="w-[11.25rem] rounded-num-12 bg-white border-whitesmoke-100 border-solid border-[1px] box-border flex items-start pt-[0.5rem] px-[0.75rem] pb-[1rem]">
                    <div className="flex-1 flex flex-col items-start gap-[0.125rem]">
                      <div className="self-stretch overflow-hidden flex items-start justify-end">
                        <div className="flex-1 relative tracking-num-0_04 font-semibold">
                          1d ago
                        </div>
                      </div>
                      <div className="self-stretch flex items-start gap-[0.25rem] text-left text-[0.813rem] text-darkslategray font-inter">
                        <div className="self-stretch overflow-hidden flex items-start py-[0.25rem] px-[0.187rem]">
                          <img className="h-[0.831rem] w-[0.669rem] relative" alt="" />
                        </div>
                        <div className="flex-1 flex flex-col items-start gap-[0.25rem]">
                          <div className="self-stretch flex items-center">
                            <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
                              Welcome to ATLAS!
                            </b>
                          </div>
                          <div className="self-stretch relative text-[0.625rem] tracking-[0.02em] font-semibold font-lora text-dimgray [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                            Hi Daphne! Welcome to ATLAS! We’re making your home-finding journey
                            easier
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex items-center justify-center gap-[0.75rem] text-center text-[0.75rem] text-black">
                  <div className="relative tracking-num-0_04 font-semibold">View All</div>
                  <img className="w-[0.425rem] relative max-h-full" alt="" />
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-[1.5rem] text-white">
                <div className="self-stretch flex flex-col items-start gap-[0.625rem]">
                  <div className="self-stretch flex items-center py-[0.625rem] px-[1.375rem]">
                    <b className="relative text-transparent !bg-clip-text [background:rgba(0,_0,_0,_0.2),_#001d18] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                      Direct Messages
                    </b>
                  </div>
                  <div className="self-stretch flex items-center py-[0rem] px-[2.25rem] gap-[0.5rem] text-[0.75rem]">
                    <div className="h-[2rem] rounded-[100px] bg-gray flex items-center justify-center py-[0.25rem] px-[0.75rem] box-border shrink-0">
                      <b className="relative">All</b>
                    </div>
                    <div className="h-[2rem] w-[5rem] rounded-[100px] bg-lightcyan flex items-center justify-center py-[0.5rem] px-[0.75rem] box-border shrink-0 text-teal">
                      <b className="relative whitespace-pre-wrap">Unread 1</b>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[0.625rem] text-right text-[0.5rem] text-slategray font-lora">
                  <div className="w-[11.25rem] rounded-num-12 bg-white border-whitesmoke-100 border-solid border-[1px] box-border flex items-start pt-[0.5rem] px-[0.75rem] pb-[1rem] gap-[0.5rem]">
                    <div className="self-stretch flex items-center">
                      <img className="w-[0.313rem] relative max-h-full" alt="" />
                    </div>
                    <div className="flex-1 flex flex-col items-start gap-[0.125rem]">
                      <div className="self-stretch overflow-hidden flex items-start justify-end">
                        <div className="flex-1 relative tracking-num-0_04 font-semibold">
                          2m ago
                        </div>
                      </div>
                      <div className="self-stretch flex items-start gap-[0.25rem] text-left text-[0.813rem] text-darkslategray font-inter">
                        <div className="self-stretch overflow-hidden flex items-start py-[0.25rem] px-[0.187rem]">
                          <img className="h-[0.831rem] w-[0.669rem] relative" alt="" />
                        </div>
                        <div className="flex-1 flex flex-col items-start gap-[0.25rem]">
                          <div className="self-stretch flex items-center">
                            <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
                              Three Sapphire Place
                            </b>
                          </div>
                          <div className="self-stretch relative text-[0.625rem] tracking-[0.02em] font-semibold font-lora text-dimgray [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                            Hi Daphne! Your application is being reviewed by our dorm manager. This
                            process might take 48-72 hours. Thank you for your patience.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[11.25rem] rounded-num-12 bg-white border-whitesmoke-100 border-solid border-[1px] box-border flex items-start pt-[0.5rem] px-[0.75rem] pb-[1rem]">
                    <div className="flex-1 flex flex-col items-start gap-[0.125rem]">
                      <div className="self-stretch overflow-hidden flex items-start justify-end">
                        <div className="flex-1 relative tracking-num-0_04 font-semibold">
                          12m ago
                        </div>
                      </div>
                      <div className="self-stretch flex items-start gap-[0.25rem] text-left text-[0.813rem] text-darkslategray font-inter">
                        <div className="self-stretch overflow-hidden flex items-start py-[0.25rem] px-[0.187rem]">
                          <img className="h-[0.831rem] w-[0.669rem] relative" alt="" />
                        </div>
                        <div className="flex-1 flex flex-col items-start gap-[0.25rem]">
                          <div className="self-stretch flex items-center">
                            <b className="flex-1 relative overflow-hidden text-ellipsis whitespace-nowrap">
                              Women’s Dormitory
                            </b>
                          </div>
                          <div className="self-stretch relative text-[0.625rem] tracking-[0.02em] font-semibold font-lora text-dimgray [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                            Hi Daphne! Your application is being reviewed by our dorm manager. This
                            process might take 48-72 hours. Thank you for your patience.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex-1 overflow-hidden flex items-end justify-center p-[0.625rem] text-center text-[0.75rem] text-black font-lora">
              <div className="flex items-center justify-center gap-[0.75rem]">
                <div className="relative tracking-num-0_04 font-semibold">
                  View Archived
                  <br />
                  Messages
                </div>
                <img className="w-[0.425rem] relative max-h-full" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[57.75rem] flex-1 overflow-hidden flex flex-col items-start pt-[4rem] pb-[0rem] pl-[0rem] pr-[5rem] box-border text-[1.5rem] text-teal">
          <div className="self-stretch flex-1 rounded-2xl overflow-hidden flex items-start p-[0.625rem]">
            <div className="self-stretch flex-1 overflow-hidden flex flex-col items-center justify-center p-[0.625rem] gap-[0.625rem]">
              <img
                className="w-[22.563rem] relative max-h-full object-cover hidden shrink-0"
                alt=""
              />
              <img className="w-[23.75rem] relative max-h-full object-cover shrink-0" alt="" />
              <div className="flex flex-col items-center gap-[0.25rem] shrink-0">
                <b className="relative leading-[2rem]">No conversation selected</b>
                <div className="relative text-[0.875rem] leading-[2rem] font-medium text-dimgray">
                  Select a tab to view specific message
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="w-[3.563rem] h-[3.563rem] absolute !!m-[0 important] top-[56.625rem] left-[80.938rem] z-[2] shrink-0"
        alt=""
      />
    </div>
  );
};

export default DmsLanding;
