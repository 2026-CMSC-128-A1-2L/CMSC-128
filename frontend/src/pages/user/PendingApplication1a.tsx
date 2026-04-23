import { FunctionComponent, useCallback } from 'react';
import { Icon } from '@iconify/react';
import Photo from '../../assets/photo.svg';
import Sidebar from '../../components/SideBar';
import Footer from '../../components/Footer';

const PendingApplication1a: FunctionComponent = () => {
  const onVERIFICATIONSTATUSContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      <img
        className="w-[1440px] h-[1024px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]"
        alt=""
      />
      <div className="w-[1440px] h-[1312px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-num-0 pl-num-0 pr-20">
          <div className="w-[1440px] flex-1 flex items-center shrink-0 pr-20 gap-8">
            <div className="self-stretch w-[200px] flex items-start">
              <Sidebar></Sidebar>
            </div>

            <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-between gap-0">
              <div className="w-full h-fit flex flex-col items-start">
                <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                  <div className="h-6 flex items-center gap-1.5">
                    <div className="relative font-semibold">User Profile</div>
                    <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                    <div className="relative font-semibold">Current Dorm</div>
                  </div>
                </div>
                <div className="w-full h-fit rounded-num-16 bg-white/45 flex flex-col items-start gap-[12.3px] shrink-0 text-center text-dimgray font-inter">
                  <div className="w-full h-fit rounded-2xl flex flex-col items-start gap-3">
                    <div className="w-full rounded-2xl flex items-start p-num-32">
                      <div className="w-full flex flex-col items-start gap-2.5">
                        <b className="relative">Student Profile</b>
                        <b className="relative text-[24px] leading-8 text-darkslategray-200">
                          Daphne Dayne
                        </b>
                        <b className="relative text-teal">dcanape@up.edu.ph</b>
                      </div>
                    </div>
                    <div className="self-stretch overflow-hidden flex items-start justify-between py-1 px-num-32 gap-5">
                      <img
                        className="w-[200px] relative max-h-full object-cover"
                        alt=""
                        src={Photo}
                      />
                      <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                        <div className="flex flex-col items-start gap-1">
                          <b className="relative">Name</b>
                          <b className="relative text-black">CANAPE, DAPHNE</b>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <div className="flex items-start gap-2">
                            <b className="relative">Contact number</b>
                            <Icon icon="iconamoon:edit" className="w-5 relative max-h-full" />
                          </div>
                          <b className="relative text-black">- - - - -</b>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <div className="flex items-start gap-2">
                            <b className="relative">Home Address</b>
                            <Icon icon="iconamoon:edit" className="w-5 relative max-h-full" />
                          </div>
                          <b className="relative text-black">{`- - - - - `}</b>
                        </div>
                      </div>
                      <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                        <div className="flex flex-col items-start gap-1">
                          <b className="relative">{`User Role `}</b>
                          <b className="relative text-black">Tenant</b>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <b className="relative">Student Number</b>
                          <b className="relative text-black">2023*****</b>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <b className="relative">Verification Status</b>
                          <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                            Verified
                          </b>
                        </div>
                      </div>
                      <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                        <div className="flex flex-col items-start gap-1">
                          <b className="relative">Current Dorm</b>
                          <b className="relative text-black">- - - - -</b>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <b className="relative">Rent Fee</b>
                          <div className="self-stretch flex items-center text-black">
                            <b className="relative">- - - - -</b>
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <b className="relative">Contract Duration</b>
                          <b className="relative text-black">- - - - -</b>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start gap-[49.1px] text-num-14_34 text-white">
                    <div className="self-stretch flex flex-col items-start">
                      <div className="self-stretch flex flex-col items-center justify-center">
                        <div className="w-[532.4px] h-[49.1px] relative">
                          <div className="absolute h-[99.59%] w-[99.87%] top-[0%] right-[-0.25%] bottom-[0.41%] left-[0.38%] rounded-[102.11px] bg-white flex items-center justify-center p-[4.1px] box-border gap-[4.1px] shrink-0">
                            <div className="h-[40.8px] w-[241px] rounded-[102.11px] bg-darkslategray-200 flex items-center justify-center p-[4.1px] box-border">
                              <div className="relative font-semibold">CURRENT DORM</div>
                            </div>
                            <div
                              className="h-[40.8px] w-[241px] rounded-[102.11px] flex items-center justify-center py-[11.2px] px-[76.6px] box-border cursor-pointer text-slategray"
                              onClick={onVERIFICATIONSTATUSContainerClick}
                            >
                              <div className="relative font-semibold shrink-0">
                                VERIFICATION STATUS
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start text-[24.57px] text-darkslategray-100">
                      <div className="self-stretch flex items-center py-num-0 px-[32.8px]">
                        <div className="flex-1 flex items-center gap-[24.6px]">
                          <b className="relative text-num-18">Your Pending Applications</b>
                          <b className="relative text-num-18 text-dimgray">
                            0 out of 5 Dorm Applications
                          </b>
                        </div>
                      </div>
                      <div className="self-stretch rounded-num-16_38 overflow-hidden flex flex-col items-start py-[24.6px] px-[32.8px] text-num-14_34 text-white">
                        <div className="rounded-num-16 border-whitesmoke border-solid overflow-hidden w-full rounded-num-16_38 border-solid border-[1px] flex flex-col items-start">
                          <div className="w-full h-12 bg-darkslategray-200 border-black border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start justify-center py-num-0 px-[24.6px]">
                            <div className="w-full flex justify-between py-[4.1px] px-num-0 box-border ">
                              <div className="text-num-16 w-20 relative font-medium flex items-center justify-center shrink-0">
                                <b>No.</b>
                              </div>
                              <div className="text-num-16 w-55 relative font-medium flex items-center justify-center shrink-0">
                                <b>Listing</b>
                              </div>
                              <div className="text-num-16 w-60 relative font-medium flex items-center justify-center shrink-0">
                                <b>Address</b>
                              </div>
                              <div className="text-num-16 w-30 relative font-medium flex items-center justify-center shrink-0">
                                <b>Status</b>
                              </div>
                              <div className="text-num-16 w-51 relative font-medium flex items-center justify-center shrink-0">
                                <b>Actions</b>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch h-20 rounded-num-16_38 overflow-hidden shrink-0 flex flex-col items-center justify-center py-num-0 px-[24.6px] box-border text-[18.55px] text-teal">
                            <div className="w-full overflow-hidden flex items-center justify-center py-1 box-border text-num-18">
                              <b
                                className="relative cursor-pointer"
                                onClick={onVERIFICATIONSTATUSContainerClick}
                              >
                                Browse Listings
                              </b>
                              <Icon
                                icon="mdi:arrow-top-right"
                                className="w-[31.8px] relative max-h-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApplication1a;
