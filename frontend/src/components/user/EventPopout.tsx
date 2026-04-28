import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

export type EventPopoutType = {
  className?: string;
  onClose?: () => void;
};

const EventPopout: FunctionComponent<EventPopoutType> = ({ className = '', onClose }) => {
  return (
    <div
      className={`w-96 h-auto relative max-w-full max-h-full overflow-auto text-left text-num-12 text-black font-inter ${className}`}
    >
      <div className="absolute top-0 left-0 rounded-md bg-white w-full h-full p-4" />
      <Icon
        icon="ic:round-close"
        className="absolute top-3 right-3 w-8 h-8 cursor-pointer hover:opacity-70"
        onClick={onClose}
      />
      <div className="absolute top-3 right-12 w-8 h-8">
        <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 rounded-lg bg-white" />
        <div className="absolute h-3/4 w-3/4 top-1/2 right-1/2 bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col items-start opacity-70">
          <div className="self-stretch h-8 relative overflow-hidden shrink-0" />
        </div>
      </div>
      <div className="absolute top-10 left-20 text-lg font-semibold">Ocular visit</div>
      <div className="absolute top-16 left-20 whitespace-pre-wrap text-num-12">
        Tuesday, March 9 4:00PM - 5:00PM
      </div>
      <div className="absolute top-20 left-20 whitespace-pre-wrap text-num-12">{`One Sapphire Place     `}</div>
      <div className="absolute top-24 left-20 text-num-12"> Daphne the Landlord</div>
      <Icon icon="ic:round-circle" className="absolute top-11 left-12 w-6 h-6" />
      <Icon icon="ic:round-delete" className="absolute top-4 right-16 w-6 h-6" />
    </div>
  );
};

export default EventPopout;
