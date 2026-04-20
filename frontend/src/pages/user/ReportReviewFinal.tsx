import { FunctionComponent, useCallback } from 'react';
import SideBar from '../../components/SideBar';
import AtlasLogo from '../../assets/atlas logo (for white bg).png';
import Checkpoint from '../../assets/checkpoint.svg';
import Icon from '../../assets/icon.svg';
import IconAMoonArrowRight2 from '../../assets/iconamoon_arrow-right-2.svg';
import IconAMoonEye from '../../assets/iconamoon_eye.svg';
import Icons8 from '../../assets/icons8_upload-2.svg';
import Image from '../../assets/image.png';
import Photo from '../../assets/photo.svg';
import Qlementine from '../../assets/qlementine-icons_menu-dots-16.svg';
import Vector from '../../assets/Vector.svg'
import Upload from '../utilities/Upload';

const ReportReviewFinal: FunctionComponent = () => {
  	
  	const onUserProfileTextClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className="w-full h-[1024px] relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      			<img className="w-[1440px] h-[1192px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt="" />
      			<div className="w-[1440px] h-[1192px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        				<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start">
          					<div className="self-stretch flex-1 flex items-center">
            						<div className="self-stretch w-[200px] flex items-start">
              							<SideBar />
            						</div>
            						<div className="h-[1112px] hidden flex-col items-center">
              							<div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            						</div>
            						<div className="self-stretch w-[1128px] flex flex-col items-start justify-between gap-0">
              							<div className="self-stretch flex flex-col items-start py-num-0 pl-num-32 pr-20">
                								<div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                  									<div className="h-6 flex items-center gap-1.5">
                    										<div className="relative font-semibold cursor-pointer" onClick={onUserProfileTextClick}>User Profile</div>
                    										<img className="h-6 w-6 relative" alt="" src={IconAMoonArrowRight2}/>
                    										<div className="relative font-semibold cursor-pointer" onClick={onUserProfileTextClick}>Current Dorm</div>
                    										<img className="h-6 w-6 relative" alt="" src={IconAMoonArrowRight2}/>
                    										<div className="relative font-semibold">Report</div>
                  									</div>
                  									<div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                    										<img className="h-6 w-6 relative" alt="" />
                    										<b className="relative">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
                  									</div>
                								</div>
                								<div className="self-stretch h-[800px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start py-num-32 px-num-0 gap-[21px] text-black">
                  									<div className="self-stretch h-[349px] flex flex-col items-start gap-3 shrink-0">
                    										<div className="w-[1128px] h-[196px] flex items-center justify-center py-num-0 px-[100px] box-border shrink-0">
                      											<div className="h-[195px] w-[928px] rounded-xl border-whitesmoke-200 border-solid border-[1px] box-border flex items-center gap-2.5">
                        												<img className="h-[195px] w-[305px] rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl object-cover" alt="" src={Image}/>
                        												<div className="h-[195px] flex-1 rounded-num-16 flex flex-col items-center py-num-0 px-num-12 box-border">
                          													<div className="w-full h-[195px] flex flex-col items-center justify-center gap-0.5 max-w-full">
                            														<div className="self-stretch flex flex-col items-start py-num-12 px-num-0 gap-0.5">
                              															<div className="self-stretch flex items-center justify-center text-[24px] font-inter">
                                																<b className="flex-1 relative leading-8">{`One Sapphire Place `}</b>
                              															</div>
                              															<div className="self-stretch flex items-center py-num-0 px-num-12 gap-2">
                                																<img className="w-[9px] relative max-h-full" alt="" src={Icon}/>
                                																<div className="flex items-center justify-center">
                                  																	<div className="relative font-medium">Batong Malake, Los Banos, Laguna</div>
                                																</div>
                              															</div>
                              															<div className="self-stretch flex items-center py-num-0 px-num-12 gap-[7px]">
                                																<img className="h-[9px] w-[9px] relative" alt="" src={Vector}/>
                                																<div className="flex items-center justify-center">
                                  																	<div className="relative">
                                    																		<span className="font-medium">{`Quevin Custodio `}</span>
                                    																		<span className="text-[8px] tracking-[0.04em] font-semibold text-silver">Landlord</span>
                                  																	</div>
                                																</div>
                              															</div>
                              															<div className="self-stretch flex items-center py-num-0 px-num-12 gap-[7px]">
                                																<img className="h-[9px] w-[9px] relative" alt="" src={Vector}/>
                                																<div className="flex items-center justify-center">
                                  																	<div className="relative">
                                    																		<span className="font-medium">{`Nathaniel Cunanan `}</span>
                                    																		<span className="text-[8px] tracking-[0.04em] font-semibold text-silver">Dorm Manager</span>
                                  																	</div>
                                																</div>
                              															</div>
                            														</div>
                            														<div className="self-stretch flex items-start py-4 px-num-0 gap-2 text-center text-[14.26px] text-darkslategray-200">
                              															<div className="h-[42.8px] w-[118.6px] relative">
                                																<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[8.91px] bg-lightcyan border-teal border-solid border-[0.9px] box-border" />
                                																<div className="absolute h-[56.31%] w-[81.2%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">Single Room</div>
                              															</div>
                              															<div className="h-[42px] w-[74px] relative">
                                																<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[8.91px] bg-lightcyan border-teal border-solid border-[0.9px] box-border" />
                                																<div className="absolute h-[56.19%] w-[81.22%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">~18 sqm</div>
                              															</div>
                              															<div className="h-[42px] w-[268px] relative">
                                																<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[8.91px] bg-lightcyan border-teal border-solid border-[0.9px] box-border" />
                                																<div className="absolute h-[56.19%] w-[81.19%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">Contract: April 2026 - April 2027</div>
                              															</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center py-6 px-num-32 shrink-0 text-center text-darkslategray-200 font-poppins">
                      											<div className="w-full flex items-center justify-center max-w-full">
                        												<div className="h-[93.9px] w-[784px] relative">
                          													<div className="absolute h-[9.16%] w-[32.64%] top-[29.9%] right-[56.29%] bottom-[60.94%] left-[11.07%] rounded-[34.55px] bg-darkslategray-200" />
                          													<div className="absolute h-[37.91%] w-[13.42%] top-[51.75%] left-[0%] leading-8 font-semibold flex items-center justify-center">Information</div>
                          													<div className="absolute h-[37.91%] w-[10.37%] top-[51.75%] left-[88.93%] font-semibold flex items-center justify-center">Finalize</div>
                          													<div className="absolute h-[37.91%] w-[11.2%] top-[51.75%] left-[43.71%] font-semibold flex items-center justify-center">Reviewing</div>
                          													<div className="absolute h-[9.16%] w-[34.44%] top-[26.45%] right-[10.65%] bottom-[64.39%] left-[54.91%] rounded-[34.55px] bg-darkslategray-200" />
                          													<div className="absolute h-[37.91%] w-[4.57%] top-[12.65%] right-[48.41%] bottom-[49.44%] left-[47.03%] rounded-[50%] bg-darkslategray-200" />
                          													<div className="absolute h-[37.91%] w-[4.57%] top-[12.65%] right-[3.59%] bottom-[49.44%] left-[91.84%] rounded-[50%] bg-darkslategray-200" />
                          													<div className="absolute h-[37.91%] w-[4.57%] top-[13.8%] right-[91.01%] bottom-[48.29%] left-[4.43%] rounded-[50%] bg-darkslategray-200" />
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className="self-stretch h-[405px] flex flex-col items-center gap-[18px] shrink-0 text-darkslategray-100 font-inter">
                    										<div className="self-stretch flex flex-col items-start">
                      											<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32">
                        												<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                          													<div className="self-stretch flex items-center py-num-0 pl-num-0 pr-6">
                            														<div className="flex-1 flex items-center gap-8">
                              															<b className="relative">Review Photo 1</b>
                              															<div className="h-8 w-[118px] rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                                																<b className="relative text-transparent !bg-clip-text [background:linear-gradient(0deg,_#ffc273,_#fa7900)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] shrink-0">Not - Required</b>
                              															</div>
                            														</div>
                            														<div className="w-[72px] flex items-center gap-6">
                              															<img className="h-6 w-6 relative" alt="" src={IconAMoonEye}/>
                              															<img className="h-6 w-6 relative" alt="" src={Qlementine}/>
                            														</div>
                          													</div>
                          													<div className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden shrink-0 flex items-center py-num-12 px-4 text-black">
                            														<div className="h-16 flex items-center gap-6">
                              															<img className="h-16 w-16 relative" alt="" src={Icons8}/>
                              															<div className="flex flex-col items-start justify-center gap-2">
                                																<b className="relative">Upload the document</b>
                                																<div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">{`.jpg or .png `}</div>
                              															</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32">
                      											<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                        												<div className="self-stretch flex items-center py-num-0 pl-num-0 pr-6">
                          													<div className="flex-1 flex items-center gap-8">
                            														<b className="relative">Review Photo 2</b>
                            														<div className="h-8 w-[118px] rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                              															<b className="relative text-transparent !bg-clip-text [background:linear-gradient(0deg,_#ffc273,_#fa7900)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] shrink-0">Not - Required</b>
                            														</div>
                          													</div>
                          													<div className="w-[72px] flex items-center gap-6">
                            														<img className="h-6 w-6 relative" alt="" src={IconAMoonEye}/>
                            														<img className="h-6 w-6 relative" alt="" src={Qlementine}/>
                          													</div>
                        												</div>
                        												<div className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden shrink-0 flex items-center py-num-12 px-4 text-black">
                          													<div className="h-16 flex items-center gap-6">
                            														<img className="h-16 w-16 relative" alt="" src={Icons8}/>
                            														<div className="flex flex-col items-start justify-center gap-2">
                              															<b className="relative">Upload the document</b>
                              															<div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">{`.jpg or .png `}</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="h-8 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-4 box-border cursor-pointer text-center text-teal" onClick={onUserProfileTextClick}>
                      											<b className="relative">Proceed</b>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-dimgray font-inter">
                								<div className="w-[1273px] bg-whitesmoke-100 overflow-hidden flex items-center py-[19px] pl-[200px] pr-20 box-border shrink-0">
                  									<div className="flex-1 flex items-center gap-20">
                    										<div className="flex items-center gap-4">
                      											<div className="flex items-center gap-2">
                        												<img className="w-12 relative max-h-full object-cover" alt="" src={AtlasLogo}/>
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
          					<div className="w-[1440px] h-20 bg-white overflow-hidden shrink-0 hidden flex-col items-center justify-center">
            						<div className="w-[1273px] h-[82px] bg-whitesmoke-100 overflow-hidden shrink-0 flex items-center py-[19px] pl-[200px] pr-20 box-border" />
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default ReportReviewFinal ;
