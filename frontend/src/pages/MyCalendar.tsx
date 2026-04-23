import { FunctionComponent, useState, useCallback } from 'react';
import EventPopout from '../components/EventPopout';
import PortalPopup from '../components/PortalPopup';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import dotIcon from '../assets/dot.svg';
import downIcon from '../assets/down.svg';
import leftIcon from '../assets/left.svg';
import rightIcon from '../assets/right.svg';

const MyCalendar: FunctionComponent = () => {
  const [isEventPopoutOpen, setEventPopoutOpen] = useState(false);

  const openEventPopout = useCallback(() => {
    setEventPopoutOpen(true);
  }, []);

  const closeEventPopout = useCallback(() => {
    setEventPopoutOpen(false);
  }, []);

  const onIconButtonContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <>
      <div className="w-full h-screen relative overflow-hidden flex flex-col items-start text-left text-num-14 text-darkslategray font-inter">
        <div className="w-full flex-1 overflow-hidden flex flex-row items-start z-[1]">
          <div className="w-56 flex-shrink-0 h-full bg-white overflow-y-auto border-r border-gray-200">
            <SideBar />
          </div>
          <div className="flex-1 flex flex-col items-start h-full overflow-y-auto bg-white">
            <div className="w-full flex flex-col items-start">
              <div className="w-full flex flex-col items-start pt-8 pb-0 pl-8 pr-5">
                <div className="w-full flex flex-col items-start gap-3">
                  <div className="w-full h-16 overflow-hidden shrink-0 hidden items-center p-num-10 box-border gap-2.5">
                    <div className="h-6 w-[89px] hidden items-center gap-1.5">
                      <div className="relative font-medium hidden shrink-0">View Tenants</div>

                      <div className="relative font-medium hidden shrink-0">All</div>
                    </div>
                    <div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 flex items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                      <b className="relative">
                        Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
                      </b>
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center gap-8 text-[24px] text-black font-inter">
                    <div className="self-stretch flex flex-col items-start justify-center gap-2 sm:gap-3">
                      <div className="self-stretch flex items-center justify-between gap-2 sm:gap-4 md:gap-5">
                        <div className="h-6 sm:h-8 flex-1 sm:flex-none flex flex-col items-start sm:items-center justify-end">
                          <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
                            <b className="relative leading-8 text-sm sm:text-base md:text-lg shrink-0">
                              Calendar
                            </b>
                            <div className="h-10 sm:h-12 w-48 sm:w-[300px] rounded-2xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-2 px-3 box-border" />
                          </div>
                        </div>
                        <div className="h-10 sm:h-12 w-16 sm:w-20 overflow-hidden shrink-0 flex items-end justify-end">
                          <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-[100px] bg-whitesmoke-100 overflow-hidden shrink-0 hidden items-center justify-end py-2 px-3 box-border" />
                        </div>
                      </div>
                      <div className="self-stretch h-0.01 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0 flex flex-col items-start pt-1 px-4 pb-num-0" />
                    </div>
                    <div className="self-stretch flex-1 flex items-start text-num-15_45 overflow-x-auto">
                      <div className="flex items-start justify-center gap-1.5 sm:gap-2 md:gap-2.5 min-w-max md:min-w-0">
                        <div className="h-[450px] sm:h-[600px] md:h-[756px] w-64 sm:w-72 md:w-[309px] flex flex-col items-start pt-num-0 px-num-0 pb-[9.7px] box-border gap-[15px] sm:gap-[20px] md:gap-[23.3px]">
                          <div className="rounded-xl sm:rounded-[15.45px] bg-white border-silver border-solid border-[1px] flex flex-col items-center p-2 sm:p-num-15_4 isolate">
                            <div className="self-stretch flex items-center gap-2 sm:gap-3 md:gap-[15.4px] z-[1]">
                              <div
                                className="rounded-full overflow-hidden flex items-center justify-center p-1.5 sm:p-[7.7px] cursor-pointer"
                                onClick={onIconButtonContainerClick}
                              >
                                <img
                                  src={leftIcon}
                                  className="h-4 sm:h-5 md:h-[19.3px] w-4 sm:w-5 md:w-[19.3px] relative"
                                  alt="left"
                                />
                              </div>
                              <div className="flex-1 flex items-start isolate gap-1.5 sm:gap-2 md:gap-[7.7px]">
                                <div className="flex-1 flex flex-col items-start z-[1]">
                                  <div className="self-stretch rounded-md sm:rounded-num-7_72 bg-white border-gainsboro border-solid border-[1px] flex items-center p-1 sm:p-[5.8px] gap-1.5 sm:gap-[7.7px] text-xs sm:text-sm">
                                    <div className="flex-1 relative leading-[100%]">Apr</div>
                                    <img
                                      src={downIcon}
                                      className="h-3 sm:h-4 md:h-[15.5px] w-3 sm:w-4 md:w-[15.5px] relative"
                                      alt="down"
                                    />
                                  </div>
                                </div>
                                <div className="flex-1 flex flex-col items-start z-[0]">
                                  <div className="self-stretch rounded-md sm:rounded-num-7_72 bg-white border-gainsboro border-solid border-[1px] flex items-center p-1 sm:p-[5.8px] gap-1.5 sm:gap-[7.7px] text-xs sm:text-sm">
                                    <div className="flex-1 relative leading-[100%]">2026</div>
                                    <img
                                      src={downIcon}
                                      className="h-3 sm:h-4 md:h-[15.5px] w-3 sm:w-4 md:w-[15.5px] relative"
                                      alt="down"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div
                                className="rounded-full overflow-hidden flex items-center justify-center p-1.5 sm:p-[7.7px] cursor-pointer"
                                onClick={onIconButtonContainerClick}
                              >
                                <img
                                  src={rightIcon}
                                  className="h-4 sm:h-5 md:h-[19.3px] w-10 sm:w-12 md:w-[50.3px] relative"
                                  alt="right"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col items-center pt-num-15_4 px-num-0 pb-num-0 z-[0] text-center text-num-11_59 text-gray font-geist">
                              <div className="self-stretch flex items-center justify-center gap-px">
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="relative leading-num-19_31">Su</div>
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="relative leading-num-19_31">Mo</div>
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="relative leading-num-19_31">Tu</div>
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="relative leading-num-19_31">We</div>
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="relative leading-num-19_31">Th</div>
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="relative leading-num-19_31">Fr</div>
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="relative leading-num-19_31">Sa</div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center isolate gap-px text-num-15_45 text-black">
                                <div className="flex items-center gap-px z-[4]">
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[23.32px] shrink-0">1</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[23.32px] shrink-0">2</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 bg-lightcyan-100 flex items-center justify-center p-num-15_4 box-border text-teal-200 font-inter">
                                    <b className="relative leading-[140%] shrink-0">3</b>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[23.32px] shrink-0">4</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-px z-[3]">
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">5</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">6</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">7</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">8</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">9</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">10</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">11</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-px z-[2]">
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">12</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">13</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">14</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">15</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">16</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">17</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">18</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-px z-[1]">
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">19</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">20</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">21</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">22</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">23</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">24</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">25</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-px z-[0]">
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">26</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">27</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">28</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">29</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border">
                                    <div className="relative leading-[140%] shrink-0">30</div>
                                  </div>
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
                                  <div className="h-num-38_6 w-[38.6px] rounded-num-7_72 flex items-center justify-center p-num-15_4 box-border" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch overflow-hidden flex flex-col items-start py-[9.7px] px-num-0 gap-[9.7px] text-center text-[13.52px]">
                            <b className="self-stretch relative">Upcoming Events</b>
                            <div className="self-stretch h-[46.3px] rounded-[15.45px] border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex items-center p-num-15_4 gap-[9.7px] text-[13.99px]">
                              <img
                                src={dotIcon}
                                className="h-[23.2px] w-[23.2px] relative shrink-0"
                                alt="dot"
                              />
                              <div className="flex flex-col items-start justify-center gap-[3.9px] shrink-0">
                                <div className="relative font-medium">Ocular Visit</div>
                                <div className="relative text-num-11_59 tracking-[0.04em] font-medium font-lora text-dimgray">
                                  April 7, 2026
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch w-0.5 rounded-[100px] border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0" />
                        <div className="w-full sm:w-96 md:w-full lg:w-[738px] rounded-lg sm:rounded-[14.11px] overflow-hidden shrink-0 flex flex-col items-start py-2 sm:py-[9.4px] px-num-0 box-border text-xs sm:text-sm md:text-base lg:text-[23.09px] h-[450px] sm:h-[600px] md:h-[756px] bg-gray-50">
                          <div className="self-stretch [filter:drop-shadow(0px_0.568566083908081px_0.57px_rgba(0,_0,_0,_0.12))] flex flex-col items-center justify-center">
                            <div className="w-[726.5px] flex items-center py-[18.8px] px-[9.4px] box-border">
                              <div className="relative tracking-[-0.01em] font-semibold">
                                April 2026
                              </div>
                            </div>
                            <div className="w-[726.5px] h-[23.5px] bg-aliceblue flex items-start justify-center text-num-9_1 text-dimgray">
                              <div className="self-stretch w-num-104 rounded-tl-[4.55px] rounded-tr-num-0 rounded-b-num-0 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
                                <div className="relative font-medium">SUN</div>
                              </div>
                              <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
                                <div className="relative font-medium">MON</div>
                              </div>
                              <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
                                <div className="relative font-medium">TUE</div>
                              </div>
                              <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
                                <div className="relative font-medium">WED</div>
                              </div>
                              <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
                                <div className="relative font-medium">THUR</div>
                              </div>
                              <div className="self-stretch w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
                                <div className="relative font-medium">FRI</div>
                              </div>
                              <div className="self-stretch w-num-104 rounded-tl-num-0 rounded-tr-[4.55px] rounded-b-num-0 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-center p-num-6_8">
                                <div className="relative font-medium">SAT</div>
                              </div>
                            </div>
                            <div className="w-full flex items-start justify-center flex-wrap content-start gap-0 text-[10px] sm:text-[12px] md:text-num-16_46]">
                              <div className="h-num-108_7 w-num-104 bg-whitesmoke-200 border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px] text-dimgray">
                                <b className="relative">29</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-whitesmoke-200 border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px] text-dimgray">
                                <b className="relative">30</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-whitesmoke-200 border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px] text-dimgray">
                                <b className="relative">31</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">1</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">2</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-lightcyan-200 border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px] text-teal-100">
                                <b className="relative">3</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">4</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">5</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">6</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">7</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7 text-[11.76px]">
                                  <div
                                    className="self-stretch rounded-[2.27px] [background:rgba(0,_133,_255,_0.1),_#fff] flex items-center justify-center py-num-4_7 px-[9.4px] opacity-[0.8] cursor-pointer"
                                    onClick={openEventPopout}
                                  >
                                    <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] shrink-0">
                                      Ocular Visit
                                    </b>
                                  </div>
                                </div>
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">8</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">9</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">10</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">11</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">12</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">13</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">14</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">15</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">16</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">17</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">18</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">19</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">20</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">21</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">22</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">23</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">24</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">25</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">26</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">27</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">28</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">29</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-white border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px]">
                                <b className="relative">30</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-whitesmoke-200 border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px] text-dimgray">
                                <b className="relative">1</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                              <div className="h-num-108_7 w-num-104 bg-whitesmoke-200 border-whitesmoke-200 border-solid border-[0.6px] box-border flex flex-col items-start justify-between p-num-4_7 gap-[5.7px] text-dimgray">
                                <b className="relative">2</b>
                                <div className="self-stretch flex-1 flex flex-col items-start p-num-4_7" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-20">
              <Footer />
            </div>
          </div>
        </div>
      </div>
      {isEventPopoutOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.25)"
          placement="Centered"
          onOutsideClick={closeEventPopout}
        >
          <EventPopout onClose={closeEventPopout} />
        </PortalPopup>
      )}
    </>
  );
};

export default MyCalendar;
