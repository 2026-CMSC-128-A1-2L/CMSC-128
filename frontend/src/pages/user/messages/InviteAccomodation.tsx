import { type FunctionComponent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoLike from '../../../../assets/logo_like.svg';
import NotificationDetail from '../../../components/general/NotificationDetail';
import JoinedDormitoryPopup from '../../../components/user/user-invitation/JoinedDormitoryPopup';
import PortalPopup from '../../../components/user/user-invitation/PortalPopup';

const InviteAccomodation: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isJoinedDormitoryPopupOpen, setJoinedDormitoryPopupOpen] = useState(false);
  const openJoinedDormitoryPopup = () => setJoinedDormitoryPopupOpen(true);
  const closeJoinedDormitoryPopup = () => setJoinedDormitoryPopupOpen(false);

  // Determine which notification data to show based on the route
  const getNotificationData = () => {
    const path = location.pathname;

    if (path.includes('verification-status')) {
      return {
        title: 'Verification Status',
        date: 'March 30, 2026',
        time: '2:15 pm',
        headline: 'Hi Daphne! Your verification has been approved!',
        message:
          'Congratulations! Your profile has been successfully verified by our system. You now have full access to all features, including direct booking and priority support. \n\nThank you for choosing ATLAS.',
      };
    }

    if (path.includes('welcome-atlas')) {
      return {
        title: 'Welcome to ATLAS!',
        date: 'March 28, 2026',
        time: '10:00 am',
        headline: 'Hi Daphne! Welcome to the ATLAS Community!',
        message:
          'We are thrilled to have you with us. ATLAS is designed to make your dormitory life easier and more connected. Explore our features to manage your stay, payments, and communications all in one place. \n\nHappy staying!',
      };
    }

    if (path.includes('support-message')) {
      return {
        title: 'New Message from Support',
        date: 'March 31, 2026',
        time: '5:45 pm',
        headline: 'We have received your report and are looking into it.',
        message:
          'Hi Daphne, our support team has successfully received your recent inquiry regarding the lease transfer. We are currently reviewing the details and will get back to you within 24-48 hours. \n\nReference ID: #88291',
      };
    }

    // Default: Invitation to Current Accommodation
    return {
      title: 'Invitation to Current Accommodation',
      date: 'March 30, 2026',
      time: '1:20 am',
      headline:
        'Quevin Custodio has invited you to join your current accommodations in Women’s Dormitory',
      message:
        'Quevin Custodio has invited you to join Women’s Dormitory as a your current accommodation! Joining this invitation will help both you and the landlord manage your accommodations and have access to relevant informations. \n\nYou may head over to the building profile for more details. \n\nThis invitation will expire in 7 days.',
    };
  };

  const data = getNotificationData();

  return (
    <>
      <div className="w-full h-full flex flex-col items-start py-8 sm:py-16 px-4 sm:px-8 box-border text-num-24 text-gray-200 font-inter relative overflow-hidden bg-transparent">
        <div className="w-full max-w-[1048px] mx-auto rounded-[25.44px] rounded-b-none bg-white border-whitesmoke-200 border-solid border-[1px] box-border flex flex-col items-start pt-num-0 px-num-0 pb-[22px] gap-2.5 z-10 shadow-sm">
          <div className="self-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between py-num-10 px-5 sm:px-[30px] gap-3 sm:gap-5 shrink-0 bg-white rounded-t-[25.44px] border-b border-whitesmoke-200">
            <div className="flex flex-col items-start gap-px">
              <b className="relative leading-tight sm:leading-num-32 flex items-center shrink-0 font-inter text-lg sm:text-2xl">
                Invitation to Current Accommodation
              </b>
              <div className="self-stretch relative text-[14px] sm:text-[16px] font-medium font-lora flex items-center shrink-0">
                System
              </div>
            </div>
            <div className="flex items-center justify-center sm:p-num-10 text-left sm:text-right text-[10px] sm:text-num-12 text-dimgray font-lora">
              <div className="relative tracking-num-0_02 font-semibold">
                March 30, 2026
                <br className="hidden sm:block" /> 1:20 am
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-center py-num-10 px-[30px] gap-2.5 shrink-0 text-center text-black">
            <img
              className="w-[150px] sm:w-[202px] relative max-h-full object-cover my-4 sm:my-6"
              alt="Owl Logo"
              src={logoLike}
            />
            <div className="flex flex-col items-center gap-[7px] w-full">
              <b className="w-full max-w-[564px] relative leading-tight sm:leading-num-32 flex items-center justify-center shrink-0 font-inter text-center text-[16px] sm:text-[20px] md:text-[24px]">
                Quevin Custodio has invited you to join your current accommodations in Women’s
                Dormitory
              </b>
              <div className="flex flex-col items-center justify-end gap-5 text-[16px] sm:text-[18px] w-full">
                <div className="w-full max-w-[604px] shadow-[0px_0px_10px_rgba(0,_0,_0,_0.05)] bg-white border-whitesmoke-200 border-solid border-[1.5px] box-border flex flex-col items-center pt-5 pb-8 sm:pb-10 px-4 sm:px-5 gap-4 sm:gap-5 rounded-lg">
                  <b className="w-full max-w-[481.7px] relative tracking-[-0.01em] flex items-center justify-center shrink-0 text-darkslategray font-inter text-lg sm:text-xl text-center">
                    Hi Daphne!
                  </b>
                  <div className="flex flex-col items-center gap-2.5 shrink-0 text-num-14 w-full">
                    <div className="w-full max-w-[521px] relative leading-5 sm:leading-6 font-medium flex items-center justify-center shrink-0 text-center text-darkslategray font-inter">
                      Quevin Custodio has invited you to join Women’s Dormitory as a your current
                      accommodation! Joining this invitation will help both you and the landlord
                      manage your accommodations and have access to relevant informations
                      <br />
                      You may head over {'<here>'} to check out the building’s profile.
                    </div>
                    <div className="relative text-[10px] sm:text-num-12 tracking-num-0_02 font-semibold font-lora flex items-center justify-center text-darkslategray mt-2 text-center">
                      This invitation will expire in 7 days.
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-center text-[18px] sm:text-[20.87px] text-crimson mt-2 sm:mt-4 w-full justify-center">
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-[23.9px] w-full sm:w-auto">
                    <div
                      className="w-full sm:w-[148px] rounded-[17.89px] flex items-center justify-center py-2.5 sm:py-[11.9px] px-[35.8px] box-border cursor-pointer transition-transform hover:scale-105 active:scale-95 font-inter"
                      onClick={() => {
                        if (window.history.length > 2) {
                          navigate(-2);
                        } else {
                          navigate('/landlord/messages');
                        }
                      }}
                    >
                      <div className="relative font-semibold inline-block">Cancel</div>
                    </div>
                    <div
                      className="w-full sm:w-[148px] rounded-[17.89px] bg-lightcyan overflow-hidden shrink-0 flex items-center justify-center py-2.5 sm:py-[11.9px] px-[35.8px] box-border cursor-pointer text-teal-200 transition-transform hover:scale-105 active:scale-95 font-inter"
                      onClick={openJoinedDormitoryPopup}
                    >
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
