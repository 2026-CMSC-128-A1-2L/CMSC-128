import { FunctionComponent, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinedDormitoryPopup from "../../../components/user/user-invitation/JoinedDormitoryPopup";
import PortalPopup from "../../../components/user/user-invitation/PortalPopup";
import logoLike from "../../../../assets/logo_like.svg";

const InviteAccomodation: FunctionComponent = () => {
	const navigate = useNavigate();
	const [isJoinedDormitoryPopupOpen, setJoinedDormitoryPopupOpen] = useState(false);

	const openJoinedDormitoryPopup = useCallback(() => {
		setJoinedDormitoryPopupOpen(true);
	}, []);

	const closeJoinedDormitoryPopup = useCallback(() => {
		setJoinedDormitoryPopupOpen(false);
	}, []);

	return (
		<>
			<div className="w-full h-full flex flex-col items-start py-16 px-8 box-border text-num-24 text-gray-200 font-inter relative overflow-hidden bg-transparent">
				<div className="w-full max-w-[1048px] mx-auto rounded-[25.44px] rounded-b-none bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start pt-num-0 px-num-0 pb-[22px] gap-2.5 z-10 shadow-sm">
					<div className="self-stretch flex items-start justify-between py-num-10 px-[30px] gap-5 shrink-0 bg-white rounded-t-[25.44px] border-b border-whitesmoke-200">
						<div className="flex flex-col items-start gap-px">
							<b className="relative leading-num-32 flex items-center shrink-0 font-inter">Invitation to Current Accommodation</b>
							<div className="self-stretch relative text-[16px] font-medium font-lora flex items-center shrink-0">System</div>
						</div>
						<div className="flex items-center justify-center p-num-10 text-right text-num-12 text-dimgray font-lora">
							<div className="relative tracking-num-0_02 font-semibold">March 30, 2026<br />1:20 am</div>
						</div>
					</div>
					<div className="self-stretch flex flex-col items-center justify-center py-num-10 px-[30px] gap-2.5 shrink-0 text-center text-black">
						<img className="w-[202px] relative max-h-full object-cover my-6" alt="Owl Logo" src={logoLike} />
						<div className="flex flex-col items-center gap-[7px]">
							<b className="w-[564px] h-[88px] relative leading-num-32 flex items-center justify-center shrink-0 font-inter">Quevin Custodio has invited you to join your current accommodations in Women’s Dormitory</b>
							<div className="flex flex-col items-center justify-end gap-5 text-[18px]">
								<div className="w-[604px] shadow-[0px_0px_10px_rgba(0,_0,_0,_0.05)] bg-white border-whitesmoke-200 border-solid border-[1.5px] box-border flex flex-col items-center pt-5 pb-10 px-5 gap-5 rounded-lg">
									<b className="w-[481.7px] relative tracking-[-0.01em] flex items-center justify-center shrink-0 text-darkslategray font-inter text-xl">Hi Daphne!</b>
									<div className="flex flex-col items-center gap-2.5 shrink-0 text-num-14">
										<div className="w-[521px] relative leading-6 font-medium flex items-center justify-center shrink-0 text-center text-darkslategray font-inter">
											Quevin Custodio has invited you to join Women’s Dormitory as a your current accommodation! Joining this invitation will help both you and the landlord manage your accommodations and have access to relevant informations<br />You may head over {'<here>'} to check out the building’s profile.
										</div>
										<div className="relative text-num-12 tracking-num-0_02 font-semibold font-lora flex items-center justify-center text-darkslategray mt-2">This invitation will expire in 7 days.</div>
									</div>
								</div>
								<div className="flex items-center text-left text-[20.87px] text-crimson mt-4">
									<div className="flex items-center gap-[23.9px]">
										<div 
											className="w-[148px] rounded-[17.89px] flex items-center justify-center py-[11.9px] px-[35.8px] box-border cursor-pointer transition-transform hover:scale-105 active:scale-95 font-inter"
											onClick={() => navigate(-1)}
										>
											<div className="relative font-semibold inline-block">Cancel</div>
										</div>
										<div className="w-[148px] rounded-[17.89px] bg-lightcyan overflow-hidden shrink-0 flex items-center justify-center py-[11.9px] px-[35.8px] box-border cursor-pointer text-teal-200 transition-transform hover:scale-105 active:scale-95 font-inter" onClick={openJoinedDormitoryPopup}>
											<div className="relative font-semibold inline-block">Accept</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isJoinedDormitoryPopupOpen && (
				<PortalPopup
					overlayColor="rgba(0, 0, 0, 0.25)"
					placement="Centered"
					onOutsideClick={closeJoinedDormitoryPopup}
				>
					<JoinedDormitoryPopup onClose={closeJoinedDormitoryPopup} />
				</PortalPopup>
			)}
		</>
	);
};

export default InviteAccomodation;
