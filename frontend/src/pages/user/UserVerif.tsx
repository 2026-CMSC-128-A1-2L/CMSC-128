import { useCallback } from 'react';
import type { FunctionComponent } from 'react';



const UserVerif: FunctionComponent = () => {
  	
  	const onArrowUpClick = useCallback(() => {
    		const anchor = document.querySelector("[data-scroll-to='searchBarContainer']");
    		if(anchor) {
      			anchor.scrollIntoView({"block":"start","behavior":"smooth"})
    		}
  	}, []);
  	
  	return (
    		<div className="w-full h-[1024px] relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      			<img className="w-[1440px] h-[1192px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt="" />
      			<div className="w-[1440px] h-[1512px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        				<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-num-0 pl-num-0 pr-20">
          					<div className="self-stretch flex-1 flex items-center gap-8 shrink-0">
            						<div className="h-[1112px] hidden flex-col items-center">
              							<div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            						</div>
            						<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start pt-num-0 px-num-0 pb-[140px]">
              							<div className="self-stretch flex-1 flex flex-col items-start">
                								<div className="self-stretch h-[1012px] flex flex-col items-start">
                  									<div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5" data-scroll-to="searchBarContainer">
                    										<div className="h-6 flex items-center gap-1.5">
                      											<div className="relative font-semibold">User Profile</div>
                      											<img className="h-6 w-6 relative" alt="" />
                      											<div className="relative font-semibold">Verification Status</div>
                    										</div>
                    										<div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                      											<img className="h-6 w-6 relative" alt="" />
                      											<b className="relative">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
                    										</div>
                  									</div>
                  									<div className="self-stretch h-[948px] rounded-num-16 bg-gray flex flex-col items-start gap-3 text-center font-inter">
                    										<div className="w-[980px] h-[382px] rounded-num-16 flex flex-col items-start gap-3 shrink-0 text-[14.34px] text-dimgray">
                      											<div className="self-stretch rounded-[16.38px] overflow-hidden flex flex-col items-start p-[32.8px]">
                        												<div className="self-stretch flex flex-col items-start gap-[10.2px]">
                          													<b className="relative">Student Profile</b>
                          													<div className="flex items-center justify-center gap-[10.2px] text-[24.57px] text-darkslategray-200">
                            														<b className="relative leading-[32.77px]">Daphne Dayne</b>
                            														<img className="h-[24.6px] w-[24.6px] relative" alt="" />
                          													</div>
                          													<b className="relative text-teal">dcanape@up.edu.ph</b>
                        												</div>
                      											</div>
                      											<div className="self-stretch overflow-hidden flex items-start justify-between py-1 px-num-32 gap-5 text-num-14">
                        												<img className="w-[200px] relative max-h-full object-cover" alt="" />
                        												<div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          													<div className="flex flex-col items-start gap-1">
                            														<b className="relative">Name</b>
                            														<b className="relative text-black">CANAPE, DAPHNE</b>
                          													</div>
                          													<div className="flex flex-col items-start gap-1">
                            														<div className="flex items-start gap-2">
                              															<b className="relative">Contact number</b>
                              															<img className="w-5 relative max-h-full" alt="" />
                            														</div>
                            														<b className="relative text-black">- - - - -</b>
                          													</div>
                          													<div className="flex flex-col items-start gap-1">
                            														<div className="flex items-start gap-2">
                              															<b className="relative">Home Address</b>
                              															<img className="w-5 relative max-h-full" alt="" />
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
                    										<div className="self-stretch flex flex-col items-start gap-12 shrink-0 text-white">
                      											<div className="self-stretch flex flex-col items-center justify-center">
                        												<div className="w-[530px] h-12 relative">
                          													<div className="absolute h-[99.38%] w-[99.87%] top-[0%] right-[-0.25%] bottom-[0.62%] left-[0.38%] rounded-[99.72px] bg-aliceblue flex items-center justify-center p-1 box-border gap-1 shrink-0">
                            														<div className="h-[39.9px] w-[235.3px] rounded-[99.72px] flex items-center justify-center p-1 box-border">
                              															<div className="relative font-semibold text-transparent !bg-clip-text [background:rgba(0,_0,_0,_0.2),_#64748b] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">CURRENT DORM</div>
                            														</div>
                            														<div className="h-[39.9px] w-[235.3px] rounded-[99.72px] bg-darkslategray-200 flex items-center justify-center py-[11px] px-[74.8px] box-border">
                              															<div className="relative font-semibold shrink-0">VERIFICATION STATUS</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                      											<div className="self-stretch flex flex-col items-center justify-center text-darkslategray-200 font-poppins">
                        												<div className="w-[723px] h-[87px] relative">
                          													<div className="absolute h-[9.2%] w-[32.64%] top-[29.89%] right-[56.29%] bottom-[60.92%] left-[11.07%] rounded-[34.55px] [background:linear-gradient(90deg,_rgba(2,_67,_56,_0.8),_#b5c8c5_99.99%)]" />
                          													<div className="absolute h-[37.93%] w-[13.42%] top-[51.72%] left-[0%] leading-8 font-semibold flex items-center justify-center">Submit</div>
                          													<div className="absolute h-[37.93%] w-[10.37%] top-[51.72%] left-[88.93%] font-semibold flex items-center justify-center">Finish</div>
                          													<div className="absolute h-[37.93%] w-[11.2%] top-[51.72%] left-[43.71%] font-semibold flex items-center justify-center">Reviewing</div>
                          													<div className="absolute h-[9.2%] w-[34.44%] top-[26.44%] right-[10.65%] bottom-[64.37%] left-[54.91%] rounded-[34.55px] bg-silver" />
                          													<div className="absolute h-[37.93%] w-[4.56%] top-[12.64%] right-[48.41%] bottom-[49.43%] left-[47.03%] rounded-[50%] bg-silver" />
                          													<div className="absolute h-[37.93%] w-[4.56%] top-[12.64%] right-[3.6%] bottom-[49.43%] left-[91.84%] rounded-[50%] bg-silver" />
                          													<div className="absolute h-[37.93%] w-[4.56%] top-[13.79%] right-[91.01%] bottom-[48.28%] left-[4.43%] rounded-[50%] bg-darkslategray-200" />
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex items-center py-num-0 px-num-32 gap-6 shrink-0 text-[24px]">
                      											<div className="flex-1 flex items-center">
                        												<div className="flex items-center gap-2">
                          													<img className="h-6 w-6 relative" alt="" />
                          													<b className="relative leading-8">Submit Documents</b>
                          													<b className="relative text-num-14 text-dimgray">0 out of 3 Documents Uploaded</b>
                        												</div>
                      											</div>
                      											<div className="h-8 w-24 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-num-12 box-border text-num-14 text-slategray">
                        												<div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border shrink-0">
                          													<b className="relative">Submit</b>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 shrink-0 text-left">
                      											<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                        												<div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-6 gap-0">
                          													<div className="flex-1 flex items-center gap-4">
                            														<b className="relative">{`Official University ID `}</b>
                            														<b className="relative text-dimgray">(For Old UP Students)</b>
                            														<div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                              															<b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Missing</b>
                            														</div>
                          													</div>
                          													<div className="w-[72px] flex items-center gap-6">
                            														<img className="h-6 w-6 relative" alt="" />
                            														<img className="h-6 w-6 relative" alt="" />
                          													</div>
                        												</div>
                        												<div className="w-[852px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden flex items-center py-num-12 px-4 text-black">
                          													<div className="h-16 flex items-center gap-6">
                            														<img className="h-16 w-16 relative" alt="" />
                            														<div className="flex flex-col items-start justify-center gap-2">
                              															<b className="relative">Upload the document</b>
                              															<div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">.jpg or .png less than 500KB</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 shrink-0 text-left">
                      											<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                        												<div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-6 gap-0">
                          													<div className="flex-1 flex items-center gap-4">
                            														<b className="relative">Form 5</b>
                            														<b className="relative text-dimgray">(For Old UP Students)</b>
                            														<div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                              															<b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Missing</b>
                            														</div>
                          													</div>
                          													<div className="w-[72px] flex items-center gap-6">
                            														<img className="h-6 w-6 relative" alt="" />
                            														<img className="h-6 w-6 relative" alt="" />
                          													</div>
                        												</div>
                        												<div className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden shrink-0 flex items-center py-num-12 px-4 text-black">
                          													<div className="h-16 flex items-center gap-6">
                            														<img className="h-16 w-16 relative" alt="" />
                            														<div className="flex flex-col items-start justify-center gap-2">
                              															<b className="relative">Upload the document</b>
                              															<div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">.pdf less than 500KB</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 shrink-0 text-left">
                      											<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                        												<div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-6 gap-0">
                          													<div className="flex-1 flex items-center gap-4">
                            														<b className="relative">Notice of Admission</b>
                            														<b className="relative text-dimgray">(For Incoming Freshman UP Students)</b>
                            														<div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                              															<b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Missing</b>
                            														</div>
                          													</div>
                          													<div className="w-[72px] flex items-center gap-6">
                            														<img className="h-6 w-6 relative" alt="" />
                            														<img className="h-6 w-6 relative" alt="" />
                          													</div>
                        												</div>
                        												<div className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden shrink-0 flex items-center py-num-12 px-4 text-black">
                          													<div className="h-16 flex items-center gap-6">
                            														<img className="h-16 w-16 relative" alt="" />
                            														<div className="flex flex-col items-start justify-center gap-2">
                              															<b className="relative">Upload the document</b>
                              															<div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">.pdf less than 500KB</div>
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
      			<div className="w-[60px] h-[60px] !!m-[0 important] absolute top-[916px] left-[1318px] rounded-[30px] [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] shrink-0 flex items-start p-[16.2px] box-border cursor-pointer z-[2]" onClick={onArrowUpClick}>
        				<img className="h-[27.7px] w-[27.7px] relative" alt="" />
      		</div>
    		</div>);
};

export default UserVerif;
