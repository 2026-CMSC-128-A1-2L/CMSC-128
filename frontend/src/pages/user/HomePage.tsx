import { FunctionComponent, useCallback } from 'react';
import { Icon } from '@iconify/react';
import SideBar from '../../components/SideBar';
import DormCard from '../../components/DormCard';
import Footer from '../../components/Footer';

const HomePage: FunctionComponent = () => {
  const onViewMoreContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className="w-full flex items-start text-left text-[0.875rem] text-dimgray font-inter gap-8">
      <div className="sticky top-0 h-screen w-fit flex-shrink-0">
        <SideBar></SideBar>
      </div>
      {/* right frame */}
      <div className="w-full h-fit flex items-start pt-15 pr-20 pb-20">
        {/* right frame content */}
        <div className="h-fit w-full flex flex-col items-start gap-80">
          <div className="w-full flex flex-col items-start">
            {/* search bar container */}
            <div className="w-full h-full overflow-hidden flex items-center pb-6 box-border">
              {/* search bar */}
              <div className="w-full rounded-num-12 bg-aliceblue overflow-hidden shrink-0 flex items-center py-3 pl-3 pr-6 box-border gap-2">
                <Icon icon="ic:outline-search" className="w-5 h-5"></Icon>
                <b className="relative">
                  Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
                </b>
              </div>
            </div>

            <div className="w-full flex flex-col items-start gap-6 text-[1.5rem] text-gray">
              {/* greeting/filter button*/}
              <div className="w-full flex items-center justify-between box-border">
                <div className="w-full h-[2rem] flex-1 flex flex-col items-start justify-center">
                  <b className="relative leading-[2rem]">Mabuhay, iskolar!</b>
                </div>
                <div className="w-fit h-fit flex    items-center">
                  <div className="h-10 w-10 rounded-num-100 bg-whitesmoke-100 flex items-center box-border">
                    <Icon icon="mage:filter" className="w-6 h-6"></Icon>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-start gap-10">
                {/* pasalo units */}
                <div className="w-full flex flex-col items-start justify-center gap-[1.5rem]">
                  {/* header */}
                  <div className="w-full h-fit flex items-center justify-between">
                    <div className="h-full flex items-center gap-2">
                      <div className="w-44 h-full flex flex-col items-start">
                        <div className="w-44 h-full flex flex-col items-end">
                          <Icon
                            icon="material-symbols-light:info-outline"
                            className="w-5 h-5"
                          ></Icon>
                        </div>
                        <b className="w-fit relative flex items-start">Pasalo Units</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] pt-4 cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon icon="material-symbols-light:chevron-left" className="w-5 h-5"></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>

                {/* popular listings */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">Popular Listings</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon icon="material-symbols-light:chevron-left" className="w-5 h-5"></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>

                {/* near campus */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">Near Campus</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon icon="material-symbols-light:chevron-left" className="w-5 h-5"></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>

                {/* you may like */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">Listings You May Like</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon icon="material-symbols-light:chevron-left" className="w-5 h-5"></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>

                {/* promotional card */}
                <div className="self-stretch overflow-hidden flex flex-col items-start text-[2rem] text-darkslategray">
                  <div className="w-[70.5rem] overflow-hidden flex flex-col items-start relative isolate gap-[0.625rem] shrink-0">
                    <img
                      className="w-[37.625rem] h-[36.688rem] absolute !!m-[0 important] top-[-6.899rem] left-[0rem] opacity-[0.7] z-[0] shrink-0"
                      alt=""
                    />
                    <div className="self-stretch rounded-num-12 bg-teal-200 overflow-hidden flex items-center py-[2rem] px-[4.5rem] gap-[0.625rem] z-[1] shrink-0">
                      <div className="h-[18.125rem] flex-1 relative">
                        <img
                          className="absolute top-[2.914rem] left-[-1.5rem] rounded-num-12 w-[20.094rem] h-[18.513rem] object-contain shrink-0"
                          alt=""
                        />
                        <img
                          className="absolute top-[-0.375rem] left-[2.75rem] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.25)] rounded-num-12 w-[28.406rem] h-[26.75rem] object-contain shrink-0"
                          alt=""
                        />
                      </div>
                      <div className="self-stretch w-[27rem] overflow-hidden shrink-0 flex flex-col items-center justify-center p-[0.625rem] box-border gap-[2rem]">
                        <div className="self-stretch flex flex-col items-start justify-center gap-[0.75rem]">
                          <div className="self-stretch relative font-extrabold">
                            Finding your future home shouldn't be hard.
                          </div>
                          <b className="self-stretch relative text-[1.125rem] text-teal-100">{`Find your future home with a clear vision. `}</b>
                        </div>
                        <div className="self-stretch flex-1 flex flex-col items-center justify-center gap-[1rem] text-[0.75rem] text-teal-100 font-lora">
                          <div className="self-stretch flex-1 flex flex-col items-center justify-center">
                            <div className="flex items-center gap-[1.187rem]">
                              <div className="w-[2.631rem] flex flex-col items-end">
                                <img className="w-[2.631rem] relative max-h-full" alt="" />
                                <div className="self-stretch h-[0.938rem] relative tracking-num-0_02 font-semibold inline-block shrink-0">
                                  Search
                                </div>
                              </div>
                              <img className="h-[1.5rem] w-[1.506rem] relative" alt="" />
                              <div className="w-[2.5rem] flex flex-col items-center justify-center gap-[0.312rem] text-center">
                                <img className="w-[2.5rem] relative max-h-full" alt="" />
                                <div className="self-stretch relative tracking-num-0_02 font-semibold">
                                  Book
                                </div>
                              </div>
                              <img className="h-[1.5rem] w-[1.506rem] relative" alt="" />
                              <div className="w-[2.95rem] flex flex-col items-center gap-[0.437rem]">
                                <div className="self-stretch overflow-hidden flex flex-col items-center justify-center p-[0.187rem]">
                                  <img className="w-[2.088rem] h-[1.981rem] relative" alt="" />
                                </div>
                                <div className="self-stretch relative tracking-num-0_02 font-semibold">
                                  Move In
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-center justify-center text-[1.125rem] text-white font-inter">
                            <div className="rounded-[45px] [background:linear-gradient(99.18deg,_#5dc2a8_27.88%,_#0c8873_88.15%)] flex items-center justify-center py-[0.75rem] px-[1rem] gap-[0.25rem]">
                              <b className="relative">Find my spot</b>
                              <img className="w-[1.75rem] relative max-h-full" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* all listings */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">All Listings</b>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer></Footer> */}
      </div>

      <div className="w-[3.563rem] h-[3.563rem] absolute !!m-[0 important] top-[55rem] left-[81.438rem] overflow-hidden shrink-0 z-[1]" />
    </div>
  );
};

export default HomePage;
