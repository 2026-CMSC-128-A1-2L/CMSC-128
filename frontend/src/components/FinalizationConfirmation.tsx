import { FunctionComponent } from 'react';
import CheckIcon from '../assets/game-icons_confirmed.svg';
import GreenEllipse from '../assets/Ellipse 71.svg';
export type FinalizationConfirmationType = {
  	className?: string;
}



const FinalizationConfirmation: FunctionComponent<FinalizationConfirmationType> = ({ className="" }) => {
  	return (
    		<div className={`w-[480px] h-[500px] relative rounded-2xl bg-white overflow-hidden flex flex-col items-start p-num-32 box-border max-w-full max-h-full text-center text-[24px] text-black font-inter ${className}`}>
      			<div className="self-stretch h-[436px] overflow-hidden shrink-0 flex flex-col items-center pt-16 px-num-10 pb-12 box-border gap-2.5">
        				<div className="self-stretch flex flex-col items-start">
          					<div className="self-stretch bg-white overflow-hidden flex items-center justify-center py-[5px] px-[3px]">
            						<img className="h-[84px] w-[84px] relative" alt="" src={CheckIcon}/>
          					</div>
          					<div className="self-stretch overflow-hidden flex flex-col items-center justify-center p-num-10 gap-2.5">
            						<b className="relative leading-8">Are you sure?</b>
              							<div className="self-stretch relative text-num-14 leading-6 font-medium">Kindly please double check all the information that you have provided before finalizing this application.</div>
              							</div>
              							</div>
              							<div className="self-stretch flex-1 overflow-hidden flex flex-col items-start p-num-10 gap-3 text-num-14 text-teal">
                								<div className="self-stretch rounded-num-12 bg-lightcyan overflow-hidden flex items-center justify-center py-num-12 px-num-10 shrink-0">
                  									<div className="relative font-semibold">Yes, finalize lease transfer</div>
                								</div>
                								<div className="self-stretch rounded-num-12 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center justify-center py-num-12 px-num-10 shrink-0">
                  									<div className="relative leading-6 font-medium text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Cancel</div>
                								</div>
              							</div>
              							</div>
              							</div>);
            						};
            						
            						export default FinalizationConfirmation ;
            						