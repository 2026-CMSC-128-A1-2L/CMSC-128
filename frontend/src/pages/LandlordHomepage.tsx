import { FunctionComponent, useCallback } from 'react';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import { Icon } from '@iconify/react';
import send from '../../assets/send.svg';
import DefaultAvatar from '../../assets/default_avatar.svg';
import VerifiedBadge from '../../assets/verified_badge.svg';
import search from '../../assets/search.svg';
import left from '../../assets/leftArrow.svg';
import right from '../../assets/rightArrow.svg';
import house from '../../assets/House.svg';
import balance from '../../assets/outstandingBalance.svg';
import income from '../../assets/incomeIcon.svg';
import view from '../../assets/View More.svg';
import help from '../../assets/helpChatIcon.svg';
import sapphire1 from '../../assets/sapphire1.jpg';
import sapphire2 from '../../assets/sapphire2.jpg';
import sapphire3 from '../../assets/sapphire3.png';

const LandlordHomepage: FunctionComponent = () => {
  const onHeaderContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className="w-full h-screen relative flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-dimgray font-inter">
      <img
        className="w-full h-[1192px] absolute !!m-[0 important] top-[0px] left-[0px] z-[0]"
        alt=""
      />
      <div className="w-full h-[1192px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        <div className="self-stretch flex-1 flex flex-col items-start justify-center">
          <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start relative isolate">
            <div className="self-stretch flex-1 flex items-center gap-8 z-[0]">
              <div className="sticky top-0 self-stretch w-[200px] flex items-start">
                <SideBar />
                <div className="h-[924px] flex-1 border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start" />
              </div>
              <div className="h-[1112px] w-[106px] bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 hidden flex-col items-center pt-num-24 pb-[30px] pl-num-32 pr-2.5" />
              <div className="self-stretch flex-1 overflow-hidden flex items-start pt-0 px-0 pb-20">
                <div className="flex-1 flex flex-col items-start shrink-0">
                  <div className="self-stretch h-[100px] overflow-hidden shrink-0 flex items-center">
                    <div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 flex items-center py-2.5 px-num-24 box-border gap-2.5">
                      <img className="h-6 w-6 relative" alt="" src={search} />
                      <b className="relative">Search</b>
                    </div>
                  </div>
                  <div className="self-stretch h-[908px] flex flex-col items-start py-0 pl-0 pr-num-32 box-border gap-4 text-center text-num-24 text-black">
                    <div className="self-stretch flex flex-col items-start py-2.5 px-0 gap-12">
                      <div className="self-stretch overflow-hidden flex flex-col items-start gap-8">
                        <div className="self-stretch flex items-center gap-6">
                          <b className="relative leading-8">Statistics</b>
                          <div className="flex items-center gap-1 text-num-12 text-teal-200 font-lora">
                            <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                              View More
                            </div>
                            <Icon
                              icon="radix-icons:arrow-top-right"
                              className="w-4 relative max-h-full"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="self-stretch overflow-hidden flex items-center justify-between gap-[-1.3px] text-num-14 text-dimgray">
                          <div className="h-[140px] w-[220px] rounded-num-16 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-12 gap-2">
                            <div className="flex flex-col items-center gap-1">
                              <b className="relative">Monthly Income</b>
                              <b className="relative text-num-24 leading-8 text-teal-200">
                                Php 138,600
                              </b>
                            </div>
                            <div className="relative leading-6 font-medium">Feb 2026</div>
                          </div>
                          <div className="h-[140px] w-[220px] rounded-num-16 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-12 gap-2">
                            <div className="flex flex-col items-center gap-1">
                              <b className="relative">Number of Tenants</b>
                              <b className="relative text-num-24 leading-8 text-teal-200">28</b>
                            </div>
                            <div className="relative leading-6 font-medium text-transparent !bg-clip-text [background:linear-gradient(0deg,_#ffc273,_#fa7900)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                              2 ongoing lease transfers
                            </div>
                          </div>
                          <div className="h-[140px] w-[220px] rounded-num-16 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-12 gap-2">
                            <div className="flex flex-col items-center gap-1">
                              <b className="relative">Overdue Rent</b>
                              <b className="relative text-num-24 leading-8 text-teal-200">1</b>
                            </div>
                            <div className="relative leading-6 font-medium">Tenant</div>
                          </div>
                          <div className="h-[140px] w-[220px] rounded-num-16 bg-darkslategray border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center p-num-12 gap-1 text-num-18 text-whitesmoke">
                            <Icon
                              icon="basil:notification-on-outline"
                              className="w-12 h-12 relative"
                            />
                            <div className="flex flex-col items-center gap-1">
                              <b className="relative tracking-num--0_01">Pay Reminder</b>
                              <div className="rounded-num-100 bg-whitesmoke flex items-center justify-center py-num-4 px-num-12 gap-2.5 text-num-12 text-teal-200">
                                <div className="relative font-medium">Notify your tenants</div>
                                <div className="h-6 w-6 rounded-num-100 bg-teal-200 overflow-hidden shrink-0 flex flex-col items-center justify-center">
                                  <img
                                    className="w-[14.1px] h-[12.2px] relative"
                                    alt=""
                                    src={send}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch overflow-hidden flex flex-col items-start gap-2">
                        <div className="self-stretch flex items-center gap-6">
                          <b className="relative leading-8">Your Current Properties</b>
                          <div className="flex items-center justify-center gap-1 text-num-12 text-teal-200 font-lora">
                            <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                              View All
                            </div>
                            <img className="w-4 relative max-h-full" alt="" />
                          </div>
                        </div>
                        <div className="self-stretch flex items-center justify-end gap-6">
                          <img className="h-6 w-6 relative object-contain" alt="" src={left} />
                          <div className="rounded-num-100 bg-lightcyan overflow-hidden flex items-center py-[7px] px-[9px]">
                            <img className="h-[10.6px] w-1.5 relative" alt="" src={right} />
                          </div>
                        </div>
                        <div className="self-stretch rounded-num-16 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center p-4 gap-6 text-left text-num-14 font-poppins">
                          <div className="h-num-220 w-num-280 overflow-hidden shrink-0 flex flex-col items-start">
                            <div className="w-num-280 h-num-220 relative">
                              <div className="absolute top-[0px] left-[0px] w-[264px] h-52">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.15)]">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white" />
                                  <img
                                    className="absolute h-[56.35%] w-full top-[0%] right-[0%] bottom-[43.65%] left-[0%] rounded-t-num-10 rounded-b-num-0 max-w-full overflow-hidden max-h-full object-cover"
                                    alt=""
                                    src={sapphire1}
                                  />
                                </div>
                                <div className="absolute top-[128px] left-[5px] w-[253px] h-[67px] flex flex-col items-start justify-center gap-2">
                                  <div className="self-stretch flex items-center justify-between gap-[11px] shrink-0 text-num-18 font-inter">
                                    <b className="relative tracking-num--0_01">
                                      Two Sapphire Place
                                    </b>
                                    <div className="h-5 w-[72px] relative text-center text-num-12 text-teal-100 font-poppins">
                                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[5px] border-teal-100 border-solid border-[1px] box-border" />
                                      <div className="absolute h-[65%] w-[61.11%] top-[20%] left-[27.78%] flex items-center justify-center">
                                        Active
                                      </div>
                                      <div className="absolute h-1/4 w-[6.94%] top-[40%] right-[81.94%] bottom-[35%] left-[11.11%] rounded-[50%] bg-teal-100" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0 text-dimgray">
                                    <img className="h-3.5 w-4 relative" alt="" src={house} />
                                    <b className="h-[13px] w-[51px] relative tracking-num--0_01 flex items-center shrink-0">
                                      18/24
                                    </b>
                                  </div>
                                  <div className="self-stretch flex items-center justify-center gap-4 shrink-0">
                                    <div className="flex items-end gap-2">
                                      <img className="h-3.5 w-4 relative" alt="" src={income} />
                                      <b className="h-num-12_8 w-[75.1px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱89400.00
                                      </b>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <img className="h-4 w-4 relative" alt="" src={balance} />
                                      <b className="h-num-12_8 w-[73.2px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c29722,_#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱12600.00
                                      </b>
                                    </div>
                                    <img className="h-6 w-6 relative" alt="" src={view} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="h-num-220 w-num-280 overflow-hidden shrink-0 flex flex-col items-start">
                            <div className="w-num-280 h-num-220 relative">
                              <div className="absolute top-[0px] left-[0px] w-[264px] h-52">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.15)]">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white" />
                                  <img
                                    className="absolute h-[56.35%] w-full top-[0%] right-[0%] bottom-[43.65%] left-[0%] rounded-t-num-10 rounded-b-num-0 max-w-full overflow-hidden max-h-full object-cover"
                                    alt=""
                                    src={sapphire2}
                                  />
                                </div>
                                <div className="absolute top-[128px] left-[5px] w-[253px] h-[67px] flex flex-col items-start justify-center gap-2">
                                  <div className="self-stretch flex items-center justify-between gap-3 shrink-0 text-num-18 font-inter">
                                    <b className="relative tracking-num--0_01">
                                      One Sapphire Place
                                    </b>
                                    <div className="h-5 w-[72px] relative text-center text-num-12 text-teal-100 font-poppins">
                                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[5px] border-teal-100 border-solid border-[1px] box-border" />
                                      <div className="absolute h-[65%] w-[61.11%] top-[20%] left-[27.78%] flex items-center justify-center">
                                        Active
                                      </div>
                                      <div className="absolute h-1/4 w-[6.94%] top-[40%] right-[81.94%] bottom-[35%] left-[11.11%] rounded-[50%] bg-teal-100" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0 text-dimgray">
                                    <img className="h-3.5 w-4 relative" alt="" src={house} />
                                    <b className="h-[13px] w-[51px] relative tracking-num--0_01 flex items-center shrink-0">
                                      20/24
                                    </b>
                                  </div>
                                  <div className="self-stretch flex items-center justify-center gap-4 shrink-0">
                                    <div className="flex items-end gap-2">
                                      <img className="h-3.5 w-4 relative" alt="" src={income} />
                                      <b className="h-num-12_8 w-[75.1px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱89400.00
                                      </b>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <img className="h-4 w-4 relative" alt="" src={balance} />
                                      <b className="h-num-12_8 w-[73.2px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c29722,_#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱12600.00
                                      </b>
                                    </div>
                                    <img className="h-6 w-6 relative" alt="" src={view} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="h-num-220 w-num-280 overflow-hidden shrink-0 flex flex-col items-start">
                            <div className="w-num-280 h-num-220 relative">
                              <div className="absolute top-[0px] left-[0px] w-[264px] h-52">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.15)]">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-10 bg-white" />
                                  <img
                                    className="absolute h-[56.35%] w-full top-[0%] right-[0%] bottom-[43.65%] left-[0%] rounded-t-num-10 rounded-b-num-0 max-w-full overflow-hidden max-h-full object-cover"
                                    alt=""
                                    src={sapphire3}
                                  />
                                </div>
                                <div className="absolute top-[128px] left-[5px] w-[253px] h-[67px] flex flex-col items-start justify-center gap-2">
                                  <div className="self-stretch flex items-center gap-4 shrink-0 text-num-18 font-inter">
                                    <b className="relative tracking-num--0_01 shrink-0">
                                      Three Sapphire Place
                                    </b>
                                    <div className="h-5 w-[72px] relative shrink-0 text-center text-num-12 text-teal-100 font-poppins">
                                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[5px] border-teal-100 border-solid border-[1px] box-border" />
                                      <div className="absolute h-[65%] w-[61.11%] top-[20%] left-[27.78%] flex items-center justify-center">
                                        Active
                                      </div>
                                      <div className="absolute h-1/4 w-[6.94%] top-[40%] right-[81.94%] bottom-[35%] left-[11.11%] rounded-[50%] bg-teal-100" />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0 text-dimgray">
                                    <img className="h-3.5 w-4 relative" alt="" src={house} />
                                    <b className="h-[13px] w-[51px] relative tracking-num--0_01 flex items-center shrink-0">
                                      18/24
                                    </b>
                                  </div>
                                  <div className="self-stretch flex items-center justify-center gap-4 shrink-0">
                                    <div className="flex items-end gap-2">
                                      <img className="h-3.5 w-4 relative" alt="" src={income} />
                                      <b className="h-num-12_8 w-[75.1px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱89400.00
                                      </b>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <img className="h-4 w-4 relative" alt="" src={balance} />
                                      <b className="h-num-12_8 w-[73.2px] relative tracking-num--0_01 flex text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c29722,_#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] items-center shrink-0">
                                        ₱12600.00
                                      </b>
                                    </div>
                                    <img className="h-6 w-6 relative" alt="" src={view} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[704px] flex items-start gap-8 text-left text-num-18 text-teal-200">
                      <div className="h-[274px] flex-1 rounded-xl border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-center pt-num-24 px-0 pb-num-32 gap-2.5">
                        <div className="self-stretch overflow-hidden flex items-center py-0 px-num-24 gap-2">
                          <b className="relative tracking-num--0_01">Pending Applications</b>
                          <Icon
                            icon="radix-icons:arrow-top-right"
                            className="w-5 relative max-h-full"
                            alt=""
                          />
                        </div>
                        <div className="self-stretch flex flex-col items-start py-0 px-num-24">
                          <div className="self-stretch h-0.5 rounded-num-100 bg-whitesmoke overflow-hidden shrink-0 flex flex-col items-start pt-2.5 px-2.5 pb-0 box-border" />
                        </div>
                        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 px-num-24 gap-3 text-num-14 text-black">
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5 shrink-0">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 flex-1 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Daphne Dayne</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                dcanape@up.edu.ph
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5 shrink-0">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 flex-1 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Nathaniel Cunanan</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                ncunanan@up.edu.ph
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5 shrink-0">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Lance Chrysler De Jesus</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                lvdejesus1@up.edu.ph
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-[274px] flex-1 rounded-xl border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-center pt-num-24 px-0 pb-num-32 gap-2.5">
                        <div
                          className="self-stretch overflow-hidden flex items-center py-0 px-num-24 gap-2 cursor-pointer"
                          onClick={onHeaderContainerClick}
                        >
                          <b className="relative tracking-num--0_01">Scheduled Visits</b>
                          <Icon
                            icon="radix-icons:arrow-top-right"
                            className="w-5 relative max-h-full"
                            alt=""
                          />
                        </div>
                        <div className="self-stretch flex flex-col items-start py-0 px-num-24">
                          <div className="self-stretch h-0.5 rounded-num-100 bg-whitesmoke overflow-hidden shrink-0 flex flex-col items-start pt-2.5 px-2.5 pb-0 box-border" />
                        </div>
                        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 px-num-24 gap-3 text-num-14 text-black">
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 flex-1 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Daphne Dayne</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                dcanape@up.edu.ph
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-num-4 px-num-12 gap-2.5">
                            <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                            <div className="h-12 flex-1 overflow-hidden flex flex-col items-start justify-center p-2.5 box-border gap-1">
                              <b className="relative shrink-0">Nathaniel Cunanan</b>
                              <div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray shrink-0">
                                ncunanan@up.edu.ph
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch w-[300px] overflow-hidden shrink-0 flex flex-col items-center text-num-24 text-black">
                  <div className="w-[300px] h-[924px] flex flex-col items-start pt-16 pb-[30px] pl-5 pr-num-32 box-border">
                    <div className="self-stretch flex-1 flex flex-col items-start gap-8">
                      <div className="self-stretch overflow-hidden flex flex-col items-center p-2.5 shrink-0">
                        <div className="self-stretch overflow-hidden flex flex-col items-start justify-center">
                          <img
                            className="w-[74px] relative max-h-full object-cover"
                            alt=""
                            src={DefaultAvatar}
                          />
                        </div>
                        <div className="self-stretch overflow-hidden flex flex-col items-start justify-center gap-1">
                          <div className="flex items-center justify-center gap-1 shrink-0">
                            <b className="self-stretch w-[196px] relative leading-8 flex items-center shrink-0 max-w-[196px]">
                              Quevin James A. Custodio
                            </b>
                            <div className="self-stretch overflow-hidden flex items-end p-[3px]">
                              <img className="h-6 w-6 relative" alt="" src={VerifiedBadge} />
                            </div>
                          </div>
                          <b className="w-[203px] relative text-num-14 flex text-dimgray items-center shrink-0">
                            qcustodio@gmail.com
                          </b>
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-start gap-3 shrink-0 text-num-14">
                        <b className="self-stretch relative">Activity</b>
                        <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-2.5 px-num-12 gap-2">
                          <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                          <div className="flex-1 overflow-hidden flex flex-col items-start justify-center py-2.5 px-0 gap-1">
                            <div className="self-stretch flex items-center py-0 pl-0 pr-2 gap-1">
                              <b className="flex-1 relative">Haira Espinocilla</b>
                              <div className="relative text-[8px] font-medium text-slategray">
                                3d ago
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray">
                              paid rent for month of Feb
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-2.5 px-num-12 gap-2">
                          <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                          <div className="flex-1 overflow-hidden flex flex-col items-start justify-center py-2.5 px-0 gap-1">
                            <div className="self-stretch flex items-center py-0 pl-0 pr-2 gap-1">
                              <b className="flex-1 relative">Riz Doroja</b>
                              <div className="relative text-[8px] font-medium text-slategray">
                                1d ago
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray">
                              paid rent for month of Feb
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-2.5 px-num-12 gap-2">
                          <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                          <div className="flex-1 overflow-hidden flex flex-col items-start justify-center py-2.5 px-0 gap-1">
                            <div className="self-stretch flex items-center py-0 pl-0 pr-2 gap-1">
                              <b className="flex-1 relative">Dorm Manager #2</b>
                              <div className="relative text-[8px] font-medium text-slategray">
                                2m ago
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray">
                              collected payments in One Sapphire
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch rounded-num-8 border-whitesmoke border-solid border-[1px] overflow-hidden flex items-center py-2.5 px-num-12 gap-2">
                          <img className="h-10 w-10 object-cover" alt="" src={DefaultAvatar} />
                          <div className="flex-1 overflow-hidden flex flex-col items-start justify-center py-2.5 px-0 gap-1">
                            <div className="self-stretch flex items-center py-0 pl-0 pr-2 gap-1">
                              <b className="flex-1 relative">Dorm Manager #1</b>
                              <div className="relative text-[8px] font-medium text-slategray">
                                1m ago
                              </div>
                            </div>
                            <div className="self-stretch relative text-num-12 tracking-num-0_02 font-semibold font-lora text-slategray">
                              accepted ocular visits for April 9
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-[185px] overflow-hidden shrink-0 flex flex-col items-center p-2.5 box-border" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-20 overflow-hidden shrink-0 flex flex-col items-start z-[1] pl-50">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordHomepage;
