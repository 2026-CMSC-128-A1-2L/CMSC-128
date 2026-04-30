import { FunctionComponent } from 'react';
import checkIcon from '../../../../assets/check_icon.svg';


export type JoinedDormitoryPopupType = {
	className?: string;
	onClose?: () => void;
}

const JoinedDormitoryPopup: FunctionComponent<JoinedDormitoryPopupType> = ({ className = "", onClose }) => {
	return (
		<div className={`w-[480px] h-[500px] relative rounded-2xl bg-white overflow-hidden flex flex-col items-start p-8 box-border max-w-full max-h-full text-center text-num-24 text-gray-200 font-inter ${className}`}>
			<div className="self-stretch h-[436px] overflow-hidden shrink-0 flex flex-col items-center pt-[65px] px-num-10 pb-6 box-border gap-6">
				<div className="self-stretch flex flex-col items-start">
					<div className="self-stretch bg-white overflow-hidden flex items-center justify-center py-[5px] px-[3px]">
						<div className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-lightcyan">
							<img className="h-[72px] w-[72px] relative" src={checkIcon} alt="Success Checkmark" />
						</div>
					</div>
					<div className="self-stretch overflow-hidden flex flex-col items-center justify-center p-num-10 gap-2.5">
						<b className="self-stretch relative leading-num-32">Successfully joined dormitory!</b>
						<div className="self-stretch relative text-num-14 leading-5 font-medium">Welcome home! You are now a member of the dormitory. You can now access all shared features and dorm settings.</div>
					</div>
				</div>
				<div className="self-stretch flex-1 overflow-hidden flex flex-col items-center p-num-10 text-num-14 text-teal-200">
					<div
						className="rounded-num-12 bg-lightcyan overflow-hidden flex items-center justify-center py-3 px-8 cursor-pointer transition-colors"
						onClick={onClose}
					>
						<div className="relative font-semibold">Close</div>
					</div>
				</div>
			</div>
		</div>);
};

export default JoinedDormitoryPopup;
