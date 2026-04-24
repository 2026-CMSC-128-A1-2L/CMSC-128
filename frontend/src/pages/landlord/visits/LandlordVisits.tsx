import type { FunctionComponent } from 'react';
import { useState, useCallback } from 'react';
import SetAvailableTime from "../../../components/landlord/SetAvailableTime";
import PortalPopup from "../../../components/landlord/PortalPopup";



const Visits: FunctionComponent = () => {
  	const [isSetAvailableTimeOpen, setSetAvailableTimeOpen] = useState(false);
  	
  	const openSetAvailableTime = useCallback(() => {
    		setSetAvailableTimeOpen(true);
  	}, []);
  	
  	const closeSetAvailableTime = useCallback(() => {
    		setSetAvailableTimeOpen(false);
  	}, []);
  	
  	return (<>
    		<div className="w-full relative flex flex-col items-start isolate gap-2.5 text-left text-[31.85px] text-darkslategray-200 font-buhun-retro-two-free">
      			<img className="w-[1440px] h-[1024px] absolute !!m-[0 important] top-[0px] left-[0px] z-[0]" alt="" />
      			<div className="w-[1440px] h-[1192px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        				<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 pl-0 pr-20">
          					<div className="w-[1440px] flex-1 flex items-center shrink-0">
            						<div className="self-stretch flex items-start justify-center">
              							<div className="h-[924px] border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start">
                								<div className="w-[200px] h-[883px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center pt-num-24 px-0 pb-[30px] gap-8">
                  									<div className="w-32 h-num-60 overflow-hidden shrink-0 flex flex-col items-center justify-center">
                    										<div className="self-stretch h-14 relative">
                      											<div className="absolute top-[18.46px] left-[48.76px] flex items-center w-[79.2px] h-[27.1px]">TLAS</div>
                      											<img className="absolute top-[0.13px] left-[0px] w-[58.2px] h-[55.7px] object-cover" alt="" />
                    										</div>
                  									</div>
                  									<div className="self-stretch h-[784px] flex flex-col items-start gap-8 shrink-0 text-num-14 text-gray-300 font-inter">
                    										<div className="self-stretch flex flex-col items-start py-0 pl-num-32 pr-num-20 text-[10px] text-dimgray">
                      											<div className="self-stretch rounded-num-100 bg-whitesmoke-200 overflow-hidden flex items-center py-0 pl-[17px] pr-3">
                        												<div className="flex-1 overflow-hidden flex items-start py-num-10 px-0">
                          													<div className="relative font-semibold">Add New Listing</div>
                        												</div>
                        												<div className="h-8 w-8 rounded-num-100 bg-teal overflow-hidden shrink-0 flex flex-col items-center justify-center">
                          													<img className="w-6 h-6 relative" alt="" />
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch h-[506px] flex flex-col items-start gap-3">
                      											<div className="w-num-180 flex items-center py-0 pl-0 pr-num-20 box-border gap-6">
                        												<div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0 box-border" />
                        												<div className="h-11 flex-1 rounded-num-12 flex items-center">
                          													<div className="flex-1 flex items-center gap-4">
                            														<div className="h-5 w-5 flex items-center">
                              															<img className="h-6 w-6 relative shrink-0" alt="" />
                            														</div>
                            														<div className="flex-1 relative font-semibold">Dashboard</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="w-num-180 flex items-center py-0 pl-0 pr-num-20 box-border gap-6">
                        												<div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0 box-border" />
                        												<div className="self-stretch flex-1 rounded-num-12 flex items-center">
                          													<div className="flex-1 flex items-center gap-4">
                            														<div className="h-6 w-6 flex items-center">
                              															<img className="h-6 w-6 relative" alt="" />
                            														</div>
                            														<div className="relative font-semibold">Messages</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="w-num-180 flex items-center py-0 pl-0 pr-num-20 box-border gap-6">
                        												<div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0 box-border" />
                        												<div className="self-stretch flex-1 rounded-num-12 flex items-center">
                          													<div className="flex-1 flex items-center gap-4">
                            														<div className="h-6 w-6 flex items-center">
                              															<img className="w-6 relative max-h-full" alt="" />
                            														</div>
                            														<div className="w-[88px] relative font-semibold flex items-center shrink-0">Properties</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="w-num-180 flex items-center py-0 pl-0 pr-num-20 box-border gap-6">
                        												<div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0 box-border" />
                        												<div className="self-stretch flex-1 rounded-num-12 flex items-center">
                          													<div className="flex-1 flex items-center gap-4">
                            														<div className="flex items-center">
                              															<img className="w-6 relative max-h-full" alt="" />
                            														</div>
                            														<div className="relative font-semibold">Managers</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="w-num-180 flex items-center py-0 pl-0 pr-num-20 box-border gap-6">
                        												<div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0 box-border" />
                        												<div className="self-stretch flex-1 rounded-num-12 flex items-center">
                          													<div className="flex-1 flex items-center gap-4">
                            														<div className="flex items-center">
                              															<img className="h-5 w-5 relative" alt="" />
                            														</div>
                            														<div className="relative font-semibold">My Tenants</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="w-num-180 flex items-center py-0 pl-0 pr-num-20 box-border gap-6 text-teal">
                        												<div className="h-11 w-2 rounded-num-4 bg-teal overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0 box-border" />
                        												<div className="self-stretch flex-1 rounded-num-12 flex items-center">
                          													<div className="flex-1 flex items-center gap-4">
                            														<div className="flex items-center">
                              															<img className="h-[24.4px] w-6 relative" alt="" />
                            														</div>
                            														<div className="flex-1 relative font-semibold">Visits</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="w-num-180 flex items-center py-0 pl-0 pr-num-20 box-border gap-6">
                        												<div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0 box-border" />
                        												<div className="self-stretch flex-1 rounded-num-12 flex items-center">
                          													<div className="flex-1 flex items-center gap-4">
                            														<div className="flex items-center">
                              															<img className="h-[26.5px] w-[26px] relative" alt="" />
                            														</div>
                            														<div className="flex-1 relative font-semibold">Finance</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="w-num-180 flex items-center py-0 pl-0 pr-num-20 box-border gap-6">
                        												<div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0 box-border" />
                        												<div className="self-stretch flex-1 rounded-num-12 flex items-center">
                          													<div className="flex-1 flex items-center gap-4">
                            														<div className="flex items-center">
                              															<img className="h-[24.4px] w-6 relative" alt="" />
                            														</div>
                            														<div className="flex-1 relative font-semibold">Settings</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-start gap-3">
                      											<div className="w-num-180 flex items-center py-0 pl-0 pr-num-20 box-border gap-6">
                        												<div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0 box-border" />
                        												<div className="self-stretch flex-1 rounded-num-12 flex items-center">
                          													<div className="flex-1 flex items-center gap-4">
                            														<div className="flex items-center">
                              															<img className="h-[24.4px] w-[24.4px] relative" alt="" />
                            														</div>
                            														<div className="flex-1 relative font-semibold">Dark Mode</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="self-stretch flex flex-col items-start py-0 px-num-20">
                        												<div className="self-stretch h-0.5 rounded-num-100 bg-whitesmoke-200 overflow-hidden shrink-0 flex items-start pt-num-10 px-num-10 pb-0 box-border" />
                      											</div>
                      											<div className="w-[200px] overflow-hidden flex items-center py-num-10 pl-num-32 pr-num-20 box-border gap-2 text-teal">
                        												<img className="w-11 relative max-h-full object-cover" alt="" />
                        												<div className="overflow-hidden flex flex-col items-start justify-center gap-1">
                          													<div className="w-[76px] flex items-center">
                            														<b className="relative inline-block max-w-[196px]">Quevin</b>
                          													</div>
                          													<div className="self-stretch flex items-center gap-1 text-[10px]">
                            														<b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Verified</b>
                            														<div className="h-[13.6px] w-3 overflow-hidden shrink-0 flex items-center p-[1.2px] box-border">
                              															<img className="h-[9.6px] w-[9.6px] relative" alt="" />
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
            						</div>
            						<div className="h-[1112px] w-[106px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 hidden flex-col items-center pt-num-24 pb-[30px] pl-num-32 pr-num-10" />
            						<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-between gap-0 text-num-14 text-darkslategray-100 font-lora">
              							<div className="self-stretch flex flex-col items-start pt-16 pb-0 pl-num-32 pr-20">
                								<div className="self-stretch h-[1012px] flex flex-col items-start">
                  									<div className="w-[1222px] h-16 overflow-hidden shrink-0 hidden items-center p-num-10 box-border">
                    										<div className="h-6 w-[89px] flex items-center gap-1.5">
                      											<div className="relative font-medium hidden shrink-0">View Tenants</div>
                      											<img className="h-6 w-6 relative hidden shrink-0" alt="" />
                      											<div className="relative font-medium hidden shrink-0">All</div>
                    										</div>
                  									</div>
                  									<div className="self-stretch h-[948px] flex flex-col items-center gap-8 shrink-0 text-dimgray font-inter">
                    										<div className="self-stretch flex flex-col items-start gap-3">
                      											<div className="self-stretch flex items-center">
                        												<div className="flex-1 flex flex-col items-start gap-[5px]">
                          													<b className="self-stretch h-6 relative flex items-center shrink-0">Visits</b>
                          													<div className="self-stretch flex items-center text-[24px] text-gray-300">
                            														<b className="relative leading-8">My Calendar</b>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="self-stretch h-0.5 rounded-num-100 bg-whitesmoke-200 overflow-hidden shrink-0 flex flex-col items-start pt-1 px-0 pb-0 box-border" />
                    										</div>
                    										<div className="flex-1 rounded-2xl bg-white border-whitesmoke-200 border-solid border-[1px] flex flex-col items-start py-num-32 px-num-24 gap-8 text-teal">
                      											<div className="self-stretch flex items-center justify-center gap-[22px]">
                        												<div className="self-stretch flex flex-col items-start pt-0 px-0 pb-[8.3px] gap-5">
                          													<div className="self-stretch rounded-2xl bg-lightcyan-200 overflow-hidden flex flex-col items-center justify-center p-3 cursor-pointer" onClick={openSetAvailableTime}>
                            														<b className="relative">Set Available Time Slots</b>
                          													</div>
                          													<div className="rounded-[13.25px] bg-white border-gainsboro border-solid border-[0.8px] flex flex-col items-center p-num-13_3 isolate text-num-13_25 text-gray-200">
                            														<div className="self-stretch flex items-center gap-[13.3px] z-[1]">
                              															<div className="rounded-[26.5px] overflow-hidden flex items-center justify-center p-[6.6px]">
                                																<img className="h-[16.6px] w-[16.6px] relative" alt="" />
                              															</div>
                              															<div className="flex-1 flex items-start isolate gap-[6.6px]">
                                																<div className="flex-1 flex flex-col items-start z-[1]">
                                  																	<div className="self-stretch rounded-num-6_63 bg-white border-gainsboro border-solid border-[0.8px] flex items-center p-[5px] relative isolate gap-[6.6px]">
                                    																		<div className="flex-1 relative leading-[100%] z-[0] shrink-0">Apr</div>
                                    																		<img className="h-[13.3px] w-[13.3px] relative z-[1] shrink-0" alt="" />
                                    																		<div className="!!m-[0 important] absolute top-[6.63px] left-[6.63px] shadow-[0px_1px_4px_rgba(12,_12,_13,_0.1),_0px_1px_4px_rgba(12,_12,_13,_0.05)] rounded-num-6_63 bg-white border-gainsboro border-solid border-[0.8px] hidden flex-col items-center p-[6.6px] gap-[6.6px] z-[2] shrink-0">
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
                                  																	<div className="self-stretch rounded-num-6_63 bg-white border-gainsboro border-solid border-[0.8px] flex items-center p-[5px] relative isolate gap-[6.6px]">
                                    																		<div className="flex-1 relative leading-[100%] z-[0] shrink-0">2026</div>
                                    																		<img className="h-[13.3px] w-[13.3px] relative z-[1] shrink-0" alt="" />
                                    																		<div className="!!m-[0 important] absolute top-[6.63px] left-[6.63px] shadow-[0px_1px_4px_rgba(12,_12,_13,_0.1),_0px_1px_4px_rgba(12,_12,_13,_0.05)] rounded-num-6_63 bg-white border-gainsboro border-solid border-[0.8px] hidden flex-col items-start p-[6.6px] gap-[6.6px] z-[2] shrink-0">
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
                              															<div className="rounded-[26.5px] overflow-hidden flex items-center justify-center p-[6.6px]">
                                																<img className="h-[16.6px] w-[16.6px] relative" alt="" />
                              															</div>
                            														</div>
                            														<div className="flex flex-col items-center pt-num-13_3 px-0 pb-0 z-[0] text-center text-num-9_94 text-gray-100 font-geist">
                              															<div className="self-stretch flex items-center justify-center gap-[0.8px]">
                                																<div className="flex-1 flex items-center justify-center">
                                  																	<div className="relative leading-num-16_56">Su</div>
                                																</div>
                                																<div className="flex-1 flex items-center justify-center">
                                  																	<div className="relative leading-num-16_56">Mo</div>
                                																</div>
                                																<div className="flex-1 flex items-center justify-center">
                                  																	<div className="relative leading-num-16_56">Tu</div>
                                																</div>
                                																<div className="flex-1 flex items-center justify-center">
                                  																	<div className="relative leading-num-16_56">We</div>
                                																</div>
                                																<div className="flex-1 flex items-center justify-center">
                                  																	<div className="relative leading-num-16_56">Th</div>
                                																</div>
                                																<div className="flex-1 flex items-center justify-center">
                                  																	<div className="relative leading-num-16_56">Fr</div>
                                																</div>
                                																<div className="flex-1 flex items-center justify-center">
                                  																	<div className="relative leading-num-16_56">Sa</div>
                                																</div>
                              															</div>
                              															<div className="flex flex-col items-center isolate gap-[0.8px] text-num-13_25 text-gray-200">
                                																<div className="flex items-center gap-[0.8px] z-[4]">
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-num-20 hidden shrink-0">1</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-num-20 hidden shrink-0">1</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-num-20 hidden shrink-0">1</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-num-20 shrink-0">1</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-num-20 shrink-0">2</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border text-black font-inter">
                                    																		<div className="relative leading-[140%] shrink-0">3</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border text-black">
                                    																		<div className="relative leading-num-20 shrink-0">4</div>
                                  																	</div>
                                																</div>
                                																<div className="flex items-center gap-[0.8px] z-[3]">
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 bg-lightcyan-200 flex items-center justify-center p-num-13_3 box-border text-teal">
                                    																		<b className="relative leading-[140%] shrink-0">5</b>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">6</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">7</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">8</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">9</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">10</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">11</div>
                                  																	</div>
                                																</div>
                                																<div className="flex items-center gap-[0.8px] z-[2]">
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">12</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">13</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">14</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">15</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">16</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">17</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">18</div>
                                  																	</div>
                                																</div>
                                																<div className="flex items-center gap-[0.8px] z-[1]">
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">19</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">20</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">21</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">22</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">23</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">24</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">25</div>
                                  																	</div>
                                																</div>
                                																<div className="flex items-center gap-[0.8px] z-[0]">
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">26</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">27</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">28</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">29</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] shrink-0">30</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] hidden shrink-0">24</div>
                                  																	</div>
                                  																	<div className="h-num-33_1 w-[33.1px] rounded-num-6_63 flex items-center justify-center p-num-13_3 box-border">
                                    																		<div className="relative leading-[140%] hidden shrink-0">25</div>
                                  																	</div>
                                																</div>
                              															</div>
                            														</div>
                          													</div>
                          													<div className="self-stretch overflow-hidden flex flex-col items-start py-[8.3px] px-0 gap-[8.3px] text-center text-num-12 text-gray-300">
                            														<b className="self-stretch relative text-[11.59px] text-black">Upcoming Visits</b>
                            														<div className="self-stretch h-[39.8px] rounded-[13.25px] border-whitesmoke-200 border-solid border-[0.8px] box-border overflow-hidden shrink-0 flex items-center p-num-13_3 gap-[8.3px]">
                              															<img className="h-[19.9px] w-[19.9px] relative shrink-0" alt="" />
                              															<div className="flex-1 flex items-center gap-[3.3px] shrink-0">
                                																<div className="relative font-medium">One Sapphire Place</div>
                                																<div className="flex-1 relative font-medium text-slategray text-right">1</div>
                              															</div>
                            														</div>
                            														<div className="self-stretch h-[39.8px] rounded-[13.25px] border-whitesmoke-200 border-solid border-[0.8px] box-border overflow-hidden shrink-0 flex items-center p-num-13_3 gap-[8.3px]">
                              															<img className="h-[19.9px] w-[19.9px] relative shrink-0" alt="" />
                              															<div className="flex-1 flex items-center gap-[3.3px] shrink-0">
                                																<div className="relative font-medium">Two Sapphire Place</div>
                                																<div className="flex-1 relative font-medium text-slategray text-right">3</div>
                              															</div>
                            														</div>
                            														<div className="self-stretch h-[39.8px] rounded-[13.25px] border-whitesmoke-200 border-solid border-[0.8px] box-border overflow-hidden shrink-0 flex items-center p-num-13_3 gap-[8.3px]">
                              															<img className="h-[19.9px] w-[19.9px] relative shrink-0" alt="" />
                              															<div className="flex-1 flex items-center gap-[3.3px] shrink-0">
                                																<div className="relative font-medium">Three Sapphire Place</div>
                                																<div className="flex-1 relative font-medium text-slategray text-right">3</div>
                              															</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className="self-stretch w-0.5 rounded-num-100 border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-0" />
                        												<div className="w-[755px] rounded-[14.42px] overflow-hidden shrink-0 flex flex-col items-start py-num-32 px-0 box-border text-dimgray">
                          													<div className="w-[754px] h-[456px] [filter:drop-shadow(0px_0.5811673998832703px_0.58px_rgba(0,_0,_0,_0.12))] flex items-start justify-center">
                            														<div className="flex flex-col items-center justify-center gap-4 shrink-0">
                              															<div className="w-[754px] flex flex-col items-start gap-2.5">
                                																<div className="self-stretch flex items-center justify-between gap-0">
                                  																	<img className="w-8 relative max-h-full" alt="" />
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">SUN</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">MON</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">TUE</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">WED</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">THU</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">FRI</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">SAT</b>
                                  																	</div>
                                  																	<img className="w-8 relative max-h-full object-contain" alt="" />
                                																</div>
                                																<div className="self-stretch h-8 flex items-start justify-between py-0 px-num-24 box-border gap-0 text-num-16 text-teal">
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">5</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">6</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">7</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">8</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">{`9 `}</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">10</b>
                                  																	</div>
                                  																	<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                                    																		<b className="relative">11</b>
                                  																	</div>
                                																</div>
                              															</div>
                              															<div className="w-[700px] h-[412px] overflow-hidden shrink-0 grid box-border grid-cols-[repeat(7,_1fr)] grid-rows-[repeat(6,_1fr)] [column-gap:8px] [row-gap:10px] text-center text-num-12 text-darkslategray-100">
                                																<div className="h-num-60 rounded-num-8 bg-lavenderblush overflow-hidden flex items-center justify-center p-num-10 box-border col-[1] row-[2]">
                                  																	<b className="relative">10:30 AM<br/>Espinocilla</b>
                                    																		</div>
                                    																		<div className="h-num-60 rounded-num-8 bg-lightcyan-100 overflow-hidden flex items-center justify-center p-num-10 box-border col-[2] row-[1]">
                                      																			<b className="relative">9:00 AM<br/>Revilla</b>
                                        																				</div>
                                        																				<div className="h-num-60 rounded-num-8 bg-antiquewhite overflow-hidden flex items-center justify-center p-num-10 box-border col-[3] row-[1]">
                                          																					<b className="relative">10:00 AM<br/>Caduyac</b>
                                            																						</div>
                                            																						<div className="h-num-60 rounded-num-8 bg-antiquewhite overflow-hidden flex items-center justify-center p-num-10 box-border col-[3] row-[2]">
                                              																							<b className="relative">3:30 PM<br/>Doroja</b>
                                                																								</div>
                                                																								<div className="h-num-60 rounded-num-8 bg-antiquewhite overflow-hidden flex items-center justify-center p-num-10 box-border col-[6] row-[1]">
                                                  																									<b className="relative">11:00 AM<br/>Santos</b>
                                                    																										</div>
                                                    																										<div className="h-num-60 rounded-num-8 bg-lightcyan-100 overflow-hidden flex items-center justify-center p-num-10 box-border col-[5] row-[1]">
                                                      																											<b className="relative">11:00 AM<br/>Cunanan</b>
                                                        																												</div>
                                                        																												<div className="h-num-60 rounded-num-8 bg-lightcyan-100 overflow-hidden flex items-center justify-center p-num-10 box-border col-[2] row-[3]">
                                                          																													<b className="relative">4:00 PM<br/>De Castro</b>
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														<div className="self-stretch rounded-2xl bg-white border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start py-3 px-4 gap-2.5 text-black">
                                                              																															<div className="flex items-start gap-4 text-[18px]">
                                                                																																<b className="relative tracking-[-0.01em]">Visit Requests</b>
                                                                																																<b className="relative tracking-[-0.01em] text-teal">2</b>
                                                              																															</div>
                                                              																															<div className="self-stretch rounded-num-12 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-start py-3 px-4 gap-2.5">
                                                                																																<div className="flex-1 flex flex-col items-start gap-1">
                                                                  																																	<b className="relative">Daphne Dayne</b>
                                                                  																																	<div className="relative text-num-12 font-medium text-dimgray">April 9, 2026 - 11:00 AM</div>
                                                                																																</div>
                                                                																																<div className="flex flex-col items-start gap-1">
                                                                  																																	<b className="relative">Three Sapphire Place</b>
                                                                  																																	<div className="relative text-num-12 font-medium text-dimgray">Building Name</div>
                                                                																																</div>
                                                                																																<div className="self-stretch flex-1 flex items-start justify-end gap-1 text-num-12 text-teal">
                                                                  																																	<div className="self-stretch rounded-num-8 overflow-hidden flex items-center justify-center py-2 px-3">
                                                                    																																		<div className="relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Reject</div>
                                                                  																																	</div>
                                                                  																																	<div className="self-stretch rounded-num-8 bg-lightcyan-200 overflow-hidden flex items-center justify-center py-2 px-3">
                                                                    																																		<b className="relative">Accept</b>
                                                                  																																	</div>
                                                                																																</div>
                                                              																															</div>
                                                              																															<div className="self-stretch rounded-num-12 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-start py-3 px-4 gap-2.5">
                                                                																																<div className="flex-1 flex flex-col items-start gap-1">
                                                                  																																	<b className="relative">Caleb Romero</b>
                                                                  																																	<div className="relative text-num-12 font-medium text-dimgray">April 6, 2026 - 1:00 PM</div>
                                                                																																</div>
                                                                																																<div className="flex flex-col items-start gap-1">
                                                                  																																	<b className="relative">Two Sapphire Place</b>
                                                                  																																	<div className="relative text-num-12 font-medium text-dimgray">Building Name</div>
                                                                																																</div>
                                                                																																<div className="self-stretch flex-1 flex items-start justify-end gap-1 text-num-12 text-teal">
                                                                  																																	<div className="self-stretch rounded-num-8 overflow-hidden flex items-center justify-center py-2 px-3">
                                                                    																																		<div className="relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Reject</div>
                                                                  																																	</div>
                                                                  																																	<div className="self-stretch rounded-num-8 bg-lightcyan-200 overflow-hidden flex items-center justify-center py-2 px-3">
                                                                    																																		<b className="relative">Accept</b>
                                                                  																																	</div>
                                                                																																</div>
                                                              																															</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														</div>
                                                            																														<div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-dimgray font-inter">
                                                              																															<div className="w-[1273px] bg-whitesmoke-100 overflow-hidden flex items-center py-[19px] pl-[200px] pr-20 box-border shrink-0">
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
                                                            																														{isSetAvailableTimeOpen && (
                                                              																															<PortalPopup
                                                                																																overlayColor="rgba(113, 113, 113, 0.3)"
                                                                																																placement="Centered"
                                                                																																
                                                                																																
                                                                																																
                                                                																																
                                                                																																
                                                                																																onOutsideClick={closeSetAvailableTime}
                                                                																																>
                                                                																																<SetAvailableTime />
                                                                  																																	</PortalPopup>
                                                                  																																	)}</>);
                                                                  																																	};
                                                                  																																	
                                                                  																																	export default Visits ;
                                                                  																																	