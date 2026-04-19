import { FunctionComponent, useState, useCallback } from 'react';
import EventPopout from "../components/EventPopout";
import PortalPopup from "../components/PortalPopup";



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
  	
  	return (<>
    		<div className="w-full h-[1024px] relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray font-lora">
      			<img className="w-[1440px] h-[1024px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt="" />
      			<div className="w-[1440px] h-[1192px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        				<div className="self-stretch flex-1 flex flex-col items-start py-num-0 pl-num-0 pr-20">
          					<div className="w-[1440px] flex-1 flex items-center shrink-0">
            						<div className="h-[1192px] w-[200px] hidden items-start">
              							<div className="h-[884px] w-[200px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center py-num-32 px-num-0" />
            						</div>
            						<div className="h-[1112px] hidden flex-col items-center">
              							<div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            						</div>
            						<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-between gap-0">
              							<div className="self-stretch h-[924px] flex flex-col items-start pt-16 pb-num-0 pl-num-32 pr-20 box-border">
                								<div className="self-stretch h-[1012px] flex flex-col items-start gap-3 shrink-0">
                  									<div className="w-[1128px] h-16 overflow-hidden shrink-0 hidden items-center p-num-10 box-border gap-2.5">
                    										<div className="h-6 w-[89px] hidden items-center gap-1.5">
                      											<div className="relative font-medium hidden shrink-0">View Tenants</div>
                      											<img className="h-6 w-6 relative hidden shrink-0" alt="" />
                      											<div className="relative font-medium hidden shrink-0">All</div>
                    										</div>
                    										<div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 flex items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                      											<img className="h-6 w-6 relative" alt="" />
                      											<b className="relative">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
                    										</div>
                  									</div>
                  									<div className="self-stretch h-[948px] flex flex-col items-center gap-8 text-[24px] text-black font-inter">
                    										<div className="self-stretch flex flex-col items-start justify-center gap-3">
                      											<div className="self-stretch flex items-center justify-between gap-5">
                        												<div className="h-8 w-[258px] flex flex-col items-center justify-end">
                          													<div className="w-[246px] flex items-center gap-10">
                            														<b className="relative leading-8 shrink-0">Calendar</b>
                            														<div className="h-12 w-[300px] rounded-2xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-2 px-3 box-border" />
                          													</div>
                        												</div>
                        												<div className="h-12 w-20 overflow-hidden shrink-0 flex items-end justify-end">
                          													<div className="h-12 w-12 rounded-[100px] bg-whitesmoke-100 overflow-hidden shrink-0 hidden items-center justify-end py-2 px-3 box-border" />
                        												</div>
                      											</div>
                      											<div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0 flex flex-col items-start pt-1 px-num-0 pb-num-0 box-border" />
                    										</div>
                    										<div className="self-stretch flex-1 flex items-start text-num-15_45">
                      											<div className="flex items-start justify-center gap-2.5">
                        												<div className="h-[756.4px] w-[309px] flex flex-col items-start pt-num-0 px-num-0 pb-[9.7px] box-border gap-[23.3px]">
                          													<div className="rounded-[15.45px] bg-white border-silver border-solid border-[1px] flex flex-col items-center p-num-15_4 isolate">
                            														<div className="self-stretch flex items-center gap-[15.4px] z-[1]">
                              															<div className="rounded-[30.9px] overflow-hidden flex items-center justify-center p-[7.7px] cursor-pointer" onClick={onIconButtonContainerClick}>
                                																<img className="h-[19.3px] w-[19.3px] relative" alt="" />
                              															</div>
                              															<div className="flex-1 flex items-start isolate gap-[7.7px]">
                                																<div className="flex-1 flex flex-col items-start z-[1]">
                                  																	<div className="self-stretch rounded-num-7_72 bg-white border-gainsboro border-solid border-[1px] flex items-center p-[5.8px] gap-[7.7px]">
                                    																		<div className="flex-1 relative leading-[100%]">Apr</div>
                                    																		<img className="h-[15.5px] w-[15.5px] relative" alt="" />
                                  																	</div>
                                																</div>
                                																<div className="flex-1 flex flex-col items-start z-[0]">
                                  																	<div className="self-stretch rounded-num-7_72 bg-white border-gainsboro border-solid border-[1px] flex items-center p-[5.8px] gap-[7.7px]">
                                    																		<div className="flex-1 relative leading-[100%]">2026</div>
                                    																		<img className="h-[15.5px] w-[15.5px] relative" alt="" />
                                  																	</div>
                                																</div>
                              															</div>
                              															<div className="rounded-[30.9px] overflow-hidden flex items-center justify-center p-[7.7px] cursor-pointer" onClick={onIconButtonContainerClick}>
                                																<img className="h-[19.3px] w-[19.3px] relative" alt="" />
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
                              															<img className="h-[23.2px] w-[23.2px] relative shrink-0" alt="" />
                              															<div className="flex flex-col items-start justify-center gap-[3.9px] shrink-0">
                                																<div className="relative font-medium">Ocular Visit</div>
                                																<div className="relative text-num-11_59 tracking-[0.04em] font-medium font-lora text-dimgray">April 7, 2026</div>
                              															</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className="self-stretch w-0.5 rounded-[100px] border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0" />
                        												<div className="w-[738.3px] rounded-[14.11px] overflow-hidden shrink-0 flex flex-col items-start py-[9.4px] px-num-0 box-border text-[23.09px]">
                          													<div className="self-stretch [filter:drop-shadow(0px_0.568566083908081px_0.57px_rgba(0,_0,_0,_0.12))] flex flex-col items-center justify-center">
                            														<div className="w-[726.5px] flex items-center py-[18.8px] px-[9.4px] box-border">
                              															<div className="relative tracking-[-0.01em] font-semibold">April 2026</div>
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
                            														<div className="w-[726.5px] flex items-start justify-center flex-wrap content-start gap-0 text-num-16_46">
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
                                  																	<div className="self-stretch rounded-[2.27px] [background:rgba(0,_133,_255,_0.1),_#fff] flex items-center justify-center py-num-4_7 px-[9.4px] opacity-[0.8] cursor-pointer" onClick={openEventPopout}>
                                    																		<b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] shrink-0">Ocular Visit</b>
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
              							<div className="self-stretch h-20 overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-dimgray font-inter">
                								<div className="w-[1273px] bg-whitesmoke-100 overflow-hidden flex items-center py-[19px] pl-[200px] pr-20 box-border">
                  									<div className="flex-1 flex items-center gap-20">
                    										<div className="flex items-center gap-4">
                      											<div className="flex items-center gap-2">
                        												<img className="w-12 relative max-h-full object-cover" alt="" />
                        												<div className="flex items-center gap-3">
                          													<div className="flex items-center gap-1">
                            														<img className="h-5 w-5 relative" alt="" />
                            														<b className="relative">2026</b>
                          													</div>
                          													<div className="flex items-center justify-center">
                            														<b className="relative">ATLAS Team</b>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="flex items-center justify-center">
                        												<b className="relative">{`All Rights Reserved `}</b>
                      											</div>
                    										</div>
                    										<div className="flex items-center justify-center">
                      											<div className="flex flex-col items-center justify-center gap-2.5">
                        												<b className="relative">Browse Dorms</b>
                        												<b className="relative">List your property</b>
                      											</div>
                    										</div>
                    										<div className="flex flex-col items-center justify-center gap-2.5">
                      											<b className="relative">About</b>
                      											<b className="relative">Contact Us</b>
                    										</div>
                    										<div className="flex flex-col items-center justify-center gap-2.5">
                      											<b className="relative">Privacy Policy</b>
                      											<b className="relative">Terms of Use</b>
                    										</div>
                  									</div>
                								</div>
              							</div>
            						</div>
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
        				<EventPopout onClose={closeEventPopout}/>
          					</PortalPopup>
          					)}</>);
          					};
          					
          					export default MyCalendar ;
          					