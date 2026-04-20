import { FunctionComponent, useCallback } from 'react';
import SideBar from '../../components/SideBar';


const LeaseTransfer: FunctionComponent = () => {
  	
  	const onMessagesContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	
  	const onArrowUpClick = useCallback(() => {
    		const anchor = document.querySelector("[data-scroll-to='searchBarContainer']");
    		if(anchor) {
      			anchor.scrollIntoView({"block":"start","behavior":"smooth"})
    		}
  	}, []);
  	
  	return (
    		<div className="w-full h-[1024px] relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-[31.85px] text-darkslategray-200 font-buhun-retro-two-free">
      			<img className="w-[1440px] h-[1024px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt="" />
      			<div className="w-[1440px] h-[1536px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        				<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start">
          					<div className="self-stretch h-[1536px] flex items-start">
            						<div className="self-stretch w-[200px] flex items-start">
              							<SideBar />
            						</div>
            						<div className="h-[1112px] hidden flex-col items-center">
              							<div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            						</div>
            						<div className="self-stretch w-[1240px] flex flex-col items-start justify-between gap-0 text-num-14 text-darkslategray-100 font-lora">
              							<div className="self-stretch h-[1240px] flex flex-col items-start py-num-0 pl-num-32 pr-20 box-border">
                								<div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5" data-scroll-to="searchBarContainer">
                  									<div className="h-6 flex items-center gap-1.5">
                    										<div className="relative font-semibold">User Profile</div>
                    										<img className="h-6 w-6 relative" alt="" />
                    										<div className="relative font-semibold">Current Dorm</div>
                  									</div>
                  									<div className="w-[704px] rounded-num-12 bg-aliceblue overflow-hidden shrink-0 hidden items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                    										<img className="h-6 w-6 relative" alt="" />
                    										<b className="relative">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
                  									</div>
                  									<img className="h-6 w-6 relative" alt="" />
                  									<div className="relative font-semibold">Pasalo Unit</div>
                								</div>
                								<div className="self-stretch h-[1599px] rounded-2xl bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start py-num-32 px-num-0 gap-[21px] shrink-0 text-black">
                  									<div className="self-stretch h-[349px] flex flex-col items-start gap-3">
                    										<div className="w-[1128px] h-[196px] flex items-center justify-center py-num-0 px-[100px] box-border">
                      											<div className="h-[195px] w-[928px] rounded-num-12 border-whitesmoke-200 border-solid border-[1px] box-border flex items-center gap-2.5">
                        												<img className="h-[195px] w-[305px] rounded-tl-num-12 rounded-tr-num-0 rounded-br-num-0 rounded-bl-num-12 object-cover" alt="" />
                        												<div className="h-[195px] flex-1 rounded-2xl flex flex-col items-center py-num-0 px-num-12 box-border">
                          													<div className="w-full h-[195px] flex flex-col items-center justify-center gap-0.5 max-w-full">
                            														<div className="self-stretch flex flex-col items-start py-num-12 px-num-0 gap-0.5">
                              															<div className="self-stretch flex items-center justify-center text-[24px] font-inter">
                                																<b className="flex-1 relative">
                                  																	<span className="leading-8">
                                    																		<span>One Sapphire Place</span>
                                    																		<span className="text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{` `}</span>
                                  																	</span>
                                  																	<span className="text-[18px] tracking-[-0.01em] text-silver-200">- Room 31</span>
                                																</b>
                              															</div>
                              															<div className="self-stretch flex items-center py-num-0 px-num-12 gap-2">
                                																<img className="w-[9px] relative max-h-full" alt="" />
                                																<div className="flex items-center justify-center">
                                  																	<div className="relative font-medium">Batong Malake, Los Banos, Laguna</div>
                                																</div>
                              															</div>
                              															<div className="self-stretch flex items-center py-num-0 px-num-12 gap-[7px]">
                                																<img className="h-[9px] w-[9px] relative" alt="" />
                                																<div className="flex items-center justify-center">
                                  																	<div className="relative">
                                    																		<span className="font-medium">{`Quevin Custodio `}</span>
                                    																		<span className="text-[8px] tracking-[0.04em] font-semibold text-silver-200">Landlord</span>
                                  																	</div>
                                																</div>
                              															</div>
                              															<div className="self-stretch flex items-center py-num-0 px-num-12 gap-[7px]">
                                																<img className="h-[9px] w-[9px] relative" alt="" />
                                																<div className="flex items-center justify-center">
                                  																	<div className="relative">
                                    																		<span className="font-medium">{`Nathaniel Cunanan `}</span>
                                    																		<span className="text-[8px] tracking-[0.04em] font-semibold text-silver-200">Dorm Manager</span>
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
                    										<div className="self-stretch flex flex-col items-center py-6 px-num-32 text-center text-darkslategray-200 font-poppins">
                      											<div className="w-full flex items-center justify-center max-w-full">
                        												<div className="w-[924px] flex flex-col items-start py-[9px] px-num-0 box-border">
                          													<div className="flex items-start py-num-0 px-[58px]">
                            														<div className="w-[105.2px] flex flex-col items-center">
                              															<div className="w-9 h-9 relative rounded-[50%] bg-darkslategray-200" />
                              															<div className="self-stretch flex items-center justify-center">
                                																<div className="h-[35.6px] flex-1 relative leading-8 font-semibold flex items-center justify-center">Reason</div>
                              															</div>
                            														</div>
                            														<div className="w-[275.9px] flex flex-col items-start p-num-10 box-border ml-[-8px] relative">
                              															<div className="self-stretch h-[8.6px] relative rounded-[34.55px] [background:linear-gradient(90deg,_rgba(2,_67,_56,_0.8),_#b5c8c5)]" />
                            														</div>
                            														<div className="w-[87.8px] flex flex-col items-center gap-px ml-[-8px] relative">
                              															<div className="w-9 h-9 relative rounded-[50%] bg-silver-100" />
                              															<div className="self-stretch flex items-center justify-center">
                                																<div className="h-[35.6px] flex-1 relative font-semibold flex items-center justify-center">Documents</div>
                              															</div>
                            														</div>
                            														<div className="w-[290px] flex flex-col items-start p-num-10 box-border ml-[-8px] relative">
                              															<div className="self-stretch h-[8.6px] relative rounded-[34.55px] bg-silver-100" />
                            														</div>
                            														<div className="w-[81.3px] flex flex-col items-center gap-px ml-[-8px] relative">
                              															<div className="w-9 h-9 relative rounded-[50%] bg-silver-100" />
                              															<div className="self-stretch flex items-center justify-center">
                                																<div className="h-[35.6px] flex-1 relative font-semibold flex items-center justify-center">Finalize</div>
                              															</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                  									<div className="self-stretch h-[1165px] flex flex-col items-center gap-[18px] text-center text-crimson font-inter">
                    										<div className="w-[928px] flex flex-col items-start justify-center">
                      											<img className="self-stretch h-[84.1px] rounded-t-[16.04px] rounded-b-num-0 max-w-full overflow-hidden shrink-0 object-contain" alt="" />
                      											<img className="w-[930.1px] h-[582.3px] rounded-t-num-0 rounded-b-[10px] object-contain mt-[-4px] relative shrink-0" alt="" />
                    										</div>
                    										<div className="w-[875.9px] flex items-center justify-center pt-num-0 px-num-0 pb-[21.4px] box-border gap-[120px]">
                      											<div className="h-12 rounded-lg border-whitesmoke-200 border-solid border-[1px] box-border flex items-center justify-center py-1 px-4 cursor-pointer" onClick={onMessagesContainerClick}>
                        												<div className="relative leading-6 font-medium">Back</div>
                      											</div>
                      											<div className="h-12 w-[73px] rounded-lg bg-lightcyan flex items-center justify-center py-1 px-4 box-border cursor-pointer text-teal" onClick={onMessagesContainerClick}>
                        												<div className="h-[18.5px] w-[79.9px] relative leading-6 font-medium flex items-center justify-center shrink-0">Next</div>
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
          					<div className="w-[1440px] h-20 bg-white overflow-hidden shrink-0 hidden flex-col items-center justify-center">
            						<div className="w-[1273px] h-[82px] bg-whitesmoke-100 overflow-hidden shrink-0 flex items-center py-[19px] pl-[200px] pr-20 box-border" />
          					</div>
        				</div>
      			</div>
      			<div className="w-[60px] h-[60px] !!m-[0 important] absolute top-[890px] left-[1281px] rounded-[30px] [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] shrink-0 flex items-start p-[16.2px] box-border cursor-pointer z-[2]" onClick={onArrowUpClick}>
        				<img className="h-[27.7px] w-[27.7px] relative" alt="" />
      			</div>
    		</div>);
};

export default LeaseTransfer ;
