import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

export type VisitSlot = {
  id: string;
  time: string;
  visitorName: string;
  backgroundColor?: string;
  dayOfWeek: number;
};

export type LandlordDayEventsPopoutType = {
  className?: string;
  onClose?: () => void;
  date: Date;
  events: VisitSlot[];
};

const LandlordDayEventsPopout: FunctionComponent<LandlordDayEventsPopoutType> = ({
  className = '',
  onClose,
  date,
  events,
}) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className={`w-96 max-w-full max-h-full overflow-auto relative text-left text-num-12 text-black font-inter ${className}`}
    >
      <div className="relative bg-white rounded-lg p-6 shadow-lg">
        <Icon
          icon="ic:round-close"
          className="absolute top-3 right-3 w-8 h-8 cursor-pointer hover:opacity-70"
          onClick={onClose}
        />

        <div className="text-lg font-semibold mb-2">{formattedDate}</div>

        <div className="border-t border-whitesmoke-200 pt-4">
          {events.length === 0 ? (
            <div className="text-center py-4 text-dimgray">No visits scheduled for this day</div>
          ) : (
            <div className="flex flex-col gap-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 pb-3 border-b border-whitesmoke-200 last:border-b-0"
                >
                  <Icon icon="ic:round-person" className="h-5 w-5 shrink-0 mt-1 text-teal" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-dimgray">{event.visitorName}</div>
                    <div className="text-xs text-gray mt-1">{event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandlordDayEventsPopout;
