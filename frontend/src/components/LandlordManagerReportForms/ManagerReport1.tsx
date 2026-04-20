import { FunctionComponent } from 'react';

type Props = {
	onNext: () => void;
	onCancel: () => void;
	className?: string;
}

const ReportManager1: FunctionComponent<Props> = ({
	onNext,
	onCancel,
	className = "",
}) => {
	return (
    		<div className={`relative rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 bg-white flex items-center max-w-full max-h-full overflow-auto text-left text-[32px] text-white font-poppins ${className}`}>
      			<div className="w-[612px] flex flex-col items-center justify-center pt-0 px-0 pb-num-32 box-border gap-[42px]">
        				<div className="self-stretch flex flex-col items-center">
          					<div className="self-stretch rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-3 pl-[57px] pr-num-32">
            						<div className="w-[533px] flex flex-col items-start justify-center pt-num-32 px-0 pb-num-8 box-border shrink-0">
              							<b className="self-stretch relative">Report Manager</b>
              							<b className="self-stretch relative text-num-18 tracking-num--0_01 font-inter text-aliceblue">Report your dorm manager</b>
            						</div>
          					</div>
          					<div className="self-stretch flex flex-col items-start pt-num-32 px-12 pb-5 gap-12 text-num-14 text-dimgray font-inter">
            						<div className="self-stretch flex flex-col items-start gap-3">
              							<b className="self-stretch relative">Email Address</b>
              							<div className="self-stretch h-12 rounded-num-12 border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start justify-center py-1 px-num-16 text-slategray">
                								<div className="relative leading-6 font-medium">{`ncunanan@gmail.com `}</div>
              							</div>
              							<div className="self-stretch flex items-center justify-center py-0 px-num-8 text-num-18 text-black">
                								<b className="flex-1 relative tracking-num--0_01">You are reporting Nathaniel Cunanan. Please select all that apply:</b>
              							</div>
            						</div>
            						<div className="self-stretch flex flex-col items-start gap-3">
              							<div className="self-stretch flex items-end py-0 pl-0 pr-num-22">
                								<b className="self-stretch flex-1 relative flex items-center">{`Administrative & Management Issues`}</b>
                								<div className="flex items-center gap-[11px] text-[12px] text-slategray">
                  									<div className="relative font-medium">Select All</div>
                  									<div className="h-6 w-6 relative">
                    										<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-whitesmoke-200" />
                  									</div>
                								</div>
              							</div>
              							<div className="self-stretch flex flex-col items-start text-black">
                								<div className="self-stretch flex flex-col items-start gap-[21px]">
                  									<div className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-num-22 gap-4">
                    										<div className="flex-1 flex items-center">
                      											<div className="flex flex-col items-start justify-center gap-1">
                        												<b className="relative">Mismanagement of Tenant Records</b>
                        												<div className="relative text-[12px] font-medium text-dimgray">Lost, incomplete, or falsified data</div>
                      											</div>
                    										</div>
                    										<div className="h-6 w-6 relative overflow-hidden shrink-0">
                      											<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-teal" />
                      											<img className="absolute h-[83.33%] w-[83.33%] top-[12.5%] right-[8.33%] bottom-[4.17%] left-[8.33%] max-w-full overflow-hidden max-h-full" alt="" />
                    										</div>
                  									</div>
                  									<div className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-num-22 gap-4">
                    										<div className="flex-1 flex items-center">
                      											<div className="flex flex-col items-start justify-center gap-1">
                        												<b className="relative">Failure to Enforce Dorm Policies</b>
                        												<div className="relative text-[12px] font-medium text-dimgray">Ignoring curfews, guest rules, etc.</div>
                      											</div>
                    										</div>
                    										<div className="h-6 w-6 relative">
                      											<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-whitesmoke-200" />
                    										</div>
                  									</div>
                  									<div className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-num-22 gap-4">
                    										<div className="flex-1 flex items-center">
                      											<div className="flex flex-col items-start justify-center gap-1">
                        												<b className="relative">Unauthorized Decision-Making</b>
                        												<div className="relative text-[12px] font-medium text-dimgray">Acting without landlord approval</div>
                      											</div>
                    										</div>
                    										<div className="h-6 w-6 relative">
                      											<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-teal" />
                      											<img className="absolute h-[83.33%] w-[83.33%] top-[12.5%] right-[8.33%] bottom-[4.17%] left-[8.33%] max-w-full overflow-hidden max-h-full" alt="" />
                    										</div>
                  									</div>
                  									<div className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-num-22 gap-4">
                    										<div className="flex-1 flex items-center">
                      											<div className="flex flex-col items-start justify-center gap-1">
                        												<b className="relative">Negligence in Duties</b>
                        												<div className="relative text-[12px] font-medium text-dimgray">Not responding to tenant concerns or issues</div>
                      											</div>
                    										</div>
                    										<div className="h-6 w-6 relative">
                      											<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-teal" />
                      											<img className="absolute h-[83.33%] w-[83.33%] top-[12.5%] right-[8.33%] bottom-[4.17%] left-[8.33%] max-w-full overflow-hidden max-h-full" alt="" />
                    										</div>
                  									</div>
                  									<div className="self-stretch rounded-num-12 flex items-center py-3 pl-num-24 pr-num-22 gap-4">
                    										<div className="flex-1 flex items-center">
                      											<div className="flex flex-col items-start justify-center gap-1">
                        												<b className="relative">Conflict of Interest</b>
                        												<div className="relative text-[12px] font-medium text-dimgray">Favoring certain tenants unfairly</div>
                      											</div>
                    										</div>
                    										<div className="h-6 w-6 relative">
                      											<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-num-4 bg-teal" />
                      											<img className="absolute h-[83.33%] w-[83.33%] top-[12.5%] right-[8.33%] bottom-[4.17%] left-[8.33%] max-w-full overflow-hidden max-h-full" alt="" />
                    										</div>
                  									</div>
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className="flex items-center gap-4 text-num-14 text-crimson font-inter">
          					<div className="rounded-num-12 flex items-center justify-center py-num-8 px-num-24">
            						<button className="relative font-semibold inline-block max-w-[269.11px]" onClick={onCancel}>Cancel</button>
          					</div>
          					<div className="rounded-num-12 bg-lightcyan overflow-hidden flex items-center justify-center py-num-8 px-num-24 text-teal">
            						<button className="relative font-semibold inline-block max-w-[269.11px]" onClick={onNext}>Next</button>
          					</div>
        				</div>
      			</div>
    		</div>
	);
};

export default ReportManager1 ;
