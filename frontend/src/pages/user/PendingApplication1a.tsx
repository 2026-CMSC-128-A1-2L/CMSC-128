import { FunctionComponent, useCallback } from 'react';
import {Icon} from '@iconify/react';
import Photo from "../../assets/photo.svg";
import Sidebar from '../../components/SideBar';
import Footer from '../../components/Footer'; 



const PendingApplication1a: FunctionComponent = () => {
  	
  	const onVERIFICATIONSTATUSContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      			<img className="w-[1440px] h-[1024px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt="" />
      			<div className="w-[1440px] h-[1312px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        				<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-num-0 pl-num-0 pr-20">
          					<div className="w-[1440px] flex-1 flex items-center shrink-0">
            						<div className="self-stretch w-[200px] flex items-start" >
                                        <Sidebar></Sidebar>
                                    </div>
            						<div className="h-[1112px] hidden flex-col items-center">
              							<div className="w-[106px] h-[924px] bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            						</div>
            						<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-between gap-0">
              							<div className="self-stretch flex-1 flex flex-col items-start py-num-0 pl-num-32 pr-20">
                								<div className="self-stretch h-[1012px] flex flex-col items-start">
                  									<div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                    										<div className="h-6 flex items-center gap-1.5">
                      											<div className="relative font-semibold">User Profile</div>
                      											<Icon icon = "iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                      											<div className="relative font-semibold">Current Dorm</div>
                    										</div>
                    										<div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                      											<img className="h-6 w-6 relative" alt="" />
                      											<b className="relative">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
                    										</div>
                  									</div>
                  									<div className="w-[1155px] h-[970.7px] rounded-num-16_38 bg-white flex flex-col items-start gap-[12.3px] shrink-0 text-center text-dimgray font-inter">
                    										<div className="w-[980px] h-[382px] rounded-2xl flex flex-col items-start gap-3">
                      											<div className="self-stretch rounded-2xl overflow-hidden flex flex-col items-start p-num-32">
                        												<div className="self-stretch flex flex-col items-start gap-2.5">
                          													<b className="relative">Student Profile</b>
                          													<b className="relative text-[24px] leading-8 text-darkslategray-200">Daphne Dayne</b>
                          													<b className="relative text-teal">dcanape@up.edu.ph</b>
                        												</div>
                      											</div>
                      											<div className="self-stretch overflow-hidden flex items-start justify-between py-1 px-num-32 gap-5">
                        												<img className="w-[200px] relative max-h-full object-cover" alt="" src = {Photo}/>
                        												<div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          													<div className="flex flex-col items-start gap-1">
                            														<b className="relative">Name</b>
                            														<b className="relative text-black">CANAPE, DAPHNE</b>
                          													</div>
                          													<div className="flex flex-col items-start gap-1">
                            														<div className="flex items-start gap-2">
                              															<b className="relative">Contact number</b>
                              															<Icon icon = "iconamoon:edit" className="w-5 relative max-h-full"  />
                            														</div>
                            														<b className="relative text-black">- - - - -</b>
                          													</div>
                          													<div className="flex flex-col items-start gap-1">
                            														<div className="flex items-start gap-2">
                              															<b className="relative">Home Address</b>
                              															<Icon icon = "iconamoon:edit" className="w-5 relative max-h-full"  />
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
                            														<b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Verified</b>
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
                              															<div className="h-[40.8px] w-[241px] rounded-[102.11px] flex items-center justify-center py-[11.2px] px-[76.6px] box-border cursor-pointer text-slategray" onClick={onVERIFICATIONSTATUSContainerClick}>
                                																<div className="relative font-semibold shrink-0">VERIFICATION STATUS</div>
                              															</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="self-stretch flex flex-col items-start text-[24.57px] text-darkslategray-100">
                        												<div className="self-stretch flex items-center py-num-0 px-[32.8px]">
                          													<div className="flex-1 flex items-center gap-[24.6px]">
                            														<b className="relative leading-[32.77px]">Your Pending Applications</b>
                            														<b className="relative text-num-14_34 text-dimgray">0 out of 5 Dorm Applications</b>
                          													</div>
                        												</div>
                        												<div className="self-stretch rounded-num-16_38 overflow-hidden flex flex-col items-start py-[24.6px] px-[32.8px] text-num-14_34 text-white">
                          													<div className="self-stretch rounded-num-16_38 bg-white border-whitesmoke border-solid border-[1px] flex flex-col items-start">
                            														<div className="self-stretch h-12 rounded-t-num-16_38 rounded-b-none bg-darkslategray-200 border-black border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start justify-center py-num-0 px-[24.6px]">
                              															<div className="w-[1041px] flex items-center py-[4.1px] px-num-0 box-border gap-[38px] shrink-0">
                                																<div className="h-num-65_5 w-[81.9px] relative font-medium flex items-center justify-center shrink-0">No.</div>
                                																<div className="h-num-65_5 w-[225.3px] relative font-medium flex items-center justify-center shrink-0">Listing</div>
                                																<div className="h-num-65_5 w-[253.9px] relative font-medium flex items-center justify-center shrink-0">Address</div>
                                																<div className="h-num-65_5 w-[122.9px] relative font-medium flex items-center justify-center shrink-0">Status</div>
                                																<div className="h-num-65_5 w-[204.8px] relative font-medium flex items-center justify-center shrink-0">Actions</div>
                              															</div>
                            														</div>
                            														<div className="self-stretch h-20 rounded-num-16_38 overflow-hidden shrink-0 flex flex-col items-center justify-center py-num-0 px-[24.6px] box-border text-[18.55px] text-teal">
                              															<div className="w-full overflow-hidden flex items-center justify-center py-[3.1px] px-[27.6px] box-border gap-[10.2px] max-w-full">
                                																<b className="relative cursor-pointer" onClick={onVERIFICATIONSTATUSContainerClick}>Browse Listings</b>
                                																<Icon icon = "mdi:arrow-top-right" className="w-[31.8px] relative max-h-full"  />
                              															</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center" >
                                            <Footer />
                                        </div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default PendingApplication1a ;
