import type { MouseEventHandler } from 'react';
import { Icon } from '@iconify/react';

export type MessageCardState = 'default' | 'hovered' | 'clicked';

type MessageCardProps = {
  sender: string;
  preview: string;
  timeLabel: string;
  state?: MessageCardState;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const getContainerClasses = (state: MessageCardState): string => {
  if (state === 'clicked') {
    return 'bg-[#CBF6ED] dark:bg-[#12342e] border-[#2F8677] dark:border-[#72cbb8]';
  }
  if (state === 'hovered') {
    return 'bg-white dark:bg-[#1f2022] border-[#2F8677] dark:border-[#72cbb8]';
  }
  return 'bg-white dark:bg-[#141515] border-[#F0F0F0] dark:border-[#303331] hover:border-[#2F8677] dark:hover:border-[#72cbb8]';
};

const getAccentTextClasses = (state: MessageCardState): string => {
  if (state === 'clicked' || state === 'hovered') {
    return 'text-[#2F8677] dark:text-[#72cbb8]';
  }
  return 'text-[#2F3136] dark:text-[#d7e0ef] group-hover:text-[#2F8677] dark:group-hover:text-[#72cbb8]';
};

const MessageCard = ({
  sender,
  preview,
  timeLabel,
  state = 'default',
  onClick,
  onMouseEnter,
  onMouseLeave,
}: MessageCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={[
        'group relative h-[84px] w-[264px] cursor-pointer rounded-[12px] border border-solid p-[16px] text-left',
        'transition-all duration-200 ease-out',
        getContainerClasses(state),
      ].join(' ')}
    >
      <div className="flex items-start gap-[12px]">
        <Icon
          icon="material-symbols:mail-outline-sharp"
          className={[
            'h-[24px] w-[24px] shrink-0 transition-colors duration-200',
            getAccentTextClasses(state),
          ].join(' ')}
        />
        <div className="flex w-[180px] flex-col gap-[6px]">
          <p
            className={[
              "truncate font-['Inter'] text-[14px] font-bold leading-none transition-colors duration-200",
              getAccentTextClasses(state),
            ].join(' ')}
          >
            {sender}
          </p>
          <p className="line-clamp-2 font-['Lora'] text-[12px] font-semibold leading-tight tracking-[0.24px] text-[#666] dark:text-[#a4acba]">
            {preview}
          </p>
        </div>
      </div>
      <span className="absolute right-[14px] top-[10px] font-['Lora'] text-[11px] text-[#999] dark:text-[#a4acba]">
        {timeLabel}
      </span>
    </button>
  );
};

export default MessageCard;
