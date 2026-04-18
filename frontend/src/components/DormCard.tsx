import { FunctionComponent } from 'react';
import {Icon} from '@iconify/react';


const DormCard: FunctionComponent = () => {
  	return (
    		<div className="w-66 h-52 relative rounded-[15.31px] bg-white border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-start text-left text-[1.077rem] text-black font-inter">
      			<img className="w-66 h-30" alt="" />
      			<div className="flex flex-col items-center py-1 px-3 gap-1">
        				<div className="self-stretch flex flex-col items-start">
          					<div className="self-stretch h-[1.556rem] flex items-center justify-between gap-[0.687rem]">
            						<b className="self-stretch relative flex items-center shrink-0">Two Sapphire Place</b>
            						<div className="w-fit h-fit flex items-center gap-1 text-[0.718rem] font-lora">
										<Icon icon="material-symbols-light:star" className="w-5 h-5" />
              							<div className="relative font-semibold">4.1</div>
            						</div>
          					</div>
          					<div className="self-stretch flex items-center gap-[0.237rem] text-[0.718rem] text-dimgray font-lora">
            						<div className="self-stretch flex items-start">
              							<Icon icon="material-symbols:location-on" className="w-4 h-4" />
            						</div>
            						<div className="self-stretch flex items-center">
              							<div className="flex-1 relative tracking-[0.04em] font-semibold">Sapphire St., Los Banos</div>
            						</div>
          					</div>
        				</div>
        				<div className="w-[15.313rem] flex flex-col items-start shrink-0 text-[0.479rem] text-teal font-lora">
          					<div className="self-stretch overflow-hidden flex items-start py-[0rem] px-[0.6rem] gap-[0.237rem]">
            						<div className="h-[0.956rem] w-[4.069rem] relative shrink-0">
              							<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[4.79px] bg-lightcyan border-whitesmoke border-solid border-[0.5px] box-border" />
              							<div className="absolute top-[0.239rem] left-[0.119rem] w-[3.831rem] h-[0.481rem]">
                								<div className="absolute top-[0rem] left-[0rem] w-[3.831rem] flex items-center py-[0rem] px-[0.237rem] box-border gap-[0.118rem]">
                  									<img className="h-[0.481rem] w-[0.719rem] relative" alt="" />
                  									<div className="h-[0.3rem] w-[2.45rem] relative font-semibold flex items-center shrink-0">Free Wi-Fi</div>
                								</div>
              							</div>
            						</div>
            						<div className="h-[0.956rem] w-[5.506rem] relative shrink-0 text-red">
              							<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[4.79px] bg-pink border-whitesmoke border-solid border-[0.5px] box-border" />
              							<div className="absolute top-[0.179rem] left-[0.119rem] w-[4.425rem] flex items-center py-[0rem] px-[0.237rem] box-border gap-[0.118rem]">
                								<img className="h-[0.6rem] w-[0.581rem] relative shrink-0" alt="" />
                								<div className="h-[0.3rem] w-[4.069rem] relative font-semibold flex items-center shrink-0">Laundry Services</div>
              							</div>
            						</div>
            						<div className="h-[1rem] w-[4.75rem] relative shrink-0 text-[0.5rem] text-slateblue">
              							<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[5.12px] bg-lightsteelblue border-whitesmoke border-solid border-[0.5px] box-border" />
              							<div className="absolute top-[0.125rem] left-[0rem] w-[4.688rem] h-[0.75rem]">
                								<div className="absolute top-[0rem] left-[0rem] w-[4.688rem] flex items-center py-[0rem] px-[0.25rem] box-border gap-[0.062rem]">
                  									<img className="h-[0.75rem] w-[0.769rem] relative" alt="" />
                  									<div className="h-[0.313rem] w-[3.375rem] relative tracking-[0.04em] font-semibold flex items-center shrink-0">Bed Mattress</div>
                								</div>
              							</div>
            						</div>
          					</div>
          					<div className="self-stretch overflow-hidden flex items-center justify-end py-[0rem] pl-[0.6rem] pr-[0rem]">
            						<img className="w-[1.194rem] relative max-h-full" alt="" />
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default DormCard ;
