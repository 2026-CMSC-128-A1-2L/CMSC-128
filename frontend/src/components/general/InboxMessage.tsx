import { Icon } from "@iconify/react";
import type { FunctionComponent } from "react";

interface InboxMessageProps {
  title?: string;
  body?: string;
  time?: string;
  icon?: string;
  onClick?: () => void;
  active?: boolean;
  unread?: boolean;
  unreadCount?: number;
}

const InboxMessage: FunctionComponent<InboxMessageProps> = ({
  title = "Verification Status",
  body = "Hi Daphne! Your verification has been approved!",
  time = "2m ago",
  icon = "iconamoon:notification",
  onClick,
  active = false,
  unread = false,
  unreadCount = 0,
}) => {
  return (
    <div
      className={`w-full relative rounded-xl border-solid border box-border flex flex-col pt-3 px-3 pb-4 gap-1 text-right text-[0.5rem] font-lora cursor-pointer transition-colors ${
        active
          ? "bg-lightcyan border-teal-200 text-teal-800 shadow-sm shadow-teal/5"
          : "bg-white border-whitesmoke text-slategray hover:bg-whitesmoke"
      }`}
      onClick={onClick}
    >
      {/* Time Row */}
      <div className="self-stretch flex items-start justify-end h-3">
        <div className="relative tracking-[0.04em] font-semibold text-right text-unselected">
          {time}
        </div>
      </div>

      {/* Content Row */}
      <div className="self-stretch flex items-start gap-2">
        {/* Status Dot Column */}
        <div className="flex items-center justify-center min-w-[12px] h-5 shrink-0">
          {unread && (
            <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_rgba(9,108,91,0.3)]" />
          )}
        </div>

        {/* Icon & Message Content */}
        <div className="flex-1 flex items-start gap-1 text-left text-[0.813rem] text-darkslategray font-inter min-w-0">
          <div className="flex items-center justify-center py-0.5 shrink-0">
            <Icon
              icon={icon}
              className={`w-5 h-5 ${active || unread ? "text-teal" : "text-unselected"}`}
            />
          </div>

          <div className="flex-1 flex flex-col gap-1 min-w-0">
            {/* Title & Badge Row */}
            <div className="flex items-center justify-between gap-2 h-5">
              <b
                className={`flex-1 truncate leading-none ${unread ? "font-bold" : "font-semibold"}`}
              >
                {title.length > 25 ? `${title.substring(0, 25)}...` : title}
              </b>
              {unread && unreadCount > 0 && (
                <div className="bg-teal text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center shrink-0 translate-y-[0.5px]">
                  {unreadCount}
                </div>
              )}
            </div>

            {/* Body Text */}
            <div className="self-stretch relative text-[0.625rem] tracking-[0.02em] font-semibold font-lora text-dimgray [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical] leading-relaxed">
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxMessage;
