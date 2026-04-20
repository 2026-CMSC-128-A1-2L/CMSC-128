import { FunctionComponent, useState, useCallback } from 'react';
import FinalizationOfApplication from '../../components/FinalizationOfApplication';
import PortalPopup from '../../components/PortalPopup';
import {Icon} from '@iconify/react';
import Verified from "../../../assets/verified_badge.svg";
import Photo from "../../assets/photo.svg";
import Arrow from "../../../assets/Arrow up.svg";
import Sidebar from '../../components/SideBar';
import Footer from '../../components/Footer'; 


const FinalizedApplication3: FunctionComponent = () => {
  	const [isFinalizationOfApplicationOpen, setFinalizationOfApplicationOpen] = useState(false);
  	
  	const openFinalizationOfApplication = useCallback(() => {
    		setFinalizationOfApplicationOpen(true);
  	}, []);
  	
  	const closeFinalizationOfApplication = useCallback(() => {
    		setFinalizationOfApplicationOpen(false);
  	}, []);
  	
  	
  	const onArrowUpClick = useCallback(() => {
    		const anchor = document.querySelector("[data-scroll-to='searchBarContainer']");
    		if(anchor) {
      			anchor.scrollIntoView({"block":"start","behavior":"smooth"})
    		}
  	}, []);
  	
  	return (<>
    		<div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      			<img className="w-[1440px] h-[1024px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt="" />
      			<div className="w-[1440px] h-[1512px] overflow-hidden shrink-0 flex flex-col items-start relative isolate z-[1]">
        				<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-num-0 pl-num-0 pr-20 z-[0]">
          					<div className="w-[1440px] flex-1 flex items-center shrink-0">
            						<div className="self-stretch w-[200px] flex items-start" >
                                        <Sidebar />
                                    </div>
            						<div className="h-[1112px] hidden flex-col items-center">
              							<div className="w-[106px] h-[924px] bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            						</div>
            						<div className="self-stretch w-[1240px] flex flex-col items-start justify-between gap-0">
              							<div className="self-stretch flex flex-col items-start py-num-0 pl-num-32 pr-20">
                								<div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5" data-scroll-to="searchBarContainer">
                  									<div className="h-6 flex items-center gap-1.5">
                    										<div className="relative font-semibold">User Profile</div>
                    										<Icon icon = "iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                    										<div className="relative font-semibold">Current Dorm</div>
                  									</div>
                  									<div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-num-10 px-num-24 box-border gap-2.5 text-dimgray font-inter">
                    										<img className="h-6 w-6 relative" alt="" />
                    										<b className="relative">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
                  									</div>
                								</div>
                								<div className="self-stretch h-[1236px] rounded-num-16 bg-white flex flex-col items-start gap-3 text-center text-dimgray font-inter">
                  									<div className="self-stretch h-[382px] rounded-num-16 flex flex-col items-start gap-3">
                    										<div className="self-stretch rounded-num-16 overflow-hidden flex flex-col items-start p-num-32">
                      											<div className="self-stretch flex flex-col items-start gap-2.5">
                        												<b className="relative">Student Profile</b>
                        												<div className="flex items-center justify-center gap-2.5 text-[24px] text-darkslategray-200">
                          													<b className="relative leading-num-32">Daphne Dayne</b>
                          													<img className="h-6 w-6 relative" alt="" src = {Verified}/>
                        												</div>
                        												<b className="relative text-teal-200">dcanape@up.edu.ph</b>
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
                          													<b className="relative text-teal-200">Verified</b>
                        												</div>
                      											</div>
                      											<div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                        												<div className="flex flex-col items-start gap-1">
                          													<b className="relative">Current Dorm</b>
                          													<b className="relative text-black">One Sapphire Place</b>
                          													<div className="flex items-center gap-1 text-num-12">
                            														<div className="relative font-medium text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c29722,_#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Pending</div>
                            														<Icon icon = "solar:arrow-right-up-linear" className="w-4 relative max-h-full" />
                          													</div>
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
                  									<div className="self-stretch flex flex-col items-start gap-3 text-left text-darkslategray-100">
                    										<div className="self-stretch flex flex-col items-start gap-6 text-center text-white">
                      											<div className="self-stretch flex flex-col items-center justify-center gap-12">
                        												<div className="w-[520px] h-12 relative">
                          													<div className="absolute h-[99.38%] w-[99.87%] top-[0%] right-[-0.25%] bottom-[0.62%] left-[0.38%] rounded-[99.72px] bg-white flex items-center justify-center p-1 box-border gap-1 shrink-0">
                            														<div className="h-[39.9px] w-[235.3px] rounded-[99.72px] bg-darkslategray-200 flex items-center justify-center p-1 box-border">
                              															<div className="relative font-semibold">CURRENT DORM</div>
                            														</div>
                            														<div className="h-[39.9px] w-[235.3px] rounded-[99.72px] flex items-center justify-center py-[11px] px-[74.8px] box-border text-slategray">
                              															<div className="relative font-semibold shrink-0">VERIFICATION STATUS</div>
                            														</div>
                          													</div>
                        												</div>
                        												<div className="self-stretch h-8 flex items-center justify-center py-num-0 px-num-32 box-border gap-6 text-[24px] text-darkslategray-100">
                          													<b className="relative leading-num-32">Finalize Your Application</b>
                          													<div className="relative text-num-12 [text-decoration:underline] font-medium text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Cancel</div>
                        												</div>
                      											</div>
                      											<div className="self-stretch flex flex-col items-center justify-center text-darkslategray-200 font-poppins">
                        												<div className="w-[784px] h-[92px] relative">
                          													<div className="absolute h-[9.24%] w-[32.64%] top-[29.89%] right-[56.29%] bottom-[60.88%] left-[11.07%] rounded-[34.55px] bg-darkslategray-200" />
                          													<div className="absolute h-[37.93%] w-[13.42%] top-[51.72%] left-[0%] leading-num-32 font-semibold flex items-center justify-center">Information</div>
                          													<div className="absolute h-[37.93%] w-[10.37%] top-[51.72%] left-[88.93%] font-semibold flex items-center justify-center">Finalize</div>
                          													<div className="absolute h-[37.93%] w-[11.2%] top-[51.72%] left-[43.71%] font-semibold flex items-center justify-center">Reviewing</div>
                          													<div className="absolute h-[9.24%] w-[34.44%] top-[26.44%] right-[10.65%] bottom-[64.32%] left-[54.91%] rounded-[34.55px] [background:linear-gradient(90deg,_rgba(2,_67,_56,_0.8),_#b5c8c5)]" />
                          													<div className="absolute h-[37.93%] w-[4.57%] top-[12.64%] right-[48.41%] bottom-[49.42%] left-[47.03%] rounded-[50%] bg-darkslategray-200" />
                          													<div className="absolute h-[37.93%] w-[4.57%] top-[12.64%] right-[3.59%] bottom-[49.42%] left-[91.84%] rounded-[50%] bg-silver" />
                          													<div className="absolute h-[37.93%] w-[4.57%] top-[13.79%] right-[91.01%] bottom-[48.27%] left-[4.43%] rounded-[50%] bg-darkslategray-200" />
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex items-center py-num-0 px-num-32 gap-6 text-center text-[24px]">
                      											<div className="flex-1 flex items-center gap-6">
                        												<div className="flex items-center gap-3">
                          													<Icon icon = "material-symbols:info-outline" className="h-6 w-6 relative" />
                          													<b className="relative leading-num-32">Required Documents</b>
                        												</div>
                        												<b className="relative text-num-14 text-dimgray">3 out of 3 Documents Approved</b>
                      											</div>
                      											<div className="h-8 w-24 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-num-12 box-border cursor-pointer text-num-14 text-teal-200" onClick={openFinalizationOfApplication}>
                        												<div className="h-8 w-24 rounded-num-16 bg-lightcyan flex items-center justify-center py-num-0 px-num-12 box-border shrink-0">
                          													<b className="relative">Finish</b>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32">
                      											<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                        												<div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-num-24 gap-0">
                          													<div className="flex-1 flex items-center gap-4">
                            														<b className="relative">Official University ID</b>
                            														<div className="h-8 w-24 rounded-num-16 bg-lightcyan flex items-center justify-center py-num-0 px-num-12 box-border text-center text-teal-200">
                              															<b className="relative">Approved</b>
                            														</div>
                          													</div>
                          													<div className="flex items-center gap-6">
                            														<Icon icon = "iconamoon:eye" className="h-6 w-6 relative"  />
                                                                                    <Icon icon = "qlementine-icons:menu-dots-16" className="h-6 w-6 relative" />

                          													</div>
                        												</div>
                        												<div className="w-[852px] h-[88px] overflow-hidden shrink-0 flex items-center py-num-12 px-num-0 box-border gap-2.5 text-black">
                          													<Icon icon= "material-symbols:image-outline-rounded" className= "h-16 w-16 relative" />
                          													<div className="flex flex-col items-start justify-center gap-2">
                            														<b className="relative">id.png</b>
                            														<div className="relative text-num-12 tracking-[0.02em] font-semibold font-lora text-slategray">Submitted: 02 April 2026</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32">
                      											<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                        												<div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-num-24 gap-0">
                          													<div className="flex-1 flex items-center gap-6">
                            														<div className="flex items-center gap-4">
                              															<b className="relative">Parental Consent Form</b>
                              															<div className="h-8 w-24 rounded-num-16 bg-lightcyan flex items-center justify-center py-num-0 px-num-12 box-border text-center text-teal-200">
                                																<b className="relative">Approved</b>
                              															</div>
                            														</div>
                            														<div className="rounded-num-16 overflow-hidden flex items-center py-num-10 px-4 gap-1 text-center text-num-12 text-teal-200">
                              															<b className="relative">Download Consent Form</b>
                              															<Icon icon= "material-symbols:download-rounded" className="h-5 w-5 relative"  />
                            														</div>
                          													</div>
                          													<div className="overflow-hidden flex items-center gap-6">
                            														<Icon icon = "iconamoon:eye" className="h-6 w-6 relative"  />
                                                                                    <Icon icon = "qlementine-icons:menu-dots-16" className="h-6 w-6 relative" />
                          													</div>
                        												</div>
                        												<div className="self-stretch flex items-center justify-center text-black">
                          													<div className="flex-1 overflow-hidden flex items-center py-num-12 px-num-0 box-border gap-2.5 max-w-full">
                            														<Icon icon= "mingcute:pdf-line" className= "h-16 w-16 relative" />
                            														<div className="flex flex-col items-start justify-center gap-2">
                              															<b className="relative">consent_form.pdf</b>
                              															<div className="relative text-num-12 tracking-[0.02em] font-semibold font-lora text-slategray">Submitted: 02 April 2026</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32">
                      											<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                        												<div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-num-24 gap-5">
                          													<div className="w-[492px] flex items-center gap-6">
                            														<div className="flex items-center gap-4">
                              															<b className="relative">Tenancy Contract</b>
                              															<div className="h-8 w-24 rounded-num-16 bg-lightcyan flex items-center justify-center py-num-0 px-num-12 box-border text-center text-teal-200">
                                																<b className="relative">Approved</b>
                              															</div>
                            														</div>
                            														<div className="rounded-num-16 overflow-hidden flex items-center py-num-10 px-4 gap-1 text-center text-num-12 text-teal-200">
                              															<b className="relative">Download Tenancy Contract</b>
                              															<Icon icon= "material-symbols:download-rounded" className="h-5 w-5 relative"  />
                            														</div>
                          													</div>
                          													<div className="flex items-center gap-6">
                            														<Icon icon = "iconamoon:eye" className="h-6 w-6 relative"  />
                                                                                    <Icon icon = "qlementine-icons:menu-dots-16" className="h-6 w-6 relative" />
                          													</div>
                        												</div>
                        												<div className="w-[852px] overflow-hidden flex items-center py-num-12 px-num-0 box-border gap-2.5 text-black">
                          													<Icon icon= "mingcute:pdf-line" className= "h-16 w-16 relative" />
                          													<div className="flex flex-col items-start justify-center gap-2">
                            														<b className="relative">tenancy_contract.pdf</b>
                            														<div className="relative text-num-12 tracking-[0.02em] font-semibold font-lora text-slategray">Submitted: 02 April 2026</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center" />
            						</div>
          					</div>
        				</div>
        				<div className="w-[60px] h-[60px] !!m-[0 important] absolute top-[890px] left-[1281px] rounded-[30px] [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex items-start p-[16.2px] box-border cursor-pointer z-[1]" onClick={onArrowUpClick}>
          					<img className="h-[27.7px] w-[27.7px] relative" src={Arrow} />
        				</div>
      			</div>
      			<div className="w-[60px] h-[60px] !!m-[0 important] absolute top-[1522px] left-[0px] rounded-[30px] [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] shrink-0 flex items-start p-[16.2px] box-border z-[2]">
        				<img className="h-[27.7px] w-[27.7px] relative" alt="" />
      			</div>
    		</div>
    		{isFinalizationOfApplicationOpen && (
      			<PortalPopup
        				overlayColor="rgba(0, 0, 0, 0.25)"
        				placement="Centered"
        				
        				
        				
        				
        				
        				onOutsideClick={closeFinalizationOfApplication}
        				>
        				<FinalizationOfApplication onClose={closeFinalizationOfApplication}/>
          					</PortalPopup>
          					)}</>);
          					};
          					
          					export default FinalizedApplication3 ;
          					