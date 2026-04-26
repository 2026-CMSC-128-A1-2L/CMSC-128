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
    return 'bg-[#CBF6ED] border-[#2F8677]';
  }
  if (state === 'hovered') {
    return 'bg-white border-[#2F8677]';
  }
  return 'bg-white border-[#F0F0F0] hover:border-[#2F8677]';
};

const getAccentTextClasses = (state: MessageCardState): string => {
  if (state === 'clicked' || state === 'hovered') {
    return 'text-[#2F8677]';
  }
  return 'text-[#2F3136] group-hover:text-[#2F8677]';
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
          <p className="line-clamp-2 font-['Lora'] text-[12px] font-semibold leading-[1.25] tracking-[0.24px] text-[#666]">
            {preview}
          </p>
        </div>
      </div>
      <span className="absolute right-[14px] top-[10px] font-['Lora'] text-[11px] text-[#999]">
        {timeLabel}
      </span>
    </button>
  );
};

export default MessageCard;
