import { FunctionComponent, useCallback } from 'react';
import { Icon } from '@iconify/react';
import VerifiedBadge from '../../../assets/verified_badge.svg';

const Upload: FunctionComponent = () => {
  	
  	const onSubmitButtonContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className="w-full h-[1024px] relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-[31.85px] text-darkslategray-200 font-buhun-retro-two-free">
      			<img className="w-[1440px] h-[1024px] absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]" alt="" />
      			<div className="w-[1440px] h-[1192px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        				<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start">
          					<div className="self-stretch flex-1 flex items-center">
            						<div className="h-[1192px] w-[200px] hidden items-start">
              							<div className="h-[883px] flex-1 bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-center pt-6 px-num-0 pb-[30px]">
                								<div className="w-32 h-[60px] overflow-hidden shrink-0 flex flex-col items-center justify-center">
                  									<div className="self-stretch h-14 relative">
                    										<div className="absolute top-[18.46px] left-[48.76px] flex items-center w-[79.2px] h-[27.1px]">TLAS</div>
                    										<img className="absolute top-[0.13px] left-[0px] w-[58.2px] h-[55.7px] object-cover" alt="" />
                  									</div>
                								</div>
              							</div>
            						</div>
            						<div className="h-[1112px] hidden flex-col items-center">
              							<div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            						</div>
            						<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-between gap-0 text-num-14 text-darkslategray-100 font-lora">
              							<div className="self-stretch flex-1 flex flex-col items-start py-num-0 pl-num-32 pr-20">
                								<div className="self-stretch h-[1012px] flex flex-col items-start">
                  									<div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                    										<div className="h-6 flex items-center gap-1.5">
                      											<div className="relative font-semibold">User Profile</div>
                      											<Icon icon="iconamoon:arrow-right-2" className="w-6 h-6" />
                      											<div className="relative font-semibold">Verification Status</div>
                    										</div>
                    										<div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 hidden items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                      										<Icon icon="mdi:magnify" className="w-6 h-6" />
                      											<b className="relative">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
                    										</div>
                  									</div>
                  									<div className="self-stretch h-[948px] rounded-num-16 bg-gray flex flex-col items-start gap-3 text-center font-inter">
                    										<div className="self-stretch h-[382px] rounded-num-16 flex flex-col items-start gap-3 text-dimgray">
                      											<div className="self-stretch rounded-num-16 overflow-hidden flex flex-col items-start p-num-32">
                        												<div className="self-stretch flex flex-col items-start gap-2.5">
                          													<b className="relative">Landlord Profile</b>
                          													<div className="flex items-center justify-center gap-[10.2px] text-[24px] text-darkslategray-200">
                            														<b className="relative leading-8">Quevin Custodio</b>
                            														<img src={VerifiedBadge} alt="verified" className="w-[24px] h-[24px]" />
                          													</div>
                          													<b className="relative text-teal">qacustodio@up.edu.ph</b>
                        												</div>
                      											</div>
                      											<div className="self-stretch overflow-hidden flex items-center py-1 px-[34px] gap-[124px]">
                        												<Icon icon="mdi:account-circle" className="w-[200px] h-[200px] text-gray-400" />
                        												<div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          													<div className="flex flex-col items-start gap-1">
                            														<b className="relative">Name</b>
                            														<b className="relative text-black">Quevin James A. Custodio</b>
                          													</div>
                          													<div className="flex flex-col items-start gap-1">
                            														<div className="flex items-start gap-2">
                              															<b className="relative">Contact number</b>
                              															<Icon icon="mdi:information-outline" className="w-5 h-5" />
                            														</div>
                            														<b className="relative text-black">- - - - -</b>
                          													</div>
                          													<div className="flex flex-col items-start gap-1">
                            														<div className="flex items-start gap-2">
                              															<b className="relative">Home Address</b>
                              															<Icon icon="mdi:information-outline" className="w-5 h-5" />
                            														</div>
                            														<b className="relative text-black">{`- - - - - `}</b>
                          													</div>
                        												</div>
                        												<div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          													<div className="flex flex-col items-start gap-1">
                            														<b className="relative">{`User Role `}</b>
                            														<b className="relative text-black">Landlord</b>
                          													</div>
                          													<div className="flex flex-col items-start gap-1">
                            														<b className="relative text-dimgray text-center">{`Employees `}</b>
                            														<b className="w-[131px] relative flex items-center text-teal">Nathaniel Cunanan</b>
                            														<b className="w-[131px] relative flex items-center text-teal">Lance De Jesus</b>
                          													</div>
                          													<div className="flex flex-col items-start gap-1">
                            														<b className="relative">Verification Status</b>
                            														<b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Unverified</b>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-start text-darkslategray-200 font-poppins">
                      											<div className="self-stretch flex flex-col items-center justify-center">
                        												<div className="w-[723px] h-[87px] relative">
                          													<div className="absolute h-[9.2%] w-[32.64%] top-[29.89%] right-[56.29%] bottom-[60.92%] left-[11.07%] rounded-[34.55px] [background:linear-gradient(90deg,_rgba(2,_67,_56,_0.8),_#b5c8c5)]" />
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
                    										<div className="self-stretch flex items-center py-num-0 px-num-32 gap-6 text-[24px]">
                      											<div className="flex-1 flex items-center">
                        												<div className="flex items-center gap-2">
                          													<Icon icon="mdi:file-document-multiple" className="w-6 h-6" />
                          													<b className="relative leading-8">Submit Documents</b>
                          													<b className="relative text-num-14 text-dimgray">0 out of 2 Documents Uploaded</b>
                        												</div>
                      											</div>
                      											<div className="h-8 w-24 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-num-12 box-border cursor-pointer text-num-14 text-slategray" onClick={onSubmitButtonContainerClick}>
                        												<div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border shrink-0">
                          													<b className="relative">Submit</b>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 text-left">
                      											<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                        												<div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-6 gap-0">
                          													<div className="flex-1 flex items-center gap-4">
                            														<b className="relative">Valid ID</b>
                            														<div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                              															<b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Missing</b>
                            														</div>
                          													</div>
                          													<div className="w-[72px] flex items-center gap-6">
                            														<Icon icon="mdi:pencil" className="w-6 h-6" />
                            														<Icon icon="mdi:delete" className="w-6 h-6" />
                          													</div>
                        												</div>
                        												<div className="w-[852px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden flex items-center py-num-12 px-4 text-black">
                          													<div className="h-16 flex items-center gap-6">
                            														<Icon icon="mdi:cloud-upload" className="w-16 h-16" />
                            														<div className="flex flex-col items-start justify-center gap-2">
                              															<b className="relative">Upload the document</b>
                              															<div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">.jpg or .png less than 500KB</div>
                            														</div>
                          													</div>
                        												</div>
                      											</div>
                    										</div>
                    										<div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 text-left">
                      											<div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                        												<div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-6 gap-0">
                          													<div className="flex-1 flex items-center gap-4">
                            														<b className="relative">Business Permit</b>
                            														<div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                              															<b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Missing</b>
                            														</div>
                          													</div>
                          													<div className="w-[72px] flex items-center gap-6">
                            														<Icon icon="mdi:pencil" className="w-6 h-6" />
                            														<Icon icon="mdi:delete" className="w-6 h-6" />
                          													</div>
                        												</div>
                        												<div className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden shrink-0 flex items-center py-num-12 px-4 text-black">
                          													<div className="h-16 flex items-center gap-6">
                            														<Icon icon="mdi:cloud-upload" className="w-16 h-16" />
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
              							<div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-dimgray font-inter">
                								<div className="w-[1273px] bg-whitesmoke-100 overflow-hidden flex items-center py-[19px] pl-[200px] pr-20 box-border">
                  									<div className="flex-1 flex items-center gap-20">
                    										<div className="flex items-center gap-4">
                      											<div className="flex items-center gap-2">
                        												<img className="w-12 relative max-h-full object-cover" alt="" />
                        												<div className="flex items-center gap-3">
                          													<div className="flex items-center gap-1">
                            														<Icon icon="mdi:calendar" className="w-5 h-5" />
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
    	);
};

export default Upload;
