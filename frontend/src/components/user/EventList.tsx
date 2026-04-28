import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';

interface Event {
  id: string;
  title: string;
  date: string;
  icon?: string;
}

interface EventListProps {
  events?: Event[];
  onEventClick?: (event: Event) => void;
}

const EventList: FunctionComponent<EventListProps> = ({
  events = [
    {
      id: '1',
      title: 'Ocular Visit',
      date: 'April 7, 2026',
    },
  ],
  onEventClick,
}) => {
  return (
    <div className="self-stretch overflow-hidden flex flex-col items-start py-[9.7px] px-num-0 gap-[9.7px] text-center text-[13.52px]">
      <b className="self-stretch relative">Events</b>
      <div className="self-stretch flex flex-col gap-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="self-stretch h-[46.3px] rounded-[15.45px] border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex items-center p-num-15_4 gap-[9.7px] text-[13.99px] cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onEventClick?.(event)}
          >
            <Icon icon="ic:round-circle" className="h-[23.2px] w-[23.2px]" />
            <div className="flex flex-col items-start justify-center gap-[3.9px] shrink-0">
              <div className="relative font-medium">{event.title}</div>
              <div className="relative text-num-11_59 tracking-[0.04em] font-medium font-lora text-dimgray">
                {event.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
