import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

export type VisitSlot = {
  id: string;
  time: string;
  visitorName: string;
  backgroundColor?: string;
  dayOfWeek: number;
  startDate: Date;
};

export type LandlordEventPopoutType = {
  className?: string;
  onClose?: () => void;
  event: VisitSlot;
};

const LandlordEventPopout: FunctionComponent<LandlordEventPopoutType> = ({
  className = '',
  onClose,
  event,
}) => {
  return (
    <div
      className={`w-96 h-auto relative max-w-full max-h-full overflow-auto text-left text-num-12 text-black font-inter ${className}`}
    >
      <div className="relative bg-white rounded-lg p-6 shadow-lg">
        <Icon
          icon="ic:round-close"
          className="absolute top-3 right-3 w-8 h-8 cursor-pointer hover:opacity-70"
          onClick={onClose}
        />

        <div className="flex items-start gap-4">
          <Icon icon="ic:round-person" className="w-12 h-12 text-teal shrink-0 mt-1" />
          <div className="flex-1">
            <div className="text-lg font-semibold text-dimgray mb-2">{event.visitorName}</div>
            <div className="text-sm text-gray">Visit Time: {event.time}</div>
            <div className="text-sm text-gray">
              Visit Date: {event.startDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordEventPopout;
