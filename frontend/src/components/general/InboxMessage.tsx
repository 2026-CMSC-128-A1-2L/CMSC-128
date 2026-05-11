import { Icon } from '@iconify/react';
import type { FunctionComponent } from 'react';

interface InboxMessageProps {
  title?: string;
  body?: string;
  time?: string;
  icon?: string;
  onClick?: () => void;
  active?: boolean;
}

const InboxMessage: FunctionComponent<InboxMessageProps> = ({
  title = 'Verification Status',
  body = 'Hi Daphne! Your verification has been approved!',
  time = '2m ago',
  icon = 'iconamoon:notification',
  onClick,
  active = false,
}) => {
  return (
    <div
      className={`w-full relative rounded-xl border-solid border box-border flex items-start pt-2 px-3 pb-4 gap-2 text-right text-[0.5rem] font-lora cursor-pointer transition-colors ${
        active
          ? 'bg-lightcyan border-teal-200 text-teal-800'
          : 'bg-white border-whitesmoke text-slategray hover:bg-whitesmoke'
      }`}
      onClick={onClick}
    >
      <div className="self-stretch flex items-center">
        <img className="w-[0.313rem] relative max-h-full" alt="" />
      </div>
      <div className="flex-1 flex flex-col items-start gap-0.5">
        <div className="self-stretch overflow-hidden flex items-start justify-end">
          <div className="flex-1 relative tracking-[0.04em] font-semibold">{time}</div>
        </div>
        <div className="self-stretch flex items-start gap-1 text-left text-[0.813rem] text-darkslategray font-inter">
          <div className="self-stretch overflow-hidden flex items-start py-1 px-[0.187rem]">
            <Icon icon={icon} className={`w-5 h-5 ${active ? 'text-teal' : ''}`} />
          </div>
          <div className="flex-1 flex flex-col items-start gap-1 min-w-0">
            <div className="self-stretch flex items-center">
              <b className="flex-1 relative truncate">
                {title.length > 25 ? `${title.substring(0, 25)}...` : title}
              </b>
            </div>
            <div className="self-stretch relative text-[0.625rem] tracking-[0.02em] font-semibold font-lora text-dimgray [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxMessage;
