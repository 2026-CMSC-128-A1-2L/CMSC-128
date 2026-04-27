import { FunctionComponent } from 'react';
import success from '../../../../assets/reportSuccess.svg';

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  onClose: () => void;
  email: string; // passed from BuildingInformation via handleManagerSend
};

// ─── Component ────────────────────────────────────────────────────────────────

const AddManager2: FunctionComponent<Props> = ({ onClose, email }) => {
  return (
    <div className="w-120 h-125 relative rounded-2xl bg-white overflow-hidden flex flex-col items-start p-8 box-border text-center text-2xl text-black font-inter">
      <div className="self-stretch h-[436px] overflow-hidden shrink-0 flex flex-col items-center pt-[65px] px-2.5 pb-6 box-border gap-6">
        <div className="self-stretch flex flex-col items-start">
          {/* Icon */}
          <div className="self-stretch bg-white overflow-hidden flex items-center justify-center py-[5px] px-[3px]">
            <div className="w-[100px] h-[100px] flex items-center justify-center relative rounded-[50%] bg-lightcyan">
              <img className="h-[76px] w-[76px]" alt="" src={success} />
            </div>
          </div>

          {/* Text */}
          <div className="self-stretch overflow-hidden flex flex-col items-center justify-center p-2.5 gap-2.5">
            <b className="self-stretch relative leading-8">Manager Invite Sent!</b>
            <div className="self-stretch relative text-sm leading-5">
              <span className="font-medium">{`We've notified `}</span>
              {/* Displays the email entered in AddManager1 */}
              <b>{email}</b>
              <span className="font-medium">{` about your invite. The invite will expire in `}</span>
              <b>7 days</b>
              <span className="font-medium">. You'll be notified once they accept or decline.</span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-center p-2.5 text-sm text-teal">
          <div className="rounded-xl bg-lightcyan overflow-hidden flex items-center justify-center py-3 px-8">
            <button className="relative font-semibold cursor-pointer" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddManager2;
