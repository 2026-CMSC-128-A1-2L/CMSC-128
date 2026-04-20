import { FunctionComponent, useState, useCallback } from 'react';
// import ApplicationFinalizationPickingADorm from "../components/ApplicationFinalizationPickingADorm";
// import PortalPopup from "../components/PortalPopup";
import {Icon} from '@iconify/react'; 
import Photo from '../../assets/photo.svg';
import Verified from '../../assets/verified badge.svg'

const PendingApplicationPage1b: FunctionComponent = () => {
  	const [isApplicationFinalizationPickOpen, setApplicationFinalizationPickOpen] = useState(false);
  	
  	const openApplicationFinalizationPick = useCallback(() => {
    		setApplicationFinalizationPickOpen(true);
  	}, []);
  	
  	const closeApplicationFinalizationPick = useCallback(() => {
    		setApplicationFinalizationPickOpen(false);
  	}, []);
  	
  	
  	const onVERIFICATIONSTATUSContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (<>
    		<div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      			<img className="w-[1440px] h-[1024px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt="" />
      			<div className="w-[1440px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        				<div className="self-stretch overflow-hidden flex flex-col items-start py-num-0 pl-num-0 pr-20">
          					<div className="self-stretch flex items-start gap-8 shrink-0">
            						<div className="self-stretch w-num-200 flex items-start shrink-0" />
            						<div className="h-[1112px] hidden flex-col items-center shrink-0">
              							<div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            						</div>
            						<div className="flex-1 overflow-hidden flex flex-col items-start shrink-0">
              							<div className="self-stretch flex flex-col items-start">
                								<div className="self-stretch h-[1012px] flex flex-col items-start">
                  									<div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                    										<div className="h-6 flex items-center gap-1.5">
                      											<div className="relative font-semibold">User Profile</div>
                      											<Icon icon = "iconamoon:arrow-right-2" className="h-6 w-6 relative" alt="" />
                      											<div className="relative font-semibold">Current Dorm</div>
                    										</div>
                    										<div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-num-10 px-num-24 box-border gap-2.5 text-dimgray font-inter">
                      											<img className="h-6 w-6 relative" alt="" />
                      											<b className="relative">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
                    										</div>
                  									</div>
                  									<div className="self-stretch h-[948px] rounded-num-16 bg-white flex flex-col items-start gap-3 text-center text-dimgray font-inter">
                    										<div className="self-stretch h-[382px] rounded-num-16 flex flex-col items-start gap-3">
                      											<div className="self-stretch rounded-num-16 overflow-hidden flex flex-col items-start p-num-32">
                        												<div className="self-stretch flex flex-col items-start gap-2.5">
                          													<b className="relative">Student Profile</b>
                          													<div className="flex items-center justify-center gap-2.5 text-[24px] text-darkslategray-200">
                            														<b className="relative leading-8">Daphne Dayne</b>
                            														<img className="h-6 w-6 relative" alt="" src = {Verified}/>
                          													</div>
                          													<b className="relative text-teal">dcanape@up.edu.ph</b>
                        												</div>
                      											</div>
                      											<div className="self-stretch overflow-hidden flex items-start justify-between py-num-4 px-num-32 gap-5">
                        												<img className="w-num-200 relative max-h-full object-cover" alt="" src={Photo}/>
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
                            														<b className="relative text-teal">Verified</b>
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
                    										<div className="self-stretch flex flex-col items-start gap-12 text-white">
                      											<div className="self-stretch flex flex-col items-start">
                        												<div className="self-stretch flex flex-col items-center justify-center">
                          													<div className="w-[520px] h-12 relative">
                            														<div className="absolute h-[99.38%] w-[99.87%] top-[0%] right-[-0.25%] bottom-[0.62%] left-[0.38%] rounded-[99.72px] bg-aliceblue flex items-center justify-center p-num-4 box-border gap-1 shrink-0">
                              															<div className="h-[39.9px] w-[235.3px] rounded-[99.72px] bg-darkslategray-200 flex items-center justify-center p-num-4 box-border">
                                																<div className="relative font-semibold">CURRENT DORM</div>
                              															</div>
                              															<div className="h-[39.9px] w-[235.3px] rounded-[99.72px] flex items-center justify-center py-[11px] px-[74.8px] box-border cursor-pointer text-slategray" onClick={onVERIFICATIONSTATUSContainerClick}>
                                																<div className="relative font-semibold shrink-0">VERIFICATION STATUS</div>
                              															</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="self-stretch flex flex-col items-start text-[24px] text-darkslategray-100">
                        												<div className="self-stretch flex items-center py-num-0 px-num-32">
                          													<div className="flex-1 flex items-center gap-6">
                            														<b className="relative leading-8">Your Pending Applications</b>
                            														<b className="relative text-num-14 text-dimgray">2 out of 5 Dorm Applications</b>
                          													</div>
                        												</div>
                        												<div className="self-stretch rounded-num-16 overflow-hidden flex flex-col items-start py-num-24 px-num-32 text-num-14 text-black">
                          													<div className="self-stretch rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] flex flex-col items-start">
                            														<div className="self-stretch h-12 rounded-t-num-16 rounded-b-none bg-darkslategray-200 border-black border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start justify-center py-num-0 px-num-24 text-white">
                              															<div className="self-stretch flex items-center py-num-4 px-num-0 gap-[38px] shrink-0">
                                																<b className="h-16 w-20 relative leading-num-24 flex items-center justify-center shrink-0">No.</b>
                                																<b className="h-16 w-[220px] relative leading-num-24 flex items-center justify-center shrink-0">Listing</b>
                                																<b className="h-16 w-[248px] relative leading-num-24 flex items-center justify-center shrink-0">Address</b>
                                																<b className="h-16 w-[120px] relative leading-num-24 flex items-center justify-center shrink-0">Status</b>
                                																<b className="h-16 w-num-200 relative leading-num-24 flex items-center justify-center shrink-0">Actions</b>
                              															</div>
                            														</div>
                            														<div className="self-stretch bg-honeydew overflow-hidden flex flex-col items-start justify-center py-num-0 px-num-24">
                              															<div className="self-stretch flex items-center py-num-4 px-num-0 gap-[38.5px]">
                                																<b className="h-16 w-20 relative flex items-center justify-center shrink-0">1</b>
                                																<b className="h-16 w-[220px] relative flex items-center justify-center shrink-0">One Sapphire Place</b>
                                																<b className="h-16 w-[248px] relative flex items-center justify-center shrink-0">Batong Malake, Los Banos, Laguna</b>
                                																<b className="h-16 w-[120px] relative flex items-center justify-center shrink-0">Accepted</b>
                                																<div className="h-16 w-num-200 flex items-center justify-center py-num-4 px-num-0 box-border gap-2 shrink-0 text-[12px] text-teal">
                                  																	<div className="h-8 w-20 rounded-num-16 bg-lightcyan flex items-center justify-center py-2 px-4 box-border cursor-pointer" onClick={openApplicationFinalizationPick}>
                                    																		<div className="relative font-semibold">Finalize</div>
                                  																	</div>
                                  																	<div className="h-8 w-20 rounded-num-16 bg-gray border-crimson border-solid border-[1px] box-border flex items-center justify-center py-2 px-4 text-crimson">
                                    																		<div className="relative leading-num-24 font-semibold shrink-0">Cancel</div>
                                  																	</div>
                                																</div>
                              															</div>
                            														</div>
                            														<div className="self-stretch rounded-num-16 overflow-hidden flex flex-col items-start justify-center py-num-0 px-num-24">
                              															<div className="self-stretch flex items-center py-num-4 px-num-0 gap-[38.5px]">
                                																<div className="h-16 w-20 relative font-medium flex items-center justify-center shrink-0">2</div>
                                																<div className="h-16 w-[220px] relative font-medium flex items-center justify-center shrink-0">Women’s Dormitory</div>
                                																<div className="h-16 w-[248px] relative font-medium flex items-center justify-center shrink-0">University of the Philippines Los Banos</div>
                                																<div className="h-16 w-[120px] relative font-medium flex items-center justify-center shrink-0">Pending</div>
                                																<div className="h-16 w-num-200 flex items-center justify-center py-num-4 px-num-0 box-border gap-2 shrink-0 text-[12px] text-slategray">
                                  																	<div className="h-8 w-20 rounded-num-16 bg-aliceblue flex items-center justify-center py-2 px-4 box-border">
                                    																		<div className="relative font-semibold">Finalize</div>
                                  																	</div>
                                  																	<div className="h-8 w-20 rounded-num-16 bg-gray border-crimson border-solid border-[1px] box-border flex items-center justify-center py-2 px-4 text-crimson">
                                    																		<div className="relative leading-num-24 font-semibold shrink-0">Cancel</div>
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
              							</div>
            						</div>
          					</div>
          					<div className="w-[1440px] h-20 bg-white overflow-hidden shrink-0 hidden flex-col items-center justify-center">
            						<div className="w-[1273px] h-[82px] bg-whitesmoke-100 overflow-hidden shrink-0 flex items-center py-[19px] pl-[200px] pr-20 box-border" />
          					</div>
        				</div>
      			</div>
    		</div>
    		{isApplicationFinalizationPickOpen && (
      			<PortalPopup
        				overlayColor="rgba(0, 0, 0, 0.25)"
        				placement="Centered"
        				
        				
        				
        				
        				
        				onOutsideClick={closeApplicationFinalizationPick}
        				>
        				<ApplicationFinalizationPickingADorm onClose={closeApplicationFinalizationPick}/>
          					</PortalPopup>
          					)}</>);
          					};
          					
export default PendingApplicationPage1b ;
          					