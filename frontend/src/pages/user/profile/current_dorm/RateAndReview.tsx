<<<<<<< HEAD
import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Location from '../../../../../assets/pin_location_icon.svg';
import House from '../../../../../assets/house_icon.svg';
import SideBar from '../../../../components/user/SideBar';
import BreadcrumbHeader from '../../../../components/general/Breadcrumb';
=======
import { type FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Location from "../../../../../assets/pin_location_icon.svg";
import House from "../../../../../assets/house_icon.svg";
import SideBar from "../../../../components/user/SideBar";
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
const RateAndReview: FunctionComponent = () => {
  const navigate = useNavigate();

  const onUserProfileTextClick = useCallback(() => {
    navigate('/rate-review-form');
  }, [navigate]);

  return (
    <div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      {/* <img className="w-[1440px] h-[1192px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt=""/> */}
      <div className="w-full max-w-[1440px] min-h-screen overflow-hidden flex flex-col items-start z-[1] mx-auto">
        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-num-0 pl-num-0 pr-20">
          <div className="w-[1440px] flex-1 flex items-center shrink-0">
            <div className="fixed top-0 left-0 h-full w-[200px] hidden md:block z-10">
              <SideBar />
            </div>
            {/* <SideBar /> */}
            <div className="h-[1112px] hidden flex-col items-center">
              <div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-2.5" />
            </div>
            <div className="self-stretch w-[1240px] flex flex-col items-start justify-between gap-0">
              <div className="self-stretch flex flex-col items-start py-num-0 pl-num-32 pr-20">
                <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-2.5 box-border gap-2.5">
                  <div className="h-6 flex items-center gap-1.5">
                    <div
                      className="self-stretch w-[79px] relative font-semibold flex items-center shrink-0 cursor-pointer"
                      onClick={onUserProfileTextClick}
                    >
                      User Profile
                    </div>
                    <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />

                    <div
                      className="self-stretch w-[95px] relative font-semibold flex items-center shrink-0 cursor-pointer"
                      onClick={onUserProfileTextClick}
                    >
                      Current Dorm
                    </div>

                    <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                    <div className="self-stretch w-[94px] relative font-semibold flex items-center shrink-0">{`Rate & Review`}</div>
                  </div>
                  <div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-2.5 px-6 box-border gap-2.5 text-dimgray font-inter">
                    <img className="h-6 w-6 relative" alt="" />
                    <b className="relative">
                      Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
                    </b>
                  </div>
                </div>
                <div className="self-stretch h-[800px] rounded-2xl bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start py-num-32 px-num-0 gap-[27px] text-black">
                  <div className="self-stretch flex flex-col items-start gap-3 shrink-0">
                    <div className="w-[1128px] h-[196px] flex items-center justify-center py-num-0 px-[100px] box-border">
                      <div className="h-[195px] w-[928px] rounded-xl border-whitesmoke-200 border-solid border-[1px] box-border flex items-center gap-2.5">
                        <img
                          className="h-[195px] w-[305px] rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl object-cover"
                          alt=""
                        />
                        <div className="h-[195px] flex-1 rounded-2xl flex flex-col items-center py-num-0 px-num-12 box-border">
                          <div className="w-full h-[195px] flex flex-col items-center justify-center gap-0.5 max-w-full">
                            <div className="self-stretch flex flex-col items-start py-num-12 px-num-0 gap-0.5">
                              <div className="self-stretch flex items-center justify-center text-[24px] font-inter">
                                <b className="flex-1 relative leading-8">{`One Sapphire Place `}</b>
                              </div>
                              <div className="self-stretch flex items-center py-num-0 px-num-12 gap-2">
                                <img
                                  className="w-[9px] relative max-h-full"
                                  alt=""
                                  src={Location}
                                />
                                <div className="flex items-center justify-center">
                                  <div className="relative font-medium text-[14px]">
                                    Batong Malake, Los Banos, Laguna
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch flex items-center py-num-0 px-num-12 gap-[7px]">
                                <img className="h-[9px] w-[9px] relative" alt="" src={House} />
                                <div className="flex items-center justify-center">
                                  <div className="relative">
                                    <span className="font-medium">{`Quevin Custodio `}</span>
                                    <span className="text-[8px] tracking-[0.04em] font-semibold text-silver-200">
                                      Landlord
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch flex items-center py-num-0 px-num-12 gap-[7px]">
                                <img className="h-[9px] w-[9px] relative" alt="" src={House} />
                                <div className="flex items-center justify-center">
                                  <div className="relative">
                                    <span className="font-medium">{`Nathaniel Cunanan `}</span>
                                    <span className="text-[8px] tracking-[0.04em] font-semibold text-silver-200">
                                      Dorm Manager
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="self-stretch flex items-start py-4 px-num-0 gap-2 text-center text-[14.26px] text-darkslategray-200">
                              <div className="h-[42.8px] w-[118.6px] relative">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[8.91px] bg-lightcyan border-teal border-solid border-[0.9px] box-border" />
                                <div className="absolute h-[56.31%] w-[81.2%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                  Single Room
                                </div>
                              </div>
                              <div className="h-[42px] w-[74px] relative">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[8.91px] bg-lightcyan border-teal border-solid border-[0.9px] box-border" />
                                <div className="absolute h-[56.19%] w-[81.22%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                  ~18 sqm
                                </div>
                              </div>
                              <div className="h-[42px] w-[268px] relative">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[8.91px] bg-lightcyan border-teal border-solid border-[0.9px] box-border" />
                                <div className="absolute h-[56.19%] w-[81.19%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                  Contract: April 2026 - April 2027
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center py-6 px-num-32 gap-[25px] text-center text-darkslategray-200 font-poppins">
                      <div className="self-stretch flex items-center justify-center">
                        <div className="h-[93.9px] w-[784px] relative">
                          <div className="absolute h-[9.16%] w-[32.64%] top-[29.9%] right-[56.29%] bottom-[60.94%] left-[11.07%] rounded-[34.55px] [background:linear-gradient(90deg,_rgba(2,_67,_56,_0.8),_#b5c8c5)]" />
                          <div className="absolute h-[37.91%] w-[13.42%] top-[51.75%] left-[0%] leading-8 font-semibold flex items-center justify-center">
                            Information
                          </div>
                          <div className="absolute h-[37.91%] w-[10.37%] top-[51.75%] left-[88.93%] font-semibold flex items-center justify-center">
                            Finalize
                          </div>
                          <div className="absolute h-[37.91%] w-[11.2%] top-[51.75%] left-[43.71%] font-semibold flex items-center justify-center">
                            Reviewing
                          </div>
                          <div className="absolute h-[9.16%] w-[34.44%] top-[26.45%] right-[10.65%] bottom-[64.39%] left-[54.91%] rounded-[34.55px] bg-silver-100" />
                          <div className="absolute h-[37.91%] w-[4.57%] top-[12.65%] right-[48.41%] bottom-[49.44%] left-[47.03%] rounded-[50%] bg-silver-100" />
                          <div className="absolute h-[37.91%] w-[4.57%] top-[12.65%] right-[3.59%] bottom-[49.44%] left-[91.84%] rounded-[50%] bg-silver-100" />
                          <div className="absolute h-[37.91%] w-[4.57%] top-[13.8%] right-[91.01%] bottom-[48.29%] left-[4.43%] rounded-[50%] bg-darkslategray-200" />
                        </div>
                      </div>
                      <div className="self-stretch overflow-hidden flex items-center justify-center py-num-0 px-20 text-darkslategray-100 font-inter font-medium text-[14px]">
                        <div className="flex-1 relative font-medium">
                          Your experience matters! Help future residents find their perfect home by
                          sharing your honest thoughts. This quick three-step process ensures your
                          review provides the most helpful insights for the community.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-[340px] flex flex-col items-center gap-[82px] shrink-0 text-[20px]">
                    <div className="self-stretch flex flex-col items-center justify-center py-num-12 px-num-32">
                      <div className="w-[714px] h-[147px] relative">
                        <div className="absolute top-[-0.99px] left-[0px] w-[714.5px] flex flex-col items-start justify-center gap-[21px]">
                          <div className="w-[268px] h-[12.6px] relative">
                            <b className="absolute h-full w-full top-[0%] left-[0%] flex items-center">
                              Frequently Asks Questions:
                            </b>
                          </div>
                          <div className="self-stretch flex flex-col items-start gap-[17px] text-num-14">
                            <div className="self-stretch flex items-center gap-[21px]">
                              <div className="h-[45.3px] w-[346.7px] relative">
                                <button className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] p-0 m-0 border-none bg-transparent cursor-pointer group">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-whitesmoke-200 transition-colors group-hover:bg-[#e0e0e0]" />
                                  <b className="absolute h-[59.6%] w-[95.04%] top-[19%] left-[4.97%] flex items-center text-left text-black font-lora">
                                    What will happen next?
                                  </b>
                                </button>
                              </div>
                              <div className="h-[45.3px] w-[346.7px] relative">
                                <button className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] p-0 m-0 border-none bg-transparent cursor-pointer group">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-whitesmoke-200 transition-colors group-hover:bg-[#e0e0e0]" />
                                  <b className="absolute h-[59.6%] w-[95.04%] top-[19%] left-[4.97%] flex items-center text-left text-black font-lora">
                                    What will happen next?
                                  </b>
                                </button>
                              </div>
                            </div>
                            <div className="self-stretch flex items-center gap-[21px]">
                              <div className="h-[45.3px] w-[346.7px] relative">
                                <button className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] p-0 m-0 border-none bg-transparent cursor-pointer group">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-whitesmoke-200 transition-colors group-hover:bg-[#e0e0e0]" />
                                  <b className="absolute h-[59.6%] w-[95.04%] top-[19%] left-[4.97%] flex items-center text-left text-black font-lora">
                                    What will happen next?
                                  </b>
                                </button>
                              </div>
                              <div className="h-[45.3px] w-[346.7px] relative">
                                <button className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] p-0 m-0 border-none bg-transparent cursor-pointer group">
                                  <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-whitesmoke-200 transition-colors group-hover:bg-[#e0e0e0]" />
                                  <b className="absolute h-[59.6%] w-[95.04%] top-[19%] left-[4.97%] flex items-center text-left text-black font-lora">
                                    What will happen next?
                                  </b>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex items-center justify-center gap-4 text-center text-num-14 text-teal font-inter">
                      <div
                        className="h-8 rounded-2xl flex items-center justify-center py-num-0 px-4 box-border cursor-pointer"
                        onClick={() => navigate(-1)}
                      >
                        <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                          Go Back
                        </b>
                      </div>
                      <div
                        className="h-8 rounded-2xl bg-aliceblue flex items-center justify-center py-num-0 px-4 box-border cursor-pointer"
                        onClick={() => navigate('/rate-review-form')}
                      >
                        <b className="relative">Proceed</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-dimgray font-inter">
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
											</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateAndReview;
