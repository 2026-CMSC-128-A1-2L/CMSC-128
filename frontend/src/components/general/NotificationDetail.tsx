import { type FunctionComponent } from 'react';
import logoLike from '../../../assets/logo_like.svg';

interface NotificationDetailProps {
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  headline: string;
  message: string;
  onCancel?: () => void;
  onAccept?: () => void;
  showButtons?: boolean;
}

const NotificationDetail: FunctionComponent<NotificationDetailProps> = ({
  title,
  subtitle = 'System',
  date,
  time,
  headline,
  message,
  onCancel,
  onAccept,
  showButtons = true,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[25px] border border-whitesmoke-200 shadow-sm dark:bg-[#101111] dark:border-[#303331] dark:shadow-none overflow-hidden flex flex-col font-inter">
      {/* Header */}
      <div className="px-8 py-6 border-b border-whitesmoke-200 dark:border-[#303331] flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-num-24 font-bold text-darkslategray dark:text-[#edf6f4] m-0">
            {title}
          </h1>
          <span className="text-num-14 text-slategray dark:text-[#a4acba] font-medium font-lora">
            {subtitle}
          </span>
        </div>
        <div className="text-right text-num-12 text-dimgray dark:text-[#a4acba] font-lora font-semibold">
          <div>{date}</div>
          <div>{time}</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-12 gap-6 text-center">
        {/* Owl Logo */}
        <img className="w-[180px] h-auto object-contain my-2" alt="Owl Logo" src={logoLike} />

        {/* Headline */}
        <h2 className="text-num-24 font-bold text-darkslategray dark:text-[#edf6f4] max-w-2xl leading-tight">
          {headline}
        </h2>

        {/* Message Card */}
        <div className="w-full max-w-xl bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.05)] rounded-xl p-8 border border-whitesmoke-200 dark:bg-[#171918] dark:border-[#303331] dark:shadow-none flex flex-col items-center">
          <div className="text-darkslategray font-bold text-num-18 dark:text-[#edf6f4] mb-4">
            Hi Daphne!
          </div>
          <div className="text-darkslategray text-num-14 dark:text-[#d7e0ef] leading-relaxed whitespace-pre-wrap font-medium">
            {message}
          </div>
          <div className="mt-4 text-num-12 font-semibold text-darkslategray dark:text-[#a4acba] font-lora">
            This invitation will expire in 7 days.
          </div>
        </div>

        {/* Buttons */}
        {showButtons && (
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={onCancel}
              className="px-10 py-3 rounded-2xl font-bold text-crimson hover:bg-crimson/5 transition-colors active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              className="px-10 py-3 rounded-2xl bg-lightcyan text-teal-200 font-bold hover:bg-lightcyan/80 transition-colors active:scale-95 shadow-sm"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDetail;
