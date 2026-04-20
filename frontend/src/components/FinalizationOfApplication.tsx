import { FunctionComponent, useCallback } from 'react';
import {Icon} from '@iconify/react';
const FinalizationOfApplication: FunctionComponent = () => {
  	
  	const onConfirmContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className="w-full h-[500px] relative rounded-2xl bg-white overflow-hidden flex flex-col items-start p-8 box-border text-center text-2xl text-black font-inter">
      			<div className="self-stretch flex-1 overflow-hidden flex flex-col items-center py-6 px-2.5 gap-6">
        				<div className="self-stretch flex flex-col items-start shrink-0">
          					<div className="self-stretch bg-white overflow-hidden flex items-center justify-center py-[5px] px-[3px]">
            						<Icon icon="games-icon:confirmed" className="h-[84px] w-[84px] relative"  />
          					</div>
          					<div className="self-stretch overflow-hidden flex flex-col items-center justify-center p-2.5 gap-2.5">
            						<b className="self-stretch relative leading-8">You are a step closer to your new home!</b>
            						<div className="self-stretch relative text-sm leading-6">
              							<span className="font-medium">You have successfully secured a slot at <br/></span>
                								<span className="text-teal-100">
                  									<b>One Sapphire Place</b>
                								</span>
                								<span className="font-medium">
                  									<span className="text-teal-100">. <br/></span>
                    										<span>{``}<br/>{`To keep your unit, submit all required documents within `}</span>
                    										</span>
                    										<b className="text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">7 days</b>
                    										<span className="font-medium">. Unconfirmed slots will be automatically released after this period.</span>
                    										</div>
                    										</div>
                    										</div>
                    										<div className="self-stretch h-14 overflow-hidden shrink-0 flex flex-col items-start p-2.5 box-border text-sm text-teal-200">
                      											<div className="self-stretch rounded-xl bg-lightcyan overflow-hidden flex items-center justify-center py-3 px-2.5 cursor-pointer shrink-0" onClick={onConfirmContainerClick}>
                        												<div className="relative font-semibold">Continue</div>
                      											</div>
                    										</div>
                    										</div>
                    										</div>);
                    										};
                    										
                    										export default FinalizationOfApplication ;
                    										