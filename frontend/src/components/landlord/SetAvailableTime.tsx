import { FunctionComponent } from 'react';


export type SetAvailableTimeType = {
  	className?: string;
  	onClose?: () => void;
}



const SetAvailableTime: FunctionComponent<SetAvailableTimeType> = ({ className="", onClose }) => {
  	return (
    		<div className={`relative rounded-2xl bg-white overflow-hidden flex flex-col items-start py-num-32 px-12 box-border gap-2.5 max-w-full max-h-full text-center text-[24px] text-teal font-inter ${className}`}>
      			<div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
        				<b className="relative leading-8">General Availability</b>
        				<b className="relative text-num-14 text-darkslategray-100">{`Set your available times for scheduled visits `}</b>
      			</div>
      			<div className="flex items-start gap-2.5 text-num-12 text-black">
        				<div className="self-stretch overflow-hidden flex flex-col items-start pt-12 px-0 pb-num-10 gap-1">
          					<div className="self-stretch flex flex-col items-center justify-center">
            						<b className="w-[33px] h-num-38 relative flex items-center justify-center shrink-0">8:00</b>
          					</div>
          					<div className="self-stretch flex flex-col items-center justify-center">
            						<b className="w-[33px] h-num-38 relative flex items-center justify-center shrink-0">9:00</b>
          					</div>
          					<div className="flex flex-col items-center justify-center">
            						<b className="self-stretch h-num-38 relative flex items-center justify-center shrink-0">10:00</b>
          					</div>
          					<div className="flex flex-col items-center justify-center">
            						<b className="self-stretch h-num-38 relative flex items-center justify-center shrink-0">11:00</b>
          					</div>
          					<div className="flex flex-col items-center justify-center">
            						<b className="self-stretch h-num-38 relative flex items-center justify-center shrink-0">12:00</b>
          					</div>
          					<div className="flex flex-col items-center justify-center">
            						<b className="self-stretch h-num-38 relative flex items-center justify-center shrink-0">13:00</b>
          					</div>
          					<div className="flex flex-col items-center justify-center">
            						<b className="self-stretch h-num-38 relative flex items-center justify-center shrink-0">14:00</b>
          					</div>
          					<div className="flex flex-col items-center justify-center">
            						<b className="self-stretch h-num-38 relative flex items-center justify-center shrink-0">15:00</b>
          					</div>
          					<div className="flex flex-col items-center justify-center">
            						<b className="self-stretch h-num-38 relative flex items-center justify-center shrink-0">16:00</b>
          					</div>
          					<div className="flex flex-col items-center justify-center">
            						<b className="self-stretch h-num-38 relative flex items-center justify-center shrink-0">17:00</b>
          					</div>
        				</div>
        				<div className="flex flex-col items-center justify-center gap-4 text-left text-num-14 text-dimgray">
          					<div className="w-[754px] flex flex-col items-start">
            						<div className="self-stretch flex items-center justify-between gap-0">
              							<div className="h-8 w-8 relative overflow-hidden shrink-0">
                								<img className="absolute h-[42.5%] w-[22.81%] top-[28.73%] right-[39.6%] bottom-[28.77%] left-[37.59%] max-w-full overflow-hidden max-h-full hidden" alt="" />
              							</div>
              							<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                								<b className="relative">SUN</b>
              							</div>
              							<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                								<b className="relative">MON</b>
              							</div>
              							<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                								<b className="relative">TUE</b>
              							</div>
              							<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                								<b className="relative">WED</b>
              							</div>
              							<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                								<b className="relative">THU</b>
              							</div>
              							<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                								<b className="relative">FRI</b>
              							</div>
              							<div className="h-8 flex-1 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center p-num-7 box-border">
                								<b className="relative">SAT</b>
              							</div>
              							<div className="h-8 w-8 relative overflow-hidden shrink-0 [transform:_rotate(180deg)]">
                								<img className="absolute h-[42.5%] w-[22.81%] top-[28.73%] right-[39.6%] bottom-[28.77%] left-[37.59%] max-w-full overflow-hidden max-h-full [transform:_rotate(-180deg)] hidden" alt="" />
              							</div>
            						</div>
          					</div>
          					<div className="w-[700px] h-[412px] bg-white overflow-hidden shrink-0 grid box-border grid-cols-[repeat(7,_1fr)] grid-rows-[repeat(10,_1fr)] gap-1">
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[1] row-[1]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[1] row-[2]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[5] row-[2]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[2] row-[3]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[5] row-[3]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[6] row-[6]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[6] row-[5]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[2] row-[4]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[2] row-[5]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[2] row-[6]" />
            						<div className="w-num-96_6 h-num-37_6 bg-teal overflow-hidden flex items-start p-num-10 box-border col-[1] row-[3]" />
            						<div className="w-[97px] bg-teal overflow-hidden flex items-start p-num-10 box-border col-[3] row-[7]" />
            						<div className="w-[97px] bg-teal overflow-hidden flex items-start p-num-10 box-border col-[3] row-[8]" />
          					</div>
        				</div>
      			</div>
      			<div className="self-stretch flex items-center justify-center gap-4 text-left text-num-14 text-crimson">
        				<button
          					type="button"
          					onClick={onClose}
          					className="rounded-num-12 flex items-center justify-center py-2 px-num-24 cursor-pointer hover:bg-red-50 transition-colors border-none bg-transparent"
        				>
          					<div className="relative font-semibold inline-block max-w-[269.11px]">Cancel</div>
        				</button>
        				<button
          					type="button"
          					onClick={onClose}
          					className="rounded-num-12 bg-lightcyan-200 overflow-hidden flex items-center justify-center py-2 px-num-24 text-teal cursor-pointer hover:bg-teal-100 transition-colors border-none"
        				>
          					<div className="relative font-semibold inline-block max-w-[269.11px]">Save</div>
        				</button>
      			</div>
    		</div>);
};

export default SetAvailableTime ;
