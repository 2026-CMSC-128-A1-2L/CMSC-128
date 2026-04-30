import type { FunctionComponent } from 'react';

interface MessageNotificationCardProps {
  title: string;
  message: string;
  time: string;
  icon?: string;
  isHighlight?: boolean;
}

const MessageNotificationCard: FunctionComponent<MessageNotificationCardProps> = ({
  title,
  message,
  time,
  icon,
  isHighlight = false,
}) => {
  return (
    <div className="w-num-264 h-20 relative">
      <div
        className={`absolute top-[0px] left-[0px] rounded-num-12 border-solid border-[1px] box-border w-num-264 flex flex-col items-start p-4 shrink-0 ${
          isHighlight ? 'bg-lightcyan border-teal-100' : 'bg-white border-whitesmoke-200'
        }`}
      >
        <div className="self-stretch flex items-start gap-3">
          {icon && <img className="w-6 relative max-h-full" src={icon} alt="" />}
          <div className="w-[180px] flex flex-col items-start gap-1.5">
            <b className="self-stretch h-5 relative flex items-center shrink-0">{title}</b>
            <div className="self-stretch h-[30px] relative text-num-12 tracking-num-0_02 font-semibold font-lora text-dimgray flex items-center shrink-0">
              {message}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[0px] right-[4px] flex items-center justify-center p-num-10 shrink-0 text-[11px] text-darkgray font-lora">
        <div className="relative">{time}</div>
      </div>
    </div>
  );
};

export default MessageNotificationCard;
