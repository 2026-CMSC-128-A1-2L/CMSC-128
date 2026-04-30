import { FunctionComponent } from 'react';
import InvitationButtons from './InvitationButtons';

interface InvitationCardProps {
  inviterName: string;
  dormitoryName: string;
  dormitoryImage?: string;
  invitationMessage: string;
  linkText?: string;
  expirationDays?: number;
  title?: string;
  subtitle?: string;
  date?: string;
  time?: string;
  onAccept: () => void;
  onCancel?: () => void;
}

const InvitationCard: FunctionComponent<InvitationCardProps> = ({
  inviterName,
  dormitoryName,
  dormitoryImage,
  invitationMessage,
  linkText = '<here>',
  expirationDays = 7,
  title = 'Invitation to Current Accommodation',
  subtitle = 'System',
  date = 'March 30, 2026',
  time = '1:20 am',
  onAccept,
  onCancel,
}) => {
  return (
    <div className="h-[924px] w-[1048px] flex flex-col items-start py-16 px-num-0 box-border shrink-0 text-num-24 text-gray-200">
      <div className="w-[968px] h-auto rounded-tl-[25.44px] rounded-tr-none rounded-b-none bg-whitesmoke-300 border-whitesmoke-200 border-solid border-[1.3px] box-border flex flex-col items-start pt-num-0 px-num-0 pb-[22px] gap-2.5">
        {/* Header */}
        <div className="self-stretch flex items-start justify-between py-num-10 px-[30px] gap-5 shrink-0">
          <div className="w-[450px] flex flex-col items-start gap-px">
            <b className="w-[443px] h-8 relative leading-num-32 flex items-center shrink-0">
              {title}
            </b>
            <div className="self-stretch h-[20.9px] relative text-[16px] font-medium font-lora flex items-center shrink-0">
              {subtitle}
            </div>
          </div>
          <div className="flex items-center justify-center p-num-10 text-right text-num-12 text-dimgray font-lora">
            <div className="relative tracking-num-0_02 font-semibold">
              {date}
              <br />
              {time}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="self-stretch flex flex-col items-center justify-center py-num-10 px-[30px] gap-2.5 shrink-0 text-center text-black">
          {dormitoryImage && (
            <img
              className="w-[202px] relative max-h-full object-cover"
              src={dormitoryImage}
              alt={dormitoryName}
            />
          )}

          <div className="flex flex-col items-center gap-[7px]">
            <b className="w-[564px] h-[88px] relative leading-num-32 flex items-center justify-center shrink-0">
              {inviterName} has invited you to join your current accommodations in {dormitoryName}
            </b>

            {/* Invitation Message Box */}
            <div className="flex flex-col items-center justify-end gap-5 text-[18px]">
              <div className="w-[604px] shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] bg-gainsboro border-cadetblue border-solid border-[1px] box-border flex flex-col items-center pt-5 pb-[95px] pl-[7px] pr-2 gap-5">
                <b className="w-[481.7px] relative tracking-[-0.01em] flex items-center justify-center shrink-0">
                  Hi Daphne!
                </b>
                <div className="flex flex-col items-center gap-2.5 shrink-0 text-num-14">
                  <div className="w-[521px] h-auto relative leading-6 font-medium flex items-center justify-center shrink-0">
                    {invitationMessage}
                    <br />
                    You may head over {linkText} to check out the building's profile.
                  </div>
                  <div className="w-[474.6px] relative text-num-12 tracking-num-0_02 font-semibold font-lora flex items-center justify-center">
                    This invitation will expire in {expirationDays} days.
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <InvitationButtons onAccept={onAccept} onCancel={onCancel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
